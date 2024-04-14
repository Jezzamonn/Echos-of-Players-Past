import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { imageName } from "../game/entity/player";
import { Aseprite } from "../lib/aseprite";

@customElement("player-canvas")
export class PlayerCanvasComponent extends LitElement {
    // Use pixelated scaling
    static styles = css`
        canvas {
            image-rendering: pixelated;
            width: 100%;
        }
    `;

    hasDrawnPlayer = false;

    render() {
        const image = Aseprite.images[imageName];
        if (!image || !image.loadPromise) {
            return;
        }
        if (!image.loaded) {
            return;
        }
        const width = image.frames![0].sourceSize.w;
        const height = image.frames![0].sourceSize.h;
        return html`<canvas class="canvas" width="${width}" height="${height}"></canvas>`;
    }

    firstUpdated() {
        Aseprite.images[imageName].loadPromise!.then(() => {
            this.requestUpdate();
        });
    }

    updated() {
        if (!this.hasDrawnPlayer && Aseprite.images[imageName].loaded) {
            this.drawPlayer();
            this.hasDrawnPlayer = true;
        }
    }

    drawPlayer() {
        console.log('drawing player')
        const canvas = this.shadowRoot!.querySelector("canvas")!;
        const context = canvas.getContext("2d")!;
        Aseprite.drawAnimation({
            context,
            image: imageName,
            animationName: 'idle',
            time: 0,
            position: {x: 0, y: 0},
            layers: ['HairPointyLight', 'HeadLight', 'BodyGreen', 'Ghost'],
        });
    }
}