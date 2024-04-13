import { Point } from "../common";
import { Images } from "../lib/images";
import { RegularKeys } from "../lib/keys";
import { FocusCamera } from "./camera";
import { Entity } from "./entity/entity";
import { Player } from "./entity/player";
import { Game } from "./game";
import { LevelInfo } from "./levels";
import { KeyHistory } from "./recordreplay/key-history";
import { KeyReplayer } from "./recordreplay/key-replayer";
import { BaseTile } from "./tile/base-layer";
import { ObjectTile } from "./tile/object-layer";
import { Tiles } from "./tile/tiles";

// Contains everything in one level, including the tiles and the entities.
export class Level {
    game: Game;
    entities: Entity[] = [];
    image: HTMLImageElement | undefined;
    levelInfo: LevelInfo

    camera: FocusCamera = new FocusCamera();

    tiles: Tiles = new Tiles(0, 0);

    start: Point = { x: 0, y: 0 };

    keyReplayers: KeyReplayer[] = [];

    won = false;

    constructor(game: Game, levelInfo: LevelInfo) {
        this.game = game;
        this.levelInfo = levelInfo;
    }

    initFromImage() {
        const image = Images.images[this.levelInfo.name].image!;
        this.image = image;
        this.entities = [];
        this.tiles = new Tiles(image.width, image.height);

        // Draw the image to a canvas to get the pixels.
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext('2d')!;
        context.drawImage(image, 0, 0, image.width, image.height);

        // Read the pixels. White is empty, black is wall, and the red square is the starting position.
        const imageData = context.getImageData(0, 0, image.width, image.height);
        for (let y = 0; y < image.height; y++) {
            for (let x = 0; x < image.width; x++) {

                const color = pixelToColorString(imageData, x, y);
                if (color === 'ffffff') {
                    // Don't need to do anything for empty tiles as they're the default.
                }
                else if (color === '000000') {
                    this.tiles.baseLayer.setTile({ x, y }, BaseTile.Wall, { allowGrow: false });
                }
                else if (color === 'aaaaaa') {
                    this.tiles.baseLayer.setTile({ x, y }, BaseTile.Hole, { allowGrow: false });
                }
                else if (color === 'ffff00') {
                    this.tiles.objectLayer.setTile({ x, y }, ObjectTile.Goal, { allowGrow: false });
                    this.tiles.baseLayer.setTile({ x, y }, BaseTile.Empty, { allowGrow: false });
                }
                else if (color === 'ff0000') {
                    this.start = this.tiles.getTileCoord({x, y}, { x: 0.5, y: 0.5 });
                    this.tiles.objectLayer.setTile({ x, y }, ObjectTile.Spawn, { allowGrow: false });
                    this.tiles.baseLayer.setTile({ x, y }, BaseTile.Empty, { allowGrow: false });
                }
                else {
                    console.log(`Unknown color: ${color} at ${x}, ${y}.`);
                }
            }
        }

        // this.camera.target = () => ({x: this.start.x, y: this.start.y});

        const player = this.spawnPlayer();
        this.camera.target = () => player.cameraFocus();
        player.onFirstInput = () => {
            this.keyReplayers.forEach(replayer => replayer.start());
        }
    }

    spawnPlayer(keyHistory: KeyHistory | undefined = undefined) {
        let keys: RegularKeys = this.game.keys;
        if (keyHistory != undefined) {
            const replayer = new KeyReplayer(keyHistory);
            this.keyReplayers.push(replayer);
            keys = replayer;
        }
        const player = new Player(this, keys, keyHistory == undefined);
        player.midX = this.start.x;
        player.maxY = this.start.y;
        this.entities.push(player);

        return player;
    }

    update(dt: number) {
        for (const entity of this.entities) {
            entity.update(dt);
        }

        for (let i = this.entities.length - 1; i >= 0; i--) {
            if (this.entities[i].done) {
                this.entities.splice(i, 1);
            }
        }

        this.tiles.update(dt);
        this.camera.update(dt);

        for (const keyReplayers of this.keyReplayers) {
            keyReplayers.resetFrame();
        }
    }

    render(context: CanvasRenderingContext2D) {
        this.camera.applyTransform(context);

        this.tiles.render(context);

        for (const entity of this.entities) {
            entity.render(context);
        }
    }

    win() {
        this.won = true;
        this.game.win();
    }
}

function pixelToColorString(imageData: ImageData, x: number, y: number) {
    const i = (y * imageData.width + x) * 4;
    const r = imageData.data[i];
    const g = imageData.data[i + 1];
    const b = imageData.data[i + 2];
    return r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0');
}