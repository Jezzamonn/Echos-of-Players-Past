import { FacingDir, Point } from "../../common";
import { DOWN_KEYS, FPS, LEFT_KEYS, PHYSICS_SCALE, RIGHT_KEYS, UP_KEYS, physFromPx } from "../../constants";
import { Aseprite } from "../../lib/aseprite";
import { NullKeys } from "../../lib/keys";
import { Level } from "../level";
import { ObjectTile } from "../tile/object-layer";
import { Entity } from "./entity";

const imageName = 'characters';

export class Player extends Entity {

    runSpeed = 1 * PHYSICS_SCALE * FPS;

    controlledByPlayer = true;
    facingDir = FacingDir.Right;

    constructor(level: Level) {
        super(level);
        // TODO: Set w and h
        this.w = physFromPx(5);
        this.h = physFromPx(5);
    }

    getAnimationName() {
        let animName = 'idle';
        let loop = true;

        if (this.dx !== 0 || this.dy !== 0) {
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
        });
    }

    cameraFocus(): Point {
        return { x: this.midX, y: this.maxY };
    }

    update(dt: number) {
        this.animCount += dt;

        // TODO: Maybe checking what animation frame we're add and playing a sound effect (e.g. if it's a footstep frame.)

        let keys = this.controlledByPlayer ? this.level.game.keys : new NullKeys();

        const left = keys.anyIsPressed(LEFT_KEYS);
        const right = keys.anyIsPressed(RIGHT_KEYS);
        const up = keys.anyIsPressed(UP_KEYS);
        const down = keys.anyIsPressed(DOWN_KEYS);

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
        if (this.isTouchingTile(this.level.tiles.objectLayer, ObjectTile.Goal)) {
            this.level.win();
        }
    }

    static async preload() {
        await Aseprite.loadImage({name: imageName, basePath: 'sprites'});
    }
}