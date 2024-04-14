import { Point } from "../../common";
import { TILE_SIZE } from "../../constants";
import { Level } from "../level";
import { TileLayer } from "./tile-layer";

export enum ObjectTile {
    Empty = 0,
    Spawn = 1,
    Goal = 2,

    // Not actually used in the tile set but calculated from the things below.
    Button = 3,
    Spikes = 4,
    Bridge = 5,

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

export enum ButtonColor {
    Red = 1,
    Yellow = 2,
    Blue = 3,
}

export function getButtonColor(tile: ObjectTile): ButtonColor | undefined {
    if (tile == ObjectTile.Empty) {
        return undefined;
    }
    return Math.floor(tile / 10) as ButtonColor;
}

// Only relevant for colored tiles.
export function getNormalTileType(tile: ObjectTile): ObjectTile {
    if (tile >= ObjectTile.RedButton) {
        return (tile % 10) + ObjectTile.Button;
    }
    return tile;
}

// Position of the tile in the tileset.
const tilePositions: { [key in ObjectTile]?: Point } = {
    [ObjectTile.Spawn]: { x: 11, y: 0 },
    [ObjectTile.Goal]: { x: 11, y: 1 },
    [ObjectTile.RedButton]: { x: 11, y: 2 },
    [ObjectTile.RedSpikes]: { x: 11, y: 4 },
    [ObjectTile.RedBridge]: { x: 11, y: 6 },
    [ObjectTile.YellowButton]: { x: 10, y: 2 },
    [ObjectTile.YellowSpikes]: { x: 10, y: 4 },
    [ObjectTile.YellowBridge]: { x: 10, y: 6 },
    [ObjectTile.BlueButton]: { x: 9, y: 2 },
    [ObjectTile.BlueSpikes]: { x: 9, y: 4 },
    [ObjectTile.BlueBridge]: { x: 9, y: 6 },
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

        const buttonColor = getButtonColor(tile);
        if (buttonColor != undefined && level.buttonState[buttonColor]) {
            pos2.y += 1;
        }

        this.drawTile(context, {tilePos: pos2, renderPos});
    }
}
