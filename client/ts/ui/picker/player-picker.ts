import { LitElement, PropertyValues, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { fetchSavedMoves } from '../../game/connection/server-connection';
import { Game } from '../../game/game';
import { LEVELS } from '../../game/levels';
import { PlayerInfo } from '../../game/player-info';
import { Sounds } from '../../lib/sounds';
import { choose } from '../../lib/util';

@customElement('player-picker')
export class PlayerPickerComponent extends LitElement {
    static styles = css`
        :host {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .background {
            position: absolute;
            background-color: rgba(0, 0, 0, 0.5);
            top: 80%;
            left: 0;
            right: 0;
            bottom: 0;
        }

        .players {
            position: absolute;
            top: 70%;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            justify-content: center;
            align-items: stretch;
            z-index: 1;
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
                    const mainPlayerSong = ((window as any).game as Game).playerVisualInfo?.songTrack ?? 'melody';
                    Sounds.setSongs([mainPlayerSong, ...this.selectedPlayers.map(p => p.songTrack ?? 'melody')])
                }}
            ></summonable-player>`;
        });
        return html`
            <h1>Summon a past player!</h1>
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
            const players = await fetchSavedMoves(this.levelName);

            // Fill any players without a track with something random
            const knownTracks = ['melody', 'bass', 'drums', 'chords'];
            players.forEach((player) => {
                if (!knownTracks.includes(player.songTrack ?? '')) {
                    player.songTrack = choose(knownTracks, Math.random);
                    console.log(`Chose random track for player ${player.player}: ${player.songTrack}`)
                }
            });

            this.players = players;

            console.log(`Got players for level ${this.levelName}: ${this.players}`)

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
