import { Point } from "../../common";
import { TILE_SIZE } from "../../constants";
import { TileLayer } from "./tile-layer";

export enum BaseTile {
    Empty = 0,
    Wall = 1,
    Hole = 2,
}

export class BaseLayer extends TileLayer<BaseTile> {

    constructor(w: number, h: number) {
        super(w, h);
    }

    renderTile(
        context: CanvasRenderingContext2D,
        pos: Point,
    ) {
        const tile = this.getTile(pos);
        const renderPos = {x: pos.x * TILE_SIZE, y: pos.y * TILE_SIZE }

        if (tile == BaseTile.Empty) {
            this.drawTile(context, {tilePos: {x: 1, y: 1}, renderPos});
            return;
        }

        if (tile == BaseTile.Wall) {
            const leftTile = this.getTile({ x: pos.x - 1, y: pos.y });
            if (leftTile != BaseTile.Wall) {
                this.drawTile(context, {tilePos: {x: 2, y: 1}, renderPos});
                return;
            }

            const rightTile = this.getTile({ x: pos.x + 1, y: pos.y });
            if (rightTile != BaseTile.Wall) {
                this.drawTile(context, {tilePos: {x: 0, y: 1}, renderPos});
                return;
            }

            const upTile = this.getTile({ x: pos.x, y: pos.y - 1 });
            if (upTile != BaseTile.Wall) {
                this.drawTile(context, {tilePos: {x: 1, y: 2}, renderPos});
                return;
            }
            const downTile = this.getTile({ x: pos.x, y: pos.y + 1 });
            if (downTile != BaseTile.Wall) {
                this.drawTile(context, {tilePos: {x: 1, y: 0}, renderPos});
                return;
            }
            const upLeftTile = this.getTile({ x: pos.x - 1, y: pos.y - 1 });
            if (upLeftTile != BaseTile.Wall) {
                this.drawTile(context, {tilePos: {x: 2, y: 2}, renderPos});
                return;
            }
            const upRightTile = this.getTile({ x: pos.x + 1, y: pos.y - 1 });
            if (upRightTile != BaseTile.Wall) {
                this.drawTile(context, {tilePos: {x: 0, y: 2}, renderPos});
                return;
            }
            const downLeftTile = this.getTile({ x: pos.x - 1, y: pos.y + 1 });
            if (downLeftTile != BaseTile.Wall) {
                this.drawTile(context, {tilePos: {x: 2, y: 0}, renderPos});
                return;
            }
            const downRightTile = this.getTile({ x: pos.x + 1, y: pos.y + 1 });
            if (downRightTile != BaseTile.Wall) {
                this.drawTile(context, {tilePos: {x: 0, y: 0}, renderPos});
                return;
            }
            this.drawTile(context, {tilePos: {x: 0, y: 3}, renderPos});
            return;
        }

        if (tile == BaseTile.Hole) {
            // A similar set of conditions as for the walls.
            for (const dx of [-1, 1]) {
                const dxTile = this.getTile({ x: pos.x + dx, y: pos.y });
                for (const dy of [-1, 1]) {
                    const subTilePos = { x: dx < 0 ? 0 : 1, y: dy < 0 ? 0 : 1}
                    const dyTile = this.getTile({ x: pos.x, y: pos.y + dy });

                    const dxdyTile = this.getTile({ x: pos.x + dx, y: pos.y + dy });

                    let tilePos: Point = { x: 3, y: 0 };

                    if (dxTile != BaseTile.Empty) {
                        tilePos.x += 1;
                    }
                    if (dyTile != BaseTile.Empty) {
                        tilePos.y += 1;
                    }

                    if (dxTile != BaseTile.Empty && dyTile != BaseTile.Empty && dxdyTile == BaseTile.Empty) {
                        // Specific corner tiles.
                        tilePos.y += 1;
                    }
                    else if (dxTile == BaseTile.Empty && dyTile != BaseTile.Empty && dxdyTile != BaseTile.Empty) {
                        tilePos.y += 1;
                    }

                    this.drawQuarterTile(
                        context,
                        {
                            tilePos,
                            subTilePos,
                            renderPos
                        }
                    );
                }
            }
        }
    }

}