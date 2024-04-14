import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('loading-spinner')
export class LoadingSpinnerComponent extends LitElement {
    static styles = css`
        :host {
        }

        .spinner {
            aspect-ratio: 1 / 1;
            max-width: 100%;
            max-height: 100%;
            border: 5px solid #f3f3f3;
            border-top: 5px solid #3498db;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    `;

    render() {
        return html`<div class="spinner"></div>`;
    }
}