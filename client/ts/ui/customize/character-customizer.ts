import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("character-customizer")
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
    `;

    render() {
        // Hair color options: black, brown, blonde
        // Hair style options: poofy, pointy, bald
        // Skin tone options: light, medium, dark
        // Clothing options: blue, green
        return html`
            <h1>Character Customizer</h1>
            <player-canvas></player-canvas>
            <div class="form">
                <div class="form-row">
                    <label for="name">Name:&nbsp;</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-row">
                    <label for="hair-color">Hair Color:&nbsp;</label>
                    <select id="hair-color" name="hair-color">
                        <option value="black">Black</option>
                        <option value="brown">Brown</option>
                        <option value="blonde">Blonde</option>
                    </select>
                </div>
                <div class="form-row">
                    <label for="hair-style">Hair Style:&nbsp;</label>
                    <select id="hair-style" name="hair-style">
                        <option value="poofy">Poofy</option>
                        <option value="pointy">Pointy</option>
                        <option value="bald">Bald</option>
                    </select>
                </div>
                <div class="form-row">
                    <label for="skin-tone">Skin Tone:&nbsp;</label>
                    <select id="skin-tone" name="skin-tone">
                        <option value="light">Light</option>
                        <option value="medium">Medium</option>
                        <option value="dark">Dark</option>
                    </select>
                </div>
                <div class="form-row">
                    <label for="clothing">Clothing:&nbsp;</label>
                    <select id="clothing" name="clothing">
                        <option value="blue">Blue</option>
                        <option value="green">Green</option>
                    </select>
                </div>
            </div>
        `;
    }
}