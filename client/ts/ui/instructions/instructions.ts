import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('instructions-component')
export class InstructionsComponent extends LitElement {
    static styles = css`
        :host {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        character-customizer {
            position: absolute;
            top: 0;
            left: 50%;
            right: 0;
            bottom: 0;
        }

        .instructions {
            position: absolute;
            top: 0;
            left: 0;
            right: 50%;
            bottom: 0;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 30px;
            font-size: 1.5em;
        }

        p, li {
            line-height: 1.6em;
        }
    `;

    render() {
        return html`
            <div class="instructions">
                <p><b>Echos of Players Past</b></p>
                <p>
                    At the start of each level, you can summon one or more players to help you
                    complete the level. These are real players who have previously played the game.
                </p>
                <p>
                    Only 1 player needs to make it to the goal in order for you to beat the level.
                    Whenever you beat a level, your movement will be saved, and future players will
                    be able to summon you!
                </p>
                <p>Controls:</p>
                <ul>
                    <li>Arrow keys to move</li>
                    <li>R to restart the level</li>
                </ul>
            </div>
            <character-customizer></character-customizer>
        `;
    }
}

declare global {
    interface HTMLElementEventMap {
        'hide-title': CustomEvent<void>;
    }
}
