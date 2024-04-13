import { Point } from "../../common";
import { TILE_SIZE } from "../../constants";
import { Images } from "../../lib/images";
import { BaseLayer, BaseTile } from "./base-layer";
import { ObjectLayer } from "./object-layer";

// All the types of tiles as far as how they interact with the game physics.
export enum PhysicTile {
    Empty = 0,
    Wall = 1,
    Hole = 2,
}

export interface TileSource<T extends number> {
    getTile(p: Point): T;
    getTileAtCoord(p: Point): T;
}

/**
 * 2D array of tiles.
 */
export class Tiles implements TileSource<PhysicTile> {

    baseLayer: BaseLayer;
    objectLayer: ObjectLayer;

    constructor(w: number, h: number) {
        this.baseLayer = new BaseLayer(w, h);
        this.objectLayer = new ObjectLayer(w, h);
    }

    update(dt: number) {
        this.baseLayer.update(dt);
        this.objectLayer.update(dt);
    }

    render(context: CanvasRenderingContext2D) {
        this.baseLayer.render(context);
        this.objectLayer.render(context);
    }

    getTileCoord(p: Point, positionInTile: Point): Point {
        return {
            x: p.x * TILE_SIZE + (TILE_SIZE - 1) * positionInTile.x,
            y: p.y * TILE_SIZE + (TILE_SIZE - 1) * positionInTile.y,
        }
    }

    getTileCoordFromCoord(p: Point, positionInTile: Point): Point {
        return this.getTileCoord({x: Math.floor(p.x / TILE_SIZE), y: Math.floor(p.y / TILE_SIZE)}, positionInTile);
    }

    static async preload() {
        await Images.loadImage({ name: "tiles", path: "sprites/" });
    }

    getTile(p: Point): PhysicTile {
        const baseTile = this.baseLayer.getTile(p);
        if (baseTile == BaseTile.Wall) {
            return PhysicTile.Wall;
        }
        else if (baseTile == BaseTile.Hole) {
            return PhysicTile.Hole;
        }

        return PhysicTile.Empty;
    }

    getTileAtCoord(p: Point): PhysicTile {
        return this.getTile({
            x: Math.floor(p.x / TILE_SIZE),
            y: Math.floor(p.y / TILE_SIZE),
        });
    }

}
