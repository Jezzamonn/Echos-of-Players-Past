import { LitElement, PropertyValues, TemplateResult, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Game } from '../game/game';

export enum UIState {
    Customizing = 'customizing',
    Game = 'game',
    Pick = 'pick',
}

@customElement('root-component')
export class RootComponent extends LitElement {
    static styles = css`
        :host {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            width: 100vw;
        }

        player-picker {
            position: absolute;
            top: 70%;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
        }

        character-customizer {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
        }
    `;

    @property({ type: String })
    accessor levelName: string | undefined = undefined;

    @property({ type: Number })
    accessor levelAttemptNumber: number | undefined = undefined;

    @state()
    uiState: UIState = UIState.Customizing;

    willUpdate(changedProperties: PropertyValues<this>) {
        if (changedProperties.has('levelAttemptNumber')) {
            const game = (window as any).game as Game;
            this.uiState = game.inputStarted ? UIState.Game : UIState.Pick;
        }
    }

    render() {
        let uiElems: TemplateResult[] = [];

        if (this.uiState === UIState.Pick) {
            const picker = html`<player-picker
                levelName="${this.levelName}"
                levelAttemptNumber="${this.levelAttemptNumber}"
                @players-selected=${() => {
                    this.uiState = UIState.Game;
                }}
            ></player-picker>`;
            uiElems.push(picker);
        }
        if (this.uiState === UIState.Customizing) {
            const customizer = html`<character-customizer></character-customizer>`;
            uiElems.push(customizer);
        }
        return html`
            <canvas class="main-canvas"></canvas>
            ${uiElems}
        `;
    }

    // firstUpdated() {
    //     const canvas = this.shadowRoot!.querySelector('canvas')!;
    //     this.dispatchEvent(
    //         new CustomEvent('create-canvas', { detail: canvas })
    //     );
    // }
}

// declare global {
//     interface HTMLElementEventMap {
//         'create-canvas': CustomEvent<HTMLCanvasElement>;
//     }
// }
