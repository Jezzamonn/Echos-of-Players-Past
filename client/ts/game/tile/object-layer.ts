import { Point } from "../../common";
import { TILE_SIZE } from "../../constants";
import { ButtonColor, Level } from "../level";
import { TileLayer } from "./tile-layer";

export enum ObjectTile {
    Empty = 0,
    Spawn = 1,
    Goal = 2,
    RedButton = 10,
    RedSpikes = 11,
    RedBridge = 12,
    YellowButton = 20,
    YellowSpikes = 21,
    YellowBridge = 22,
    BlueButton = 30,
    BlueSpikes = 31,
    BlueBridge = 32,
}

// Position of the tile in the tileset.
const tilePositions: { [key in ObjectTile]?: Point } = {
    [ObjectTile.Spawn]: { x: 7, y: 0 },
    [ObjectTile.Goal]: { x: 7, y: 1 },
    [ObjectTile.RedButton]: { x: 7, y: 2 },
    [ObjectTile.RedSpikes]: { x: 7, y: 4 },
    [ObjectTile.RedBridge]: { x: 7, y: 6 },
    [ObjectTile.YellowButton]: { x: 6, y: 2 },
    [ObjectTile.YellowSpikes]: { x: 6, y: 4 },
    [ObjectTile.YellowBridge]: { x: 6, y: 6 },
    [ObjectTile.BlueButton]: { x: 5, y: 2 },
    [ObjectTile.BlueSpikes]: { x: 5, y: 4 },
    [ObjectTile.BlueBridge]: { x: 5, y: 6 },
}

export class ObjectLayer extends TileLayer<ObjectTile> {

    renderTile(context: CanvasRenderingContext2D, pos: Point, level: Level): void {
        const tile = this.getTile(pos);
        const renderPos = {x: pos.x * TILE_SIZE, y: pos.y * TILE_SIZE }

        const tilePos = tilePositions[tile];
        if (tilePos == undefined) {
            return;
        }

        const pos2 = {x: tilePos.x, y: tilePos.y }

        if (Math.floor(tile / 10) == 1 && level.buttonState[ButtonColor.Red]) {
            pos2.y += 1;
        }
        if (Math.floor(tile / 10) == 2 && level.buttonState[ButtonColor.Yellow]) {
            pos2.y += 1;
        }
        if (Math.floor(tile / 10) == 3 && level.buttonState[ButtonColor.Blue]) {
            pos2.y += 1;
        }

        this.drawTile(context, {tilePos: pos2, renderPos});
    }
}
