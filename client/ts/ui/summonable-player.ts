import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FPS } from '../constants';
import { PlayerInfo } from '../game/player-info';

@customElement('summonable-player')
export class SummonablePlayerComponent extends LitElement {
    static styles = css`
        :host {
            height: 50vh;
            width: 20vw;
            background-color: white;
            border-radius: 1vmin;
            box-shadow: 0 0 5vmin black;
            margin: 2vmin;

            display: flex;
            justify-content: center;
            align-items: center;
        }
    `;

    @property({ type: Object })
    accessor player: PlayerInfo = { name: '', moves: [] };

    render() {
        const lastMove = this.player.moves[this.player.moves.length - 1];
        const lengthTotalSec = lastMove[0] / FPS;
        const lengthMins = Math.floor(lengthTotalSec / 60);
        const lengthSec = Math.floor(lengthTotalSec % 60).toString().padStart(2, '0');
        return html`
            <p>${this.player.name}</p>
            <p>Total time: ${lengthMins}:${lengthSec}</p>
        `;
    }
}