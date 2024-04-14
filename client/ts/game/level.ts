import { Point } from "../common";
import { TILE_SIZE } from "../constants";
import { Images } from "../lib/images";
import { RegularKeys } from "../lib/keys";
import { FocusCamera } from "./camera";
import { Entity } from "./entity/entity";
import { Player } from "./entity/player";
import { Game } from "./game";
import { LevelInfo } from "./levels";
import { PlayerInfo } from "./player-info";
import { KeyReplayer } from "./recordreplay/key-replayer";
import { BaseTile } from "./tile/base-layer";
import { ButtonColor, ObjectTile } from "./tile/object-layer";
import { Tiles } from "./tile/tiles";

// Contains everything in one level, including the tiles and the entities.
export class Level {
    game: Game;
    entities: Entity[] = [];
    image: HTMLImageElement | undefined;
    levelInfo: LevelInfo

    camera: FocusCamera = new FocusCamera();

    tiles: Tiles = new Tiles(0, 0, this);

    start: Point = { x: 0, y: 0 };
    player: Player | undefined;

    keyReplayers: KeyReplayer[] = [];

    won = false;
    inputStarted = false;

    buttonState: { [key in ButtonColor]: boolean } = {
        [ButtonColor.Red]: false,
        [ButtonColor.Yellow]: false,
        [ButtonColor.Blue]: false,
    }

    constructor(game: Game, levelInfo: LevelInfo) {
        this.game = game;
        this.levelInfo = levelInfo;
    }

    initFromImage() {
        const image = Images.images[this.levelInfo.name].image!;
        this.image = image;
        this.entities = [];
        this.tiles = new Tiles(image.width, image.height, this);

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
                else if (color === '00ff00') {
                    this.tiles.objectLayer.setTile({ x, y }, ObjectTile.Goal, { allowGrow: false });
                    this.tiles.baseLayer.setTile({ x, y }, BaseTile.Empty, { allowGrow: false });
                }
                else if (color === 'ff00ff') {
                    this.start = this.tiles.getTileCoord({x, y}, { x: 0.5, y: 0.5 });
                    this.tiles.objectLayer.setTile({ x, y }, ObjectTile.Spawn, { allowGrow: false });
                    this.tiles.baseLayer.setTile({ x, y }, BaseTile.Empty, { allowGrow: false });
                }
                // Red interactables
                else if (color === 'ff0000') {
                    this.tiles.objectLayer.setTile({ x, y }, ObjectTile.RedButton, { allowGrow: false });
                    this.tiles.baseLayer.setTile({ x, y }, BaseTile.Empty, { allowGrow: false });
                }
                else if (color === 'ff0050') {
                    this.tiles.objectLayer.setTile({ x, y }, ObjectTile.RedBridge, { allowGrow: false });
                    this.tiles.baseLayer.setTile({ x, y }, BaseTile.Hole, { allowGrow: false });
                }
                else if (color === 'ff0090') {
                    this.tiles.objectLayer.setTile({ x, y }, ObjectTile.RedSpikes, { allowGrow: false });
                    this.tiles.baseLayer.setTile({ x, y }, BaseTile.Empty, { allowGrow: false });
                }
                // Yellow interactables
                else if (color === 'ffff00') {
                    this.tiles.objectLayer.setTile({ x, y }, ObjectTile.YellowButton, { allowGrow: false });
                    this.tiles.baseLayer.setTile({ x, y }, BaseTile.Empty, { allowGrow: false });
                }
                else if (color === 'ffff50') {
                    this.tiles.objectLayer.setTile({ x, y }, ObjectTile.YellowBridge, { allowGrow: false });
                    this.tiles.baseLayer.setTile({ x, y }, BaseTile.Hole, { allowGrow: false });
                }
                else if (color === 'ffff90') {
                    this.tiles.objectLayer.setTile({ x, y }, ObjectTile.YellowSpikes, { allowGrow: false });
                    this.tiles.baseLayer.setTile({ x, y }, BaseTile.Empty, { allowGrow: false });
                }
                // Blue interactables
                else if (color === '0000ff') {
                    this.tiles.objectLayer.setTile({ x, y }, ObjectTile.BlueButton, { allowGrow: false });
                    this.tiles.baseLayer.setTile({ x, y }, BaseTile.Empty, { allowGrow: false });
                }
                else if (color === '0050ff') {
                    this.tiles.objectLayer.setTile({ x, y }, ObjectTile.BlueBridge, { allowGrow: false });
                    this.tiles.baseLayer.setTile({ x, y }, BaseTile.Hole, { allowGrow: false });
                }
                else if (color === '0090ff') {
                    this.tiles.objectLayer.setTile({ x, y }, ObjectTile.BlueSpikes, { allowGrow: false });
                    this.tiles.baseLayer.setTile({ x, y }, BaseTile.Empty, { allowGrow: false });
                }
                else {
                    console.log(`Unknown color: ${color} at ${x}, ${y}.`);
                }
            }
        }

        this.player = this.spawnPlayer();
        // this.camera.target = () => player.cameraFocus();

        this.player.onFirstInput = () => {
            this.keyReplayers.forEach(replayer => replayer.start());
        }

        this.camera.target = () => ({x: image.width * TILE_SIZE / 2, y: (image.height + 2) * TILE_SIZE / 2});

        if (this.levelInfo.numPlayers == 1) {
            this.startInput();
        }
    }

    startInput() {
        this.player!.keys = this.game.keys;
        this.inputStarted = true;
    }

    entitiesOfType<T>(type: new (...args: any[]) => T): T[] {
        return this.entities.filter(e => e instanceof type) as T[];
    }

    spawnReplayer(playerInfo: PlayerInfo) {
        const replayer = new KeyReplayer(playerInfo.moves);
        this.keyReplayers.push(replayer);
        const keys = replayer;

        const player = new Player(this, playerInfo, keys, false);
        player.midX = this.start.x;
        player.maxY = this.start.y;
        this.entities.push(player);
    }

    spawnPlayer() {
        let keys: RegularKeys = this.game.nullKeys;
        const player = new Player(this, this.game.playerVisualInfo!, keys, true);
        player.midX = this.start.x;
        player.maxY = this.start.y;
        this.entities.push(player);

        return player;
    }

    updateButtonState() {
        this.buttonState[ButtonColor.Red] = false;
        this.buttonState[ButtonColor.Yellow] = false;
        this.buttonState[ButtonColor.Blue] = false;
        for (const player of this.entitiesOfType(Player)) {
            if (player.isOnTile(this.tiles.objectLayer, ObjectTile.RedButton)) {
                this.buttonState[ButtonColor.Red] = true;
            }
            if (player.isOnTile(this.tiles.objectLayer, ObjectTile.YellowButton)) {
                this.buttonState[ButtonColor.Yellow] = true;
            }
            if (player.isOnTile(this.tiles.objectLayer, ObjectTile.BlueButton)) {
                this.buttonState[ButtonColor.Blue] = true;
            }
        }
    }

    update(dt: number) {
        for (const entity of this.entities) {
            entity.update(dt);
        }
        this.updateButtonState();

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