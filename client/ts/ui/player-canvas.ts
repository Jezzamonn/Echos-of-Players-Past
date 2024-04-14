import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { imageName } from "../game/entity/player";
import { PlayerVisualInfo, playerInfoToLayers } from "../game/player-info";
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

    @property({ type: Object })
    accessor player: PlayerVisualInfo | undefined = undefined;

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
        this.drawPlayer();
    }

    drawPlayer() {
        if (!this.player) {
            return;
        }
        const canvas = this.shadowRoot!.querySelector("canvas") as HTMLCanvasElement;
        if (!canvas) {
            return;
        }
        const context = canvas.getContext("2d")!;
        context.clearRect(0, 0, canvas.width, canvas.height);
        Aseprite.drawAnimation({
            context,
            image: imageName,
            animationName: 'idle',
            time: 0,
            position: {x: 0, y: 0},
            layers: playerInfoToLayers(this.player),
        });
    }
}