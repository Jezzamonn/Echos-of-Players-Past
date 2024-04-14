import { FacingDir, Point } from "../../common";
import { ACTION_KEYS, DOWN_KEYS, FPS, LEFT_KEYS, PHYSICS_SCALE, RIGHT_KEYS, UP_KEYS, physFromPx } from "../../constants";
import { Aseprite } from "../../lib/aseprite";
import { RegularKeys } from "../../lib/keys";
import { Level } from "../level";
import { PlayerVisualInfo, playerInfoToLayers } from "../player-info";
import { KeyRecorder } from "../recordreplay/key-recorder";
import { ObjectTile } from "../tile/object-layer";
import { PhysicTile } from "../tile/tiles";
import { Entity } from "./entity";

export const imageName = 'characters';

export class Player extends Entity {

    runSpeed = 1 * PHYSICS_SCALE * FPS;

    facingDir = FacingDir.Right;

    keyRecorder: KeyRecorder | undefined;
    keys: RegularKeys;
    dead = false;

    onFirstInput: (() => void) | undefined;
    visualInfo: PlayerVisualInfo;

    constructor(level: Level, visualInfo: PlayerVisualInfo, keys: RegularKeys, recordInput: boolean = true) {
        super(level);
        // TODO: Set w and h
        this.w = physFromPx(5);
        this.h = physFromPx(5);
        this.visualInfo = visualInfo;

        this.keys = keys;
        if (recordInput) {
            this.keyRecorder = new KeyRecorder();
        }
    }

    getAnimationName() {
        let animName = 'idle';
        let loop = true;

        if (this.dead) {
            animName = 'die';
            loop = false;
        }
        else if (this.dx !== 0 || this.dy !== 0) {
            animName = 'run';
        }

        return { animName, loop }
    }

    render(context: CanvasRenderingContext2D) {
        // super.render(context);

        const {animName, loop} = this.getAnimationName();

        Aseprite.drawAnimation({
            context,
            image: imageName,
            animationName: animName,
            time: this.animCount,
            position: {x: this.midX, y: this.maxY},
            scale: PHYSICS_SCALE,
            anchorRatios: {x: 0.5, y: 1},
            flippedX: this.facingDir === FacingDir.Left,
            loop,
            layers: playerInfoToLayers(this.visualInfo),
        });
    }

    cameraFocus(): Point {
        return { x: this.midX, y: this.maxY };
    }

    update(dt: number) {
        this.animCount += dt;

        // TODO: Maybe checking what animation frame we're add and playing a sound effect (e.g. if it's a footstep frame.)
        if (this.dead) {
            return;
        }

        const left = this.keys.anyIsPressed(LEFT_KEYS);
        const right = this.keys.anyIsPressed(RIGHT_KEYS);
        const up = this.keys.anyIsPressed(UP_KEYS);
        const down = this.keys.anyIsPressed(DOWN_KEYS);
        const action = this.keys.anyIsPressed(ACTION_KEYS);

        // TODO: Record this somehow.
        // Also TODO: Damping to make this smooth.
        if (left && !right) {
            this.dx = -this.runSpeed;
            this.facingDir = FacingDir.Left;
        }
        else if (right && !left) {
            this.dx = this.runSpeed;
            this.facingDir = FacingDir.Right;
        }
        else {
            this.dx = 0;
        }

        if (up && !down) {
            this.dy = -this.runSpeed;
        }
        else if (down && !up) {
            this.dy = this.runSpeed;
        }
        else {
            this.dy = 0;
        }

        this.moveX(dt);
        this.moveY(dt);

        // Checking for winning
        if (this.isOnTile(this.level.tiles.objectLayer, ObjectTile.Goal)) {
            this.level.win();
        }

        // Check for dying X_X
        if (this.isOnTile(this.level.tiles, PhysicTile.Hole) || this.isTouchingTile(this.level.tiles, PhysicTile.Death)) {
            this.die();
        }

        this.keyRecorder?.update(this.keys);

        if (left || right || up || down || action) {
            this.onFirstInput?.();
        }
    }

    die() {
        this.animCount = 0;
        this.dead = true;
    }

    static async preload() {
        await Aseprite.loadImage({name: imageName, basePath: 'sprites'});
    }
}