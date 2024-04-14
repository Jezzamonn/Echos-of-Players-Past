import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PlayerInfo } from '../game/player-info';

@customElement('player-picker')
export class PlayerPickerComponent extends LitElement {
    static styles = css`
        :host {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1;

            display: flex;
            justify-content: center;
            align-items: center;

            background-color: rgba(0, 0, 0, 0.3);
        }

        .spinner {
            width: 100px;
            height: 100px;
        }
    `;

    @property({ type: Array })
    accessor players: PlayerInfo[] | undefined = undefined;

    render() {
        if (!this.players) {
            return html`<loading-spinner class="spinner"></loading-spinner>`;
        }
        return html`
            ${this.players.map(
                (player) =>
                    html`<summonable-player
                        .player=${player}
                    ></summonable-player>`
            )}
        `;
    }
}
