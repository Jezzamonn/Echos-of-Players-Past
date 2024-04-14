import { LitElement, PropertyValues, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { fetchSavedMoves } from '../../game/connection/server-connection';
import { LEVELS } from '../../game/levels';
import { PlayerInfo } from '../../game/player-info';

@customElement('player-picker')
export class PlayerPickerComponent extends LitElement {
    static styles = css`
        .background {
            background-color: rgba(0, 0, 0, 0.5);

            position: absolute;
            top: 30%;
            left: 0;
            right: 0;
            bottom: 0;
        }

        .players {
            display: flex;
            justify-content: center;
            align-items: stretch;
            z-index: 1;
            position: relative;
            height: 100%;
        }

        .player-card-selected {
            border: 5px solid #ffe2ad;
        }

        .player-card {
            max-width: 30vw;
            transition: transform 0.1s;
        }

        .player-card:hover {
            transform: scale(1.1) translate(0, -10%);
        }

        .hidden {
            display: none;
        }
    `;

    @property({ type: String })
    accessor levelName: string | undefined = undefined;

    @property({ type: Number })
    accessor levelAttemptNumber: number | undefined = undefined;

    @state()
    players: PlayerInfo[] | undefined = undefined;

    @state()
    selectedPlayers: PlayerInfo[] = [];

    render() {
        if (!this.players) {
            return;
        }
        const playerElements = this.players.map((player) => {
            const isSelected = this.selectedPlayers.includes(player);
            const selectedClass = isSelected ? 'player-card-selected' : '';
            return html`<summonable-player
                class="player-card ${selectedClass}"
                .player=${player}
                @click=${() => {
                    if (isSelected) {
                        this.selectedPlayers = this.selectedPlayers.filter(
                            (p) => p !== player
                        );
                    } else {
                        this.selectedPlayers = [
                            ...this.selectedPlayers,
                            player,
                        ];
                    }
                    this.maybeSendSelected();
                }}
            ></summonable-player>`;
        });
        return html`
            <div class="players">${playerElements}</div>
            <div class="background"></div>
        `;
    }

    maybeSendSelected() {
        if (!this.levelName) {
            return;
        }
        const numPlayers = LEVELS.find(
            (level) => level.name === this.levelName
        )?.numPlayers;
        if (!numPlayers) {
            return;
        }

        // Include this player in the number of players.
        if (
            this.selectedPlayers.length + 1 === numPlayers ||
            this.selectedPlayers.length === this.players?.length
        ) {
            this.dispatchEvent(
                new CustomEvent('players-selected', {
                    detail: this.selectedPlayers,
                    bubbles: true,
                    composed: true,
                })
            );
        }
    }

    async willUpdate(changedProperties: PropertyValues<this>) {
        console.log('player picker update');
        if (changedProperties.has('levelAttemptNumber')) {
            if (!this.levelName) {
                return;
            }
            this.players = undefined;
            this.selectedPlayers = [];
            this.players = await fetchSavedMoves(this.levelName);

            this.maybeSendSelected();
        }
    }
}

// Following https://github.com/microsoft/TypeScript/issues/28357
declare global {
    interface HTMLElementEventMap {
        'players-selected': CustomEvent<PlayerInfo[]>;
    }
}
