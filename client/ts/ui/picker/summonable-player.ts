import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FPS } from '../../constants';
import { PlayerInfo } from '../../game/player-info';

@customElement('summonable-player')
export class SummonablePlayerComponent extends LitElement {
    static styles = css`
        :host {
            background-color: #613b8a;
            border-radius: 10px;
            border: 3px solid black;
            box-shadow: 0 0 30px black;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 0 20px;
            margin: 5px;
        }

        .player {
            width: 100%;
        }
    `;

    @property({ type: Object })
    accessor player: PlayerInfo = { player: '', moves: [] };

    render() {
        const lastMove = this.player.moves[this.player.moves.length - 1];
        const lengthTotalSec = lastMove[0] / FPS;
        return html`
            <player-canvas class="player" .player=${this.player}></player-canvas>
            <p>${this.player.player}</p>
            <p>Total time: ${lengthTotalSec.toFixed(1)}s</p>
        `;
    }
}