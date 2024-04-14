import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { PlayerVisualInfo } from '../../game/player-info';
import { choose } from '../../lib/util';

@customElement('character-customizer')
export class CharacterCustomizerComponent extends LitElement {
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

    @state()
    name = '';

    @state()
    hairColor = choose(['Black', 'Brown', 'Blonde'], Math.random);

    @state()
    hairStyle = choose(['Poofy', 'Pointy', 'Bald'], Math.random);

    @state()
    skinTone = choose(['Light', 'Medium', 'Dark'], Math.random);

    @state()
    clothing = choose(['Blue', 'Green'], Math.random);

    render() {
        const playerInfo: PlayerVisualInfo = {
            player: this.name,
            hairColor: this.hairColor,
            hairStyle: this.hairStyle,
            skinTone: this.skinTone,
            clothing: this.clothing,
        };
        return html`
            <h1>Character Customizer</h1>
            <player-canvas .player=${playerInfo}></player-canvas>
            <div class="form">
                <div class="form-row">
                    <label for="name">Name:&nbsp;</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        .value=${this.name}
                        @input=${(e: Event) => {
                            this.name = (e.target as HTMLInputElement).value;
                        }}
                    />
                </div>
                <div class="form-row">
                    <label for="hair-color">Hair Color:&nbsp;</label>
                    <select
                        id="hair-color"
                        name="hair-color"
                        @change=${(e: Event) => {
                            this.hairColor = (e.target as HTMLSelectElement).value;
                        }}
                    >
                        <option value="Black" ?selected=${this.hairColor === 'Black'}>Black</option>
                        <option value="Brown" ?selected=${this.hairColor === 'Brown'}>Brown</option>
                        <option value="Blonde" ?selected=${this.hairColor === 'Blonde'}>
                            Blonde
                        </option>
                    </select>
                </div>
                <div class="form-row">
                    <label for="hair-style">Hair Style:&nbsp;</label>
                    <select
                        id="hair-style"
                        name="hair-style"
                        @change=${(e: Event) => {
                            this.hairStyle = (e.target as HTMLSelectElement).value;
                        }}
                    >
                        <option value="Poofy" ?selected=${this.hairStyle === 'Poofy'}>Poofy</option>
                        <option value="Pointy" ?selected=${this.hairStyle === 'Pointy'}>
                            Pointy
                        </option>
                        <option value="Bald" ?selected=${this.hairStyle === 'Bald'}>Bald</option>
                    </select>
                </div>
                <div class="form-row">
                    <label for="skin-tone">Skin Tone:&nbsp;</label>
                    <select
                        id="skin-tone"
                        name="skin-tone"
                        @change=${(e: Event) => {
                            this.skinTone = (e.target as HTMLSelectElement).value;
                        }}
                    >
                        <option value="Light" ?selected=${this.skinTone === 'Light'}>Light</option>
                        <option value="Medium" ?selected=${this.skinTone === 'Medium'}>
                            Medium
                        </option>
                        <option value="Dark" ?selected=${this.skinTone === 'Dark'}>Dark</option>
                    </select>
                </div>
                <div class="form-row">
                    <label for="clothing">Clothing:&nbsp;</label>
                    <select
                        id="clothing"
                        name="clothing"
                        @change=${(e: Event) => {
                            this.clothing = (e.target as HTMLSelectElement).value;
                        }}
                    >
                        <option value="Blue" ?selected=${this.clothing === 'Blue'}>Blue</option>
                        <option value="Green" ?selected=${this.clothing === 'Green'}>Green</option>
                    </select>
                </div>
            </div>
            <button
                class="go-button"
                @click=${() => {
                    this.dispatchEvent(
                        new CustomEvent('start-game', {
                            detail: playerInfo,
                            bubbles: true,
                            composed: true,
                        })
                    );
                }}
            >
                Go!
            </button>
        `;
    }
}

declare global {
    interface HTMLElementEventMap {
        'start-game': CustomEvent<PlayerVisualInfo>;
    }
}
