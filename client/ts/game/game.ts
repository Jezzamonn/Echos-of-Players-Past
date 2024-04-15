import {
    GAME_HEIGHT_PX,
    GAME_WIDTH_PX,
    PHYSICS_SCALE,
    RESTART_KEYS,
    TIME_STEP,
} from '../constants';
import { Aseprite } from '../lib/aseprite';
import { KeyboardKeys, NullKeys, RegularKeys } from '../lib/keys';
import { Sounds } from '../lib/sounds';
import { centerCanvas } from './camera';
import { saveMoves } from './connection/server-connection';
import { Player } from './entity/player';
import { Level } from './level';
import { LEVELS, Levels } from './levels';
import { PlayerInfo, PlayerVisualInfo } from './player-info';
import { KeyRecorder } from './recordreplay/key-recorder';
import { SFX } from './sfx';
import { Tiles } from './tile/tiles';

let levelAttemptNumber = 0;

export class Game {
    canvas?: HTMLCanvasElement;
    context?: CanvasRenderingContext2D;

    scale = 1;

    simulatedTimeMs: number | undefined;

    levelIndex = 0;
    showingTitle = true;
    curLevel: Level | undefined;

    keys: RegularKeys;
    nullKeys = new NullKeys();

    playerVisualInfo: PlayerVisualInfo | undefined;

    onLevelChange: ((name: string, attemptNum: number) => void) | undefined;

    constructor() {
        this.keys = new KeyboardKeys();

        Sounds.loadMuteState();
    }

    setCanvas(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d')!;
        this.resize();
    }

    start() {
        this.keys.setUp();

        this.resize();
        window.addEventListener('resize', () => this.resize());

        // Whenever any touch event happens, try to enter fullscreen.
        window.addEventListener('touchstart', () => this.enterFullscreen());

        this.doAnimationLoop();

        this.startLevel(0);
    }

    nextLevel() {
        this.startLevel((this.levelIndex + 1) % LEVELS.length);
    }

    prevLevel() {
        this.startLevel((this.levelIndex + LEVELS.length - 1) % LEVELS.length);
    }

    startLevel(levelIndex: number) {
        this.levelIndex = levelIndex;
        const levelInfo = LEVELS[this.levelIndex];
        const level = new Level(this, levelInfo);
        level.initFromImage();
        this.curLevel = level;
        levelAttemptNumber++;

        if (this.onLevelChange) {
            this.onLevelChange(levelInfo.name, levelAttemptNumber);
        }

        // if (levelInfo.song) {
        //     Sounds.setSong(levelInfo.song);
        // }
    }

    selectPlayers(players: PlayerInfo[]) {
        for (const player of players) {
            this.curLevel?.spawnReplayer(player);
        }
        this.curLevel?.startInput();
    }

    get inputStarted() {
        return this.curLevel?.inputStarted ?? false;
    }

    win() {
        // Should only be one new recording.
        const history = this.curLevel?.player?.keyRecorder?.keyHistory;
        if (history) {
            saveMoves(this.playerVisualInfo!, this.curLevel!.levelInfo.name, history);
        }

        this.nextLevel();
    }

    debugLoop() {
        // Debug thing to test that we can record input properly:
        const oldHistorys = this.curLevel?.keyReplayers.map((r) => r.keyHistory) ?? [];

        // Get all the players
        const players = this.curLevel?.entities.filter((e) => e instanceof Player) as Player[];
        const inputRecordings = players
            .map((p) => p.keyRecorder)
            .filter((r) => r != undefined) as KeyRecorder[];

        this.startLevel(this.levelIndex);

        if (this.playerVisualInfo == undefined) {
            return;
        }

        // Add players to the new level
        for (const recording of inputRecordings) {
            const newPlayerInfo: PlayerInfo = Object.assign(
                { moves: recording.keyHistory, player: 'DebugPlayer' },
                this.playerVisualInfo
            );

            this.curLevel!.spawnReplayer(newPlayerInfo);
        }
        for (const history of oldHistorys) {
            const newPlayerInfo: PlayerInfo = Object.assign(
                { moves: history, player: 'DebugPlayer' },
                this.playerVisualInfo
            );

            this.curLevel!.spawnReplayer(newPlayerInfo);
        }
    }

