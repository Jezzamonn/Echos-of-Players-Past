import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('title-component')
export class TitleComponent extends LitElement {
    static styles = css`
        :host {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        label {
            font-weight: bold;
        }

        player-canvas {
            width: 30vmin;
            height: 30vmin;
        }

        .form {
            margin-top: 20px;
        }

        .form-row {
            margin: 0.5em 0;
        }

        .go-button {
            margin-top: 20px;
            padding: 10px 20px;
            font-size: 1.5em;
        }
    `;

    render() {
        return html`
            <h1>Echos of Players Past</h1>
            <button
                @click=${() => {
                    this.dispatchEvent(new CustomEvent('hide-title', {
                        bubbles: true,
                        composed: true,
                    }));
                }}
            >Start Game</button>
        `;
    }
}

declare global {
    interface HTMLElementEventMap {
        'hide-title': CustomEvent<void>;
    }
}