    doAnimationLoop() {
        if (this.simulatedTimeMs == undefined) {
            this.simulatedTimeMs = Date.now();
        }

        let curTime = Date.now();
        let updateCount = 0;
        while (this.simulatedTimeMs < curTime) {
            this.update(TIME_STEP);

            this.simulatedTimeMs += 1000 * TIME_STEP;

            updateCount++;
            if (updateCount > 10) {
                this.simulatedTimeMs = curTime;
                break;
            }
        }

        this.render();

        requestAnimationFrame(() => this.doAnimationLoop());
    }

    handleInput() {
        if (this.keys.wasPressedThisFrame('KeyM')) {
            // Mute
            Sounds.toggleMute();
        }
        // Debug:
        if (this.keys.wasPressedThisFrame('Comma')) {
            this.prevLevel();
        }
        if (this.keys.wasPressedThisFrame('Period')) {
            this.nextLevel();
        }
        // if (this.keys.wasPressedThisFrame('KeyN')) {
        //     this.debugLoop();
        // }

        if (this.keys.anyWasPressedThisFrame(RESTART_KEYS)) {
            this.startLevel(this.levelIndex);
        }
    }

    update(dt: number) {
        try {
            this.handleInput();

            this.curLevel?.update(dt);

            this.keys.resetFrame();
        } catch (e) {
            console.error(e);
        }
    }

    applyScale(context: CanvasRenderingContext2D) {
        context.scale(this.scale, this.scale);
    }

    render() {
        if (!this.context) {
            return;
        }

        this.context.resetTransform();
        centerCanvas(this.context);
        this.applyScale(this.context);

        try {
            this.curLevel?.render(this.context);
        } catch (e) {
            console.error(e);
        }
    }

    resize() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const pixelScale = window.devicePixelRatio || 1;

        // Set canvas size
        const xScale = windowWidth / GAME_WIDTH_PX;
        const yScale = windowHeight / GAME_HEIGHT_PX;

        // Math.min = scale to fit
        const pxScale = Math.floor(Math.min(xScale, yScale) * pixelScale);
        this.scale = pxScale / PHYSICS_SCALE;

        document.body.style.setProperty('--scale', `${pxScale / pixelScale}`);

        // TODO: Think about how this fits with the lit element stuff.

        if (!this.canvas || !this.context) {
            return;
        }

        this.canvas.width = windowWidth * pixelScale;
        this.canvas.height = windowHeight * pixelScale;
        this.canvas.style.width = `${windowWidth}px`;
        this.canvas.style.height = `${windowHeight}px`;
        // Need to call this again when the canvas size changes.
        Aseprite.disableSmoothing(this.context);

        // Set HTML element size
        document.body.style.setProperty('--pageWidth', `${windowWidth}px`);
        document.body.style.setProperty('--pageHeight', `${windowHeight}px`);
    }

    enterFullscreen() {
        // If we're already fullscreen, don't do anything.
        if (document.fullscreenElement) {
            return;
        }

        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        }
    }

    static async preload() {
        await Promise.all([
            Levels.preload(),
            Tiles.preload(),
            Player.preload(),
            Sounds.loadSound({ name: 'melody', path: 'music/' }),
            Sounds.loadSound({ name: 'bass', path: 'music/' }),
            Sounds.loadSound({ name: 'chords', path: 'music/' }),
            Sounds.loadSound({ name: 'chords-small', path: 'music/' }),
            Sounds.loadSound({ name: 'drums', path: 'music/' }),
            Sounds.loadSound({ name: 'drums-small', path: 'music/' }),
        ]);
        // Not awaitable.
        SFX.preload();
    }
}
