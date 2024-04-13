/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./ts/common.ts":
/*!**********************!*\
  !*** ./ts/common.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Dir: () => (/* binding */ Dir),
/* harmony export */   Dirs: () => (/* binding */ Dirs),
/* harmony export */   FacingDir: () => (/* binding */ FacingDir)
/* harmony export */ });
var Dir;
(function (Dir) {
    Dir[Dir["Up"] = 0] = "Up";
    Dir[Dir["Down"] = 1] = "Down";
    Dir[Dir["Left"] = 2] = "Left";
    Dir[Dir["Right"] = 3] = "Right";
})(Dir || (Dir = {}));
class Dirs {
    static cornersInDirection(dir) {
        // What we have to multiply the width and height by to get the corners of an rectangle if the given direction.
        switch (dir) {
            case Dir.Up:
                return [{ x: 0, y: 0 }, { x: 1, y: 0 }];
            case Dir.Down:
                return [{ x: 0, y: 1 }, { x: 1, y: 1 }];
            case Dir.Left:
                return [{ x: 0, y: 0 }, { x: 0, y: 1 }];
            case Dir.Right:
                return [{ x: 1, y: 0 }, { x: 1, y: 1 }];
            default:
                // Every corner
                return [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }];
        }
    }
}
var FacingDir;
(function (FacingDir) {
    FacingDir[FacingDir["Left"] = 0] = "Left";
    FacingDir[FacingDir["Right"] = 1] = "Right";
})(FacingDir || (FacingDir = {}));


/***/ }),

/***/ "./ts/constants.ts":
/*!*************************!*\
  !*** ./ts/constants.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ACTION_KEYS: () => (/* binding */ ACTION_KEYS),
/* harmony export */   DOWN_KEYS: () => (/* binding */ DOWN_KEYS),
/* harmony export */   FPS: () => (/* binding */ FPS),
/* harmony export */   GAME_HEIGHT: () => (/* binding */ GAME_HEIGHT),
/* harmony export */   GAME_HEIGHT_PX: () => (/* binding */ GAME_HEIGHT_PX),
/* harmony export */   GAME_WIDTH: () => (/* binding */ GAME_WIDTH),
/* harmony export */   GAME_WIDTH_PX: () => (/* binding */ GAME_WIDTH_PX),
/* harmony export */   LEFT_KEYS: () => (/* binding */ LEFT_KEYS),
/* harmony export */   PHYSICS_SCALE: () => (/* binding */ PHYSICS_SCALE),
/* harmony export */   PIXEL_SCALE: () => (/* binding */ PIXEL_SCALE),
/* harmony export */   RESTART_KEYS: () => (/* binding */ RESTART_KEYS),
/* harmony export */   RIGHT_KEYS: () => (/* binding */ RIGHT_KEYS),
/* harmony export */   SELECT_KEYS: () => (/* binding */ SELECT_KEYS),
/* harmony export */   TILE_SIZE: () => (/* binding */ TILE_SIZE),
/* harmony export */   TILE_SIZE_PX: () => (/* binding */ TILE_SIZE_PX),
/* harmony export */   TIME_STEP: () => (/* binding */ TIME_STEP),
/* harmony export */   TITLE_KEYS: () => (/* binding */ TITLE_KEYS),
/* harmony export */   UP_KEYS: () => (/* binding */ UP_KEYS),
/* harmony export */   physFromPx: () => (/* binding */ physFromPx),
/* harmony export */   pxFromPhys: () => (/* binding */ pxFromPhys),
/* harmony export */   rng: () => (/* binding */ rng)
/* harmony export */ });
/* harmony import */ var _lib_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/util */ "./ts/lib/util.ts");

// Multiple for the fixed-point physics.
const PHYSICS_SCALE = 16;
const FPS = 60;
const TIME_STEP = 1 / FPS;
const PIXEL_SCALE = 4;
const GAME_WIDTH_PX = 200;
const GAME_HEIGHT_PX = 150;
const GAME_WIDTH = GAME_WIDTH_PX * PHYSICS_SCALE;
const GAME_HEIGHT = GAME_HEIGHT_PX * PHYSICS_SCALE;
const TILE_SIZE_PX = 16;
const TILE_SIZE = TILE_SIZE_PX * PHYSICS_SCALE;
const LEFT_KEYS = ['KeyA', 'ArrowLeft'];
const RIGHT_KEYS = ['KeyD', 'ArrowRight'];
const UP_KEYS = ['KeyW', 'ArrowUp'];
const DOWN_KEYS = ['KeyS', 'ArrowDown'];
const ACTION_KEYS = ['KeyE', 'Space'];
const SELECT_KEYS = ['Space', 'Enter'];
const TITLE_KEYS = ['Space', 'Enter'];
const RESTART_KEYS = ['KeyR'];
function physFromPx(x) {
    return x * PHYSICS_SCALE;
}
function pxFromPhys(x) {
    return Math.floor(x / PHYSICS_SCALE);
}
// Not really a constant :)
const rng = (0,_lib_util__WEBPACK_IMPORTED_MODULE_0__.seededRandom)("hahahahahihihihi");


/***/ }),

/***/ "./ts/game/camera.ts":
/*!***************************!*\
  !*** ./ts/game/camera.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Camera: () => (/* binding */ Camera),
/* harmony export */   FocusCamera: () => (/* binding */ FocusCamera),
/* harmony export */   centerCanvas: () => (/* binding */ centerCanvas)
/* harmony export */ });
/* harmony import */ var _lib_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/util */ "./ts/lib/util.ts");

class Camera {
    constructor() {
    }
    update(dt) { }
    applyTransform(context) { }
}
class FocusCamera extends Camera {
    constructor() {
        super();
    }
    update(dt) {
        if (!this.target) {
            return;
        }
        const targetPos = this.target();
        if (!this.curPos) {
            this.curPos = targetPos;
            return;
        }
        const updateSmoothness = 1 - Math.exp(-2 * dt);
        this.curPos.x = (0,_lib_util__WEBPACK_IMPORTED_MODULE_0__.lerp)(this.curPos.x, targetPos.x, updateSmoothness);
        this.curPos.y = (0,_lib_util__WEBPACK_IMPORTED_MODULE_0__.lerp)(this.curPos.y, targetPos.y, updateSmoothness);
    }
    applyTransform(context, scale = 1) {
        if (this.curPos) {
            context.translate(Math.round(-scale * this.curPos.x), Math.round(-scale * this.curPos.y));
        }
    }
}
const screenPos = { x: 0.5, y: 0.6 };
function centerCanvas(context) {
    context.translate(Math.round(context.canvas.width * screenPos.x), Math.round(context.canvas.height * screenPos.y));
}


/***/ }),

/***/ "./ts/game/entity/entity.ts":
/*!**********************************!*\
  !*** ./ts/game/entity/entity.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Entity: () => (/* binding */ Entity)
/* harmony export */ });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common */ "./ts/common.ts");
/* harmony import */ var _tile_tiles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tile/tiles */ "./ts/game/tile/tiles.ts");


class Entity {
    constructor(level) {
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.dx = 0;
        this.dy = 0;
        this.animCount = 0;
        this.canCollide = true;
        this.done = false;
        this.debugColor = '#ff00ff';
        this.level = level;
    }
    update(dt) {
        this.animCount += dt;
        this.move(dt);
    }
    move(dt) {
        this.moveX(dt);
        this.moveY(dt);
    }
    moveX(dt) {
        this.x += this.dx * dt;
        this.x = Math.round(this.x);
        if (!this.canCollide) {
            return;
        }
        if (this.dx < 0) {
            if (this.isTouchingTile(this.level.tiles, _tile_tiles__WEBPACK_IMPORTED_MODULE_1__.PhysicTile.Wall, { dir: _common__WEBPACK_IMPORTED_MODULE_0__.Dir.Left })) {
                this.onLeftCollision();
            }
        }
        else if (this.dx > 0) {
            if (this.isTouchingTile(this.level.tiles, _tile_tiles__WEBPACK_IMPORTED_MODULE_1__.PhysicTile.Wall, { dir: _common__WEBPACK_IMPORTED_MODULE_0__.Dir.Right })) {
                this.onRightCollision();
            }
        }
    }
    moveY(dt) {
        this.y += this.dy * dt;
        this.y = Math.round(this.y);
        if (!this.canCollide) {
            return;
        }
        if (this.dy < 0) {
            if (this.isTouchingTile(this.level.tiles, _tile_tiles__WEBPACK_IMPORTED_MODULE_1__.PhysicTile.Wall, { dir: _common__WEBPACK_IMPORTED_MODULE_0__.Dir.Up })) {
                this.onUpCollision();
            }
        }
        else if (this.dy > 0) {
            if (this.isTouchingTile(this.level.tiles, _tile_tiles__WEBPACK_IMPORTED_MODULE_1__.PhysicTile.Wall, { dir: _common__WEBPACK_IMPORTED_MODULE_0__.Dir.Down })) {
                this.onDownCollision();
            }
        }
    }
    onLeftCollision() {
        const resetPos = this.level.tiles.getTileCoordFromCoord({ x: this.minX, y: 0 }, { x: 1, y: 0 });
        this.minX = resetPos.x + 1;
        this.dx = 0;
    }
    onRightCollision() {
        const resetPos = this.level.tiles.getTileCoordFromCoord({ x: this.maxX, y: 0 }, { x: 0, y: 0 });
        this.maxX = resetPos.x - 1;
        this.dx = 0;
    }
    onUpCollision() {
        const resetPos = this.level.tiles.getTileCoordFromCoord({ x: 0, y: this.minY }, { x: 0, y: 1 });
        this.minY = resetPos.y + 1;
        this.dy = 0;
    }
    onDownCollision() {
        const resetPos = this.level.tiles.getTileCoordFromCoord({ x: 0, y: this.maxY }, { x: 0, y: 0 });
        this.maxY = resetPos.y - 1;
        this.dy = 0;
    }
    isTouchingTile(tileSource, tile, { dir = undefined, offset = undefined } = {}) {
        if (!Array.isArray(tile)) {
            tile = [tile];
        }
        const corners = _common__WEBPACK_IMPORTED_MODULE_0__.Dirs.cornersInDirection(dir);
        for (const corner of corners) {
            const x = this.x + corner.x * this.w + (offset?.x ?? 0);
            const y = this.y + corner.y * this.h + (offset?.y ?? 0);
            for (const t of tile) {
                if (tileSource.getTileAtCoord({ x, y }) === t) {
                    return true;
                }
            }
        }
        return false;
    }
    isTouchingEntity(other) {
        return this.maxX > other.minX && this.minX < other.maxX && this.maxY > other.minY && this.minY < other.maxY;
    }
    render(context) {
        if (this.debugColor) {
            context.fillStyle = this.debugColor;
            context.fillRect(this.x, this.y, this.w, this.h);
            // console.log(`Rendering entity at ${this.x}, ${this.y} with size ${this.w}, ${this.h}`);
        }
    }
    //#region Getters and setter for min / mid / max.
    get minX() {
        return this.x;
    }
    get minY() {
        return this.y;
    }
    get maxX() {
        return this.x + this.w;
    }
    get maxY() {
        return this.y + this.h;
    }
    get midX() {
        return this.x + this.w / 2;
    }
    get midY() {
        return this.y + this.h / 2;
    }
    set minX(val) {
        this.x = val;
    }
    set minY(val) {
        this.y = val;
    }
    set maxX(val) {
        this.x = val - this.w;
    }
    set maxY(val) {
        this.y = val - this.h;
    }
    set midX(val) {
        this.x = val - this.w / 2;
    }
    set midY(val) {
        this.y = val - this.h / 2;
    }
}


/***/ }),

/***/ "./ts/game/entity/player.ts":
/*!**********************************!*\
  !*** ./ts/game/entity/player.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Player: () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common */ "./ts/common.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants */ "./ts/constants.ts");
/* harmony import */ var _lib_aseprite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/aseprite */ "./ts/lib/aseprite.ts");
/* harmony import */ var _lib_keys__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib/keys */ "./ts/lib/keys.ts");
/* harmony import */ var _tile_object_layer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tile/object-layer */ "./ts/game/tile/object-layer.ts");
/* harmony import */ var _entity__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./entity */ "./ts/game/entity/entity.ts");






const imageName = 'characters';
class Player extends _entity__WEBPACK_IMPORTED_MODULE_5__.Entity {
    constructor(level) {
        super(level);
        this.runSpeed = 1 * _constants__WEBPACK_IMPORTED_MODULE_1__.PHYSICS_SCALE * _constants__WEBPACK_IMPORTED_MODULE_1__.FPS;
        this.controlledByPlayer = true;
        this.facingDir = _common__WEBPACK_IMPORTED_MODULE_0__.FacingDir.Right;
        // TODO: Set w and h
        this.w = (0,_constants__WEBPACK_IMPORTED_MODULE_1__.physFromPx)(5);
        this.h = (0,_constants__WEBPACK_IMPORTED_MODULE_1__.physFromPx)(5);
    }
    getAnimationName() {
        let animName = 'idle';
        let loop = true;
        if (this.dx !== 0 || this.dy !== 0) {
            animName = 'run';
        }
        return { animName, loop };
    }
    render(context) {
        // super.render(context);
        const { animName, loop } = this.getAnimationName();
        _lib_aseprite__WEBPACK_IMPORTED_MODULE_2__.Aseprite.drawAnimation({
            context,
            image: imageName,
            animationName: animName,
            time: this.animCount,
            position: { x: this.midX, y: this.maxY },
            scale: _constants__WEBPACK_IMPORTED_MODULE_1__.PHYSICS_SCALE,
            anchorRatios: { x: 0.5, y: 1 },
            flippedX: this.facingDir === _common__WEBPACK_IMPORTED_MODULE_0__.FacingDir.Left,
            loop,
        });
    }
    cameraFocus() {
        return { x: this.midX, y: this.maxY };
    }
    update(dt) {
        this.animCount += dt;
        // TODO: Maybe checking what animation frame we're add and playing a sound effect (e.g. if it's a footstep frame.)
        let keys = this.controlledByPlayer ? this.level.game.keys : new _lib_keys__WEBPACK_IMPORTED_MODULE_3__.NullKeys();
        const left = keys.anyIsPressed(_constants__WEBPACK_IMPORTED_MODULE_1__.LEFT_KEYS);
        const right = keys.anyIsPressed(_constants__WEBPACK_IMPORTED_MODULE_1__.RIGHT_KEYS);
        const up = keys.anyIsPressed(_constants__WEBPACK_IMPORTED_MODULE_1__.UP_KEYS);
        const down = keys.anyIsPressed(_constants__WEBPACK_IMPORTED_MODULE_1__.DOWN_KEYS);
        // TODO: Record this somehow.
        // Also TODO: Damping to make this smooth.
        if (left && !right) {
            this.dx = -this.runSpeed;
            this.facingDir = _common__WEBPACK_IMPORTED_MODULE_0__.FacingDir.Left;
        }
        else if (right && !left) {
            this.dx = this.runSpeed;
            this.facingDir = _common__WEBPACK_IMPORTED_MODULE_0__.FacingDir.Right;
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
        if (this.isTouchingTile(this.level.tiles.objectLayer, _tile_object_layer__WEBPACK_IMPORTED_MODULE_4__.ObjectTile.Goal)) {
            this.level.win();
        }
    }
    static async preload() {
        await _lib_aseprite__WEBPACK_IMPORTED_MODULE_2__.Aseprite.loadImage({ name: imageName, basePath: 'sprites' });
    }
}


/***/ }),

/***/ "./ts/game/game.ts":
/*!*************************!*\
  !*** ./ts/game/game.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Game: () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./ts/constants.ts");
/* harmony import */ var _lib_aseprite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/aseprite */ "./ts/lib/aseprite.ts");
/* harmony import */ var _lib_keys__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/keys */ "./ts/lib/keys.ts");
/* harmony import */ var _lib_sounds__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/sounds */ "./ts/lib/sounds.ts");
/* harmony import */ var _camera__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./camera */ "./ts/game/camera.ts");
/* harmony import */ var _entity_player__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./entity/player */ "./ts/game/entity/player.ts");
/* harmony import */ var _level__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./level */ "./ts/game/level.ts");
/* harmony import */ var _levels__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./levels */ "./ts/game/levels.ts");
/* harmony import */ var _sfx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./sfx */ "./ts/game/sfx.ts");
/* harmony import */ var _tile_tiles__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./tile/tiles */ "./ts/game/tile/tiles.ts");










class Game {
    constructor(canvasSelector) {
        this.scale = 1;
        this.levelIndex = 0;
        this.showingTitle = true;
        this.nullKeys = new _lib_keys__WEBPACK_IMPORTED_MODULE_2__.NullKeys();
        const canvas = document.querySelector(canvasSelector);
        if (!canvas) {
            throw new Error(`Could not find canvas with selector ${canvasSelector}`);
        }
        const context = canvas.getContext('2d');
        this.canvas = canvas;
        this.context = context;
        this.keys = new _lib_keys__WEBPACK_IMPORTED_MODULE_2__.KeyboardKeys();
        _lib_sounds__WEBPACK_IMPORTED_MODULE_3__.Sounds.loadMuteState();
    }
    start() {
        this.keys.setUp();
        _lib_aseprite__WEBPACK_IMPORTED_MODULE_1__.Aseprite.disableSmoothing(this.context);
        this.resize();
        window.addEventListener('resize', () => this.resize());
        // Whenever any touch event happens, try to enter fullscreen.
        window.addEventListener('touchstart', () => this.enterFullscreen());
        this.doAnimationLoop();
        this.startLevel(0);
    }
    nextLevel() {
        this.startLevel((this.levelIndex + 1) % _levels__WEBPACK_IMPORTED_MODULE_7__.LEVELS.length);
    }
    prevLevel() {
        this.startLevel((this.levelIndex + _levels__WEBPACK_IMPORTED_MODULE_7__.LEVELS.length - 1) % _levels__WEBPACK_IMPORTED_MODULE_7__.LEVELS.length);
    }
    startLevel(levelIndex) {
        this.levelIndex = levelIndex;
        const levelInfo = _levels__WEBPACK_IMPORTED_MODULE_7__.LEVELS[this.levelIndex];
        const level = new _level__WEBPACK_IMPORTED_MODULE_6__.Level(this, levelInfo);
        level.initFromImage();
        this.curLevel = level;
        // if (levelInfo.song) {
        //     Sounds.setSong(levelInfo.song);
        // }
    }
    win() {
        this.nextLevel();
    }
    doAnimationLoop() {
        if (this.simulatedTimeMs == undefined) {
            this.simulatedTimeMs = Date.now();
        }
        let curTime = Date.now();
        let updateCount = 0;
        while (this.simulatedTimeMs < curTime) {
            this.update(_constants__WEBPACK_IMPORTED_MODULE_0__.TIME_STEP);
            this.simulatedTimeMs += 1000 * _constants__WEBPACK_IMPORTED_MODULE_0__.TIME_STEP;
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
            _lib_sounds__WEBPACK_IMPORTED_MODULE_3__.Sounds.toggleMute();
        }
        // Debug:
        if (this.keys.wasPressedThisFrame('Comma')) {
            this.prevLevel();
        }
        if (this.keys.wasPressedThisFrame('Period')) {
            this.nextLevel();
        }
        if (this.keys.anyWasPressedThisFrame(_constants__WEBPACK_IMPORTED_MODULE_0__.RESTART_KEYS)) {
            this.startLevel(this.levelIndex);
        }
    }
    update(dt) {
        try {
            this.handleInput();
            this.curLevel?.update(dt);
            this.keys.resetFrame();
        }
        catch (e) {
            console.error(e);
        }
    }
    applyScale(context) {
        context.scale(this.scale, this.scale);
    }
    render() {
        this.context.resetTransform();
        (0,_camera__WEBPACK_IMPORTED_MODULE_4__.centerCanvas)(this.context);
        this.applyScale(this.context);
        try {
            this.curLevel?.render(this.context);
        }
        catch (e) {
            console.error(e);
        }
    }
    resize() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const pixelScale = window.devicePixelRatio || 1;
        // Set canvas size
        const xScale = windowWidth / _constants__WEBPACK_IMPORTED_MODULE_0__.GAME_WIDTH_PX;
        const yScale = windowHeight / _constants__WEBPACK_IMPORTED_MODULE_0__.GAME_HEIGHT_PX;
        // Math.min = scale to fit
        const pxScale = Math.floor(Math.min(xScale, yScale) * pixelScale);
        this.scale = pxScale / _constants__WEBPACK_IMPORTED_MODULE_0__.PHYSICS_SCALE;
        document.body.style.setProperty('--scale', `${pxScale / pixelScale}`);
        this.canvas.width = windowWidth * pixelScale;
        this.canvas.height = windowHeight * pixelScale;
        this.canvas.style.width = `${windowWidth}px`;
        this.canvas.style.height = `${windowHeight}px`;
        // Need to call this again when the canvas size changes.
        _lib_aseprite__WEBPACK_IMPORTED_MODULE_1__.Aseprite.disableSmoothing(this.context);
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
            _levels__WEBPACK_IMPORTED_MODULE_7__.Levels.preload(),
            _tile_tiles__WEBPACK_IMPORTED_MODULE_9__.Tiles.preload(),
            _entity_player__WEBPACK_IMPORTED_MODULE_5__.Player.preload(),
        ]);
        _sfx__WEBPACK_IMPORTED_MODULE_8__.SFX.preload();
    }
}


/***/ }),

/***/ "./ts/game/level.ts":
/*!**************************!*\
  !*** ./ts/game/level.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Level: () => (/* binding */ Level)
/* harmony export */ });
/* harmony import */ var _lib_images__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/images */ "./ts/lib/images.ts");
/* harmony import */ var _camera__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./camera */ "./ts/game/camera.ts");
/* harmony import */ var _entity_player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./entity/player */ "./ts/game/entity/player.ts");
/* harmony import */ var _tile_base_layer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tile/base-layer */ "./ts/game/tile/base-layer.ts");
/* harmony import */ var _tile_object_layer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tile/object-layer */ "./ts/game/tile/object-layer.ts");
/* harmony import */ var _tile_tiles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tile/tiles */ "./ts/game/tile/tiles.ts");






// Contains everything in one level, including the tiles and the entities.
class Level {
    constructor(game, levelInfo) {
        this.entities = [];
        this.camera = new _camera__WEBPACK_IMPORTED_MODULE_1__.FocusCamera();
        this.tiles = new _tile_tiles__WEBPACK_IMPORTED_MODULE_5__.Tiles(0, 0);
        this.start = { x: 0, y: 0 };
        this.won = false;
        this.game = game;
        this.levelInfo = levelInfo;
    }
    initFromImage() {
        const image = _lib_images__WEBPACK_IMPORTED_MODULE_0__.Images.images[this.levelInfo.name].image;
        this.image = image;
        this.entities = [];
        this.tiles = new _tile_tiles__WEBPACK_IMPORTED_MODULE_5__.Tiles(image.width, image.height);
        // Draw the image to a canvas to get the pixels.
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext('2d');
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
                    this.tiles.baseLayer.setTile({ x, y }, _tile_base_layer__WEBPACK_IMPORTED_MODULE_3__.BaseTile.Wall, { allowGrow: false });
                }
                else if (color === 'aaaaaa') {
                    this.tiles.baseLayer.setTile({ x, y }, _tile_base_layer__WEBPACK_IMPORTED_MODULE_3__.BaseTile.Hole, { allowGrow: false });
                }
                else if (color === 'ffff00') {
                    this.tiles.objectLayer.setTile({ x, y }, _tile_object_layer__WEBPACK_IMPORTED_MODULE_4__.ObjectTile.Goal, { allowGrow: false });
                    this.tiles.baseLayer.setTile({ x, y }, _tile_base_layer__WEBPACK_IMPORTED_MODULE_3__.BaseTile.Empty, { allowGrow: false });
                }
                else if (color === 'ff0000') {
                    this.start = this.tiles.getTileCoord({ x, y }, { x: 0.5, y: 0.5 });
                    this.tiles.objectLayer.setTile({ x, y }, _tile_object_layer__WEBPACK_IMPORTED_MODULE_4__.ObjectTile.Spawn, { allowGrow: false });
                    this.tiles.baseLayer.setTile({ x, y }, _tile_base_layer__WEBPACK_IMPORTED_MODULE_3__.BaseTile.Empty, { allowGrow: false });
                }
                else if (color === '0000ff') {
                    this.tiles.objectLayer.setTile({ x, y }, _tile_object_layer__WEBPACK_IMPORTED_MODULE_4__.ObjectTile.Platform, { allowGrow: false });
                    this.tiles.baseLayer.setTile({ x, y }, _tile_base_layer__WEBPACK_IMPORTED_MODULE_3__.BaseTile.Empty, { allowGrow: false });
                }
                else {
                    console.log(`Unknown color: ${color} at ${x}, ${y}.`);
                }
            }
        }
        // this.camera.target = () => ({x: this.start.x, y: this.start.y});
        this.spawnPlayer();
    }
    spawnPlayer() {
        const player = new _entity_player__WEBPACK_IMPORTED_MODULE_2__.Player(this);
        player.midX = this.start.x;
        player.maxY = this.start.y;
        this.entities.push(player);
        this.camera.target = () => player.cameraFocus();
    }
    update(dt) {
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
    }
    render(context) {
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
function pixelToColorString(imageData, x, y) {
    const i = (y * imageData.width + x) * 4;
    const r = imageData.data[i];
    const g = imageData.data[i + 1];
    const b = imageData.data[i + 2];
    return r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0');
}


/***/ }),

/***/ "./ts/game/levels.ts":
/*!***************************!*\
  !*** ./ts/game/levels.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LEVELS: () => (/* binding */ LEVELS),
/* harmony export */   Levels: () => (/* binding */ Levels)
/* harmony export */ });
/* harmony import */ var _lib_images__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/images */ "./ts/lib/images.ts");
/* harmony import */ var _lib_sounds__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/sounds */ "./ts/lib/sounds.ts");


const LEVELS = [
    {
        name: 'level1',
    },
    {
        name: 'level2',
    },
];
class Levels {
    static preload() {
        const promises = [];
        for (const level of LEVELS) {
            promises.push(_lib_images__WEBPACK_IMPORTED_MODULE_0__.Images.loadImage({ name: level.name, path: 'level/', extension: 'gif' }));
            if (level.song && _lib_sounds__WEBPACK_IMPORTED_MODULE_1__.Sounds.audios[level.song] === undefined) {
                promises.push(_lib_sounds__WEBPACK_IMPORTED_MODULE_1__.Sounds.loadSound({ name: level.song, path: 'music/' }));
            }
        }
        return Promise.all(promises);
    }
}


/***/ }),

/***/ "./ts/game/sfx.ts":
/*!************************!*\
  !*** ./ts/game/sfx.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SFX: () => (/* binding */ SFX)
/* harmony export */ });
/* harmony import */ var jsfxr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsfxr */ "./node_modules/jsfxr/sfxr.js");
/* harmony import */ var _lib_sounds__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/sounds */ "./ts/lib/sounds.ts");
// @ts-ignore


const sfx = {};
class _SFX {
    constructor() {
        this.sounds = {};
    }
    preload() {
        for (let key in sfx) {
            this.sounds[key] = jsfxr__WEBPACK_IMPORTED_MODULE_0__.sfxr.toAudio(sfx[key]);
        }
    }
    play(name) {
        if (_lib_sounds__WEBPACK_IMPORTED_MODULE_1__.Sounds.muteState === _lib_sounds__WEBPACK_IMPORTED_MODULE_1__.MuteState.ALL_OFF) {
            return;
        }
        const sound = this.sounds[name];
        if (sound) {
            sound.play();
        }
    }
}
const SFX = new _SFX();


/***/ }),

/***/ "./ts/game/tile/base-layer.ts":
/*!************************************!*\
  !*** ./ts/game/tile/base-layer.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseLayer: () => (/* binding */ BaseLayer),
/* harmony export */   BaseTile: () => (/* binding */ BaseTile)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants */ "./ts/constants.ts");
/* harmony import */ var _tile_layer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tile-layer */ "./ts/game/tile/tile-layer.ts");


var BaseTile;
(function (BaseTile) {
    BaseTile[BaseTile["Empty"] = 0] = "Empty";
    BaseTile[BaseTile["Wall"] = 1] = "Wall";
    BaseTile[BaseTile["Hole"] = 2] = "Hole";
})(BaseTile || (BaseTile = {}));
class BaseLayer extends _tile_layer__WEBPACK_IMPORTED_MODULE_1__.TileLayer {
    constructor(w, h) {
        super(w, h);
    }
    renderTile(context, pos) {
        const tile = this.getTile(pos);
        const renderPos = { x: pos.x * _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE, y: pos.y * _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE };
        if (tile == BaseTile.Empty) {
            this.drawTile(context, { tilePos: { x: 1, y: 1 }, renderPos });
            return;
        }
        if (tile == BaseTile.Wall) {
            const leftTile = this.getTile({ x: pos.x - 1, y: pos.y });
            if (leftTile != BaseTile.Wall) {
                this.drawTile(context, { tilePos: { x: 2, y: 1 }, renderPos });
                return;
            }
            const rightTile = this.getTile({ x: pos.x + 1, y: pos.y });
            if (rightTile != BaseTile.Wall) {
                this.drawTile(context, { tilePos: { x: 0, y: 1 }, renderPos });
                return;
            }
            const upTile = this.getTile({ x: pos.x, y: pos.y - 1 });
            if (upTile != BaseTile.Wall) {
                this.drawTile(context, { tilePos: { x: 1, y: 2 }, renderPos });
                return;
            }
            const downTile = this.getTile({ x: pos.x, y: pos.y + 1 });
            if (downTile != BaseTile.Wall) {
                this.drawTile(context, { tilePos: { x: 1, y: 0 }, renderPos });
                return;
            }
            const upLeftTile = this.getTile({ x: pos.x - 1, y: pos.y - 1 });
            if (upLeftTile != BaseTile.Wall) {
                this.drawTile(context, { tilePos: { x: 2, y: 2 }, renderPos });
                return;
            }
            const upRightTile = this.getTile({ x: pos.x + 1, y: pos.y - 1 });
            if (upRightTile != BaseTile.Wall) {
                this.drawTile(context, { tilePos: { x: 0, y: 2 }, renderPos });
                return;
            }
            const downLeftTile = this.getTile({ x: pos.x - 1, y: pos.y + 1 });
            if (downLeftTile != BaseTile.Wall) {
                this.drawTile(context, { tilePos: { x: 2, y: 0 }, renderPos });
                return;
            }
            const downRightTile = this.getTile({ x: pos.x + 1, y: pos.y + 1 });
            if (downRightTile != BaseTile.Wall) {
                this.drawTile(context, { tilePos: { x: 0, y: 0 }, renderPos });
                return;
            }
            this.drawTile(context, { tilePos: { x: 0, y: 3 }, renderPos });
            return;
        }
        if (tile == BaseTile.Hole) {
            // A similar set of conditions as for the walls.
            for (const dx of [-1, 1]) {
                const dxTile = this.getTile({ x: pos.x + dx, y: pos.y });
                for (const dy of [-1, 1]) {
                    const subTilePos = { x: dx < 0 ? 0 : 1, y: dy < 0 ? 0 : 1 };
                    const dyTile = this.getTile({ x: pos.x, y: pos.y + dy });
                    let tilePos = { x: 3, y: 0 };
                    if (dxTile != BaseTile.Empty) {
                        tilePos.x += 1;
                    }
                    if (dyTile != BaseTile.Empty) {
                        tilePos.y += 1;
                    }
                    this.drawQuarterTile(context, {
                        tilePos,
                        subTilePos,
                        renderPos
                    });
                }
            }
        }
    }
}


/***/ }),

/***/ "./ts/game/tile/object-layer.ts":
/*!**************************************!*\
  !*** ./ts/game/tile/object-layer.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ObjectLayer: () => (/* binding */ ObjectLayer),
/* harmony export */   ObjectTile: () => (/* binding */ ObjectTile)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants */ "./ts/constants.ts");
/* harmony import */ var _tile_layer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tile-layer */ "./ts/game/tile/tile-layer.ts");


var ObjectTile;
(function (ObjectTile) {
    ObjectTile[ObjectTile["Empty"] = 0] = "Empty";
    ObjectTile[ObjectTile["Spawn"] = 1] = "Spawn";
    ObjectTile[ObjectTile["Goal"] = 2] = "Goal";
    ObjectTile[ObjectTile["Platform"] = 3] = "Platform";
})(ObjectTile || (ObjectTile = {}));
// Position of the tile in the tileset.
const tilePositions = {
    [ObjectTile.Spawn]: { x: 6, y: 0 },
    [ObjectTile.Goal]: { x: 7, y: 0 },
    [ObjectTile.Platform]: { x: 6, y: 1 },
};
class ObjectLayer extends _tile_layer__WEBPACK_IMPORTED_MODULE_1__.TileLayer {
    renderTile(context, pos) {
        const tile = this.getTile(pos);
        const renderPos = { x: pos.x * _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE, y: pos.y * _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE };
        const tilePos = tilePositions[tile];
        if (!tilePos) {
            return;
        }
        this.drawTile(context, { tilePos, renderPos });
    }
}


/***/ }),

/***/ "./ts/game/tile/tile-layer.ts":
/*!************************************!*\
  !*** ./ts/game/tile/tile-layer.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TileLayer: () => (/* binding */ TileLayer)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants */ "./ts/constants.ts");
/* harmony import */ var _lib_images__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/images */ "./ts/lib/images.ts");


/**
 * 2D array of tiles.
 */
class TileLayer {
    constructor(w, h) {
        this.tiles = [];
        this.w = 0;
        this.h = 0;
        // Index of the top left corner of this level. Can move when the level grows.
        this.x = 0;
        this.y = 0;
        this.animCount = 0;
        this.w = w;
        this.h = h;
        // Fill with the zero value.
        for (let y = 0; y < this.h; y++) {
            this.tiles[y] = [];
            for (let x = 0; x < this.w; x++) {
                this.tiles[y][x] = 0;
            }
        }
    }
    update(dt) {
        this.animCount += dt;
    }
    render(context) {
        if (!this.image) {
            const imageInfo = _lib_images__WEBPACK_IMPORTED_MODULE_1__.Images.images["tiles"];
            if (!imageInfo.loaded) {
                return;
            }
            this.image = imageInfo.image;
        }
        const invMatrix = context.getTransform().inverse();
        const gameMinPoint = invMatrix.transformPoint({ x: 0, y: 0 });
        const gameMaxPoint = invMatrix.transformPoint({
            x: context.canvas.width,
            y: context.canvas.height,
        });
        const minXTile = Math.floor(gameMinPoint.x / _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE);
        const minYTile = Math.floor(gameMinPoint.y / _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE);
        const maxXTile = Math.floor(gameMaxPoint.x / _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE);
        const maxYTile = Math.floor(gameMaxPoint.y / _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE);
        for (let y = minYTile; y <= maxYTile; y++) {
            for (let x = minXTile; x <= maxXTile; x++) {
                this.renderTile(context, { x, y });
            }
        }
    }
    renderTile(context, pos) {
        // Logic handled per layer.
    }
    drawTile(context, { tilePos, renderPos, }) {
        // Image must be loaded when this is called.
        context.drawImage(this.image, tilePos.x * _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE_PX, tilePos.y * _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE_PX, _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE_PX, _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE_PX, renderPos.x, renderPos.y, 
        // +1 is a kludge to avoid gaps between tiles.
        _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE + 1, _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE + 1);
    }
    drawQuarterTile(context, { tilePos, subTilePos, renderPos, }) {
        // Image must be loaded when this is called.
        const halfTileSizePx = _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE_PX / 2;
        const halfTileSize = _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE / 2;
        context.drawImage(this.image, tilePos.x * _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE_PX + subTilePos.x * halfTileSizePx, tilePos.y * _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE_PX + subTilePos.y * halfTileSizePx, halfTileSizePx, halfTileSizePx, renderPos.x + subTilePos.x * halfTileSize, renderPos.y + subTilePos.y * halfTileSize, 
        // +1 is a kludge to avoid gaps between tiles.
        halfTileSize + 1, halfTileSize + 1);
    }
    setTile(p, tile, { allowGrow = true } = {}) {
        // If out of bounds, extend the board!
        let y = p.y;
        while (allowGrow && y + this.y < 1) {
            this.tiles.unshift(this.tiles[0].slice());
            this.y++;
            this.h++;
        }
        while (allowGrow && y + this.y >= this.h - 1) {
            this.tiles.push(this.tiles[this.h - 1].slice());
            this.h++;
        }
        let x = p.x;
        while (allowGrow && x + this.x < 1) {
            for (let y = 0; y < this.h; y++) {
                this.tiles[y].unshift(this.tiles[y][0]);
            }
            this.x++;
            this.w++;
        }
        while (allowGrow && x + this.x >= this.w - 1) {
            for (let y = 0; y < this.h; y++) {
                this.tiles[y].push(this.tiles[y][this.w - 1]);
            }
            this.w++;
        }
        // Check if we're out of bounds, for when allowGrow is false.
        if (p.x + this.x < 0 || p.y + this.y < 0 || p.x + this.x >= this.w || p.y + this.y >= this.h) {
            throw new Error(`Tile out of bounds: ${p.x}, ${p.y}`);
        }
        this.tiles[p.y + this.y][p.x + this.x] = tile;
    }
    setTileAtCoord(p, tile, { allowGrow = true } = {}) {
        this.setTile({
            x: Math.floor(p.x / _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE),
            y: Math.floor(p.y / _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE),
        }, tile, { allowGrow });
    }
    getTile(p) {
        let x = Math.min(Math.max(p.x + this.x, 0), this.w - 1);
        let y = Math.min(Math.max(p.y + this.y, 0), this.h - 1);
        return this.tiles[y][x];
    }
    getTileAtCoord(p) {
        return this.getTile({
            x: Math.floor(p.x / _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE),
            y: Math.floor(p.y / _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE),
        });
    }
    get minX() {
        return this.x;
    }
    get minY() {
        return this.y;
    }
    get maxX() {
        return this.x + this.w - 1;
    }
    get maxY() {
        return this.y + this.h - 1;
    }
}


/***/ }),

/***/ "./ts/game/tile/tiles.ts":
/*!*******************************!*\
  !*** ./ts/game/tile/tiles.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PhysicTile: () => (/* binding */ PhysicTile),
/* harmony export */   Tiles: () => (/* binding */ Tiles)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants */ "./ts/constants.ts");
/* harmony import */ var _lib_images__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/images */ "./ts/lib/images.ts");
/* harmony import */ var _base_layer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base-layer */ "./ts/game/tile/base-layer.ts");
/* harmony import */ var _object_layer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./object-layer */ "./ts/game/tile/object-layer.ts");




// All the types of tiles as far as how they interact with the game physics.
var PhysicTile;
(function (PhysicTile) {
    PhysicTile[PhysicTile["Empty"] = 0] = "Empty";
    PhysicTile[PhysicTile["Wall"] = 1] = "Wall";
    PhysicTile[PhysicTile["Hole"] = 2] = "Hole";
})(PhysicTile || (PhysicTile = {}));
/**
 * 2D array of tiles.
 */
class Tiles {
    constructor(w, h) {
        this.baseLayer = new _base_layer__WEBPACK_IMPORTED_MODULE_2__.BaseLayer(w, h);
        this.objectLayer = new _object_layer__WEBPACK_IMPORTED_MODULE_3__.ObjectLayer(w, h);
    }
    update(dt) {
        this.baseLayer.update(dt);
        this.objectLayer.update(dt);
    }
    render(context) {
        this.baseLayer.render(context);
        this.objectLayer.render(context);
    }
    getTileCoord(p, positionInTile) {
        return {
            x: p.x * _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE + (_constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE - 1) * positionInTile.x,
            y: p.y * _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE + (_constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE - 1) * positionInTile.y,
        };
    }
    getTileCoordFromCoord(p, positionInTile) {
        return this.getTileCoord({ x: Math.floor(p.x / _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE), y: Math.floor(p.y / _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE) }, positionInTile);
    }
    static async preload() {
        await _lib_images__WEBPACK_IMPORTED_MODULE_1__.Images.loadImage({ name: "tiles", path: "sprites/" });
    }
    getTile(p) {
        const baseTile = this.baseLayer.getTile(p);
        if (baseTile == _base_layer__WEBPACK_IMPORTED_MODULE_2__.BaseTile.Wall) {
            return PhysicTile.Wall;
        }
        else if (baseTile == _base_layer__WEBPACK_IMPORTED_MODULE_2__.BaseTile.Hole) {
            return PhysicTile.Hole;
        }
        return PhysicTile.Empty;
    }
    getTileAtCoord(p) {
        return this.getTile({
            x: Math.floor(p.x / _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE),
            y: Math.floor(p.y / _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE),
        });
    }
}


/***/ }),

/***/ "./ts/lib/aseprite.ts":
/*!****************************!*\
  !*** ./ts/lib/aseprite.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Aseprite: () => (/* binding */ Aseprite),
/* harmony export */   applyColorMap: () => (/* binding */ applyColorMap),
/* harmony export */   applyFilter: () => (/* binding */ applyFilter),
/* harmony export */   disableSmoothing: () => (/* binding */ disableSmoothing),
/* harmony export */   drawAnimation: () => (/* binding */ drawAnimation),
/* harmony export */   drawSprite: () => (/* binding */ drawSprite),
/* harmony export */   getFrame: () => (/* binding */ getFrame),
/* harmony export */   images: () => (/* binding */ images),
/* harmony export */   loadImage: () => (/* binding */ loadImage),
/* harmony export */   loadImages: () => (/* binding */ loadImages)
/* harmony export */ });
/**
 * Map of all the images and their metadata.
 *
 * Treat this as read-only, but if you need to access information like the
 * lengths of animations you can use this.
 */
const images = {};
/**
 * Preloads multiple images.
 *
 * See `loadImage` for more info.
 */
function loadImages(imageInfos) {
    const promises = [];
    for (const imageInfo of imageInfos) {
        promises.push(loadImage(imageInfo));
    }
    return Promise.all(promises);
}
/**
 * Asynchronously fetches an image and it's associated metadata, and saves it in
 * the images map.
 *
 * You can either use `basePath` to specify the directory that contains both the
 * image and its metadata, or you can specify the full path to each using
 * `imagePath` and `jsonPath`. If you specify just the directory, the files need
 * to be called [name].png and [name].json.
 */
function loadImage({ name, basePath = undefined, imagePath = undefined, jsonPath = undefined, }) {
    if (!basePath && (!imagePath || !jsonPath)) {
        return Promise.reject("Must specify either a basePath or imagePath and jsonPath");
    }
    if (images.hasOwnProperty(name)) {
        return Promise.resolve(images[name]);
    }
    if (!imagePath || !jsonPath) {
        // As this stage we know basePath is defined, so force the compiler to
        // acknowledge that.
        basePath = basePath;
        if (!basePath.endsWith("/")) {
            basePath = basePath + "/";
        }
        imagePath = `${basePath}${name}.png`;
        jsonPath = `${basePath}${name}.json`;
    }
    images[name] = {
        name,
        imageLoaded: false,
        jsonLoaded: false,
        loaded: false,
        animations: {},
    };
    const imageLoadedPromise = new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => {
            images[name].image = image;
            images[name].imageLoaded = true;
            images[name].loaded = images[name].jsonLoaded;
            resolve();
        };
        image.onerror = () => {
            reject(`Error loading image ${name}.`);
        };
        image.src = imagePath;
    });
    // Load JSON metadata.
    const jsonLoadedPromise = fetch(jsonPath)
        .then((response) => {
        if (response.status != 200) {
            throw new Error(`Couldn't load json metadata for image ${name}.`);
        }
        return response.json();
    })
        .then((response) => {
        // Note: This currently ignores direction.
        const animations = {};
        for (const animData of response.meta.frameTags) {
            let length = 0;
            for (let i = animData.from; i <= animData.to; i++) {
                length += response.frames[i].duration;
            }
            animations[animData.name] = {
                from: animData.from,
                to: animData.to,
                length,
            };
        }
        images[name].animations = animations;
        images[name].frames = response.frames;
        images[name].jsonLoaded = true;
        images[name].loaded = images[name].imageLoaded;
    });
    const allLoadedPromise = Promise.all([
        imageLoadedPromise,
        jsonLoadedPromise,
    ]).then(() => images[name]);
    images[name].loadPromise = allLoadedPromise;
    return allLoadedPromise;
}
function applyEffect(name, newName, effectFn) {
    if (images[newName] != undefined) {
        return images[newName];
    }
    if (!images.hasOwnProperty(name)) {
        throw new Error(`Cannot apply filter to image ${name} as it doesn\'t exist.`);
    }
    const baseImageMetadata = images[name];
    if (baseImageMetadata.image == null) {
        throw new Error(`Can't generate filtered image until base image is loaded.`);
    }
    images[newName] = {
        name: newName,
        imageLoaded: false,
        jsonLoaded: true,
        loaded: false,
        animations: baseImageMetadata.animations,
        frames: baseImageMetadata.frames,
    };
    const canvas = effectFn(baseImageMetadata.image);
    const imageLoadedPromise = new Promise((resolve, reject) => {
        const image = new Image();
        // Even though we're setting the source from a data url, it still needs to load.
        image.onload = () => {
            images[newName].image = image;
            images[newName].imageLoaded = true;
            images[newName].loaded = true;
            resolve();
        };
        image.onerror = () => {
            reject(`Error loading image ${newName}.`);
        };
        image.src = canvas.toDataURL();
    });
    images[newName].loadPromise = imageLoadedPromise.then(() => images[newName]);
    return images[newName];
}
/**
 * Applies a filter on an image, and caches the result.
 *
 * @param {string} name Name of the existing image
 * @param {string} filter Filter to apply
 * @returns {!ImageMetadata} new metadata of the filtered image.
 */
function applyFilter(name, filter) {
    const filteredImageName = getFilteredName(name, filter);
    return applyEffect(name, filteredImageName, (image) => {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext("2d");
        context.filter = filter;
        context.drawImage(image, 0, 0);
        return canvas;
    });
}
/**
 * @param {string} name Name of the existing image
 * @param {string} filter Filter to apply
 */
function getFilteredName(name, filter) {
    return name + ":filter=" + filter;
}
function applyColorMap(name, colorMap) {
    const colorMapName = getColorMapName(name, colorMap);
    return applyEffect(name, colorMapName, (image) => {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0);
        for (let y = 0; y < image.height; y++) {
            for (let x = 0; x < image.width; x++) {
                const color = context.getImageData(x, y, 1, 1).data;
                const r = color[0];
                const g = color[1];
                const b = color[2];
                const colorHex = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
                if (colorMap.hasOwnProperty(colorHex)) {
                    const newColor = colorMap[colorHex];
                    context.fillStyle = newColor;
                    context.fillRect(x, y, 1, 1);
                }
            }
        }
        return canvas;
    });
}
/**
 * @param {string} name Name of the existing image
 * @param {string} colorMap Filter to apply
 */
function getColorMapName(name, colorMap) {
    const keys = Object.keys(colorMap).sort();
    return (name + ":colormap=" + keys.map((k) => `${k}:${colorMap[k]}`).join(","));
}
/**
 * Renders a specific frame to a canvas.
 *
 * @param p - Input to this function, as an object.
 * @param p.context - The context of the canvas to draw on.
 * @param p.image - The name, or image metadata of the spritesheet to draw.
 * @param p.frame - The frame number to draw.
 * @param p.position - The position on the canvas to draw this sprite
 * @param p.scale - How much to upscale the sprite. Should be an integer.
 * @param p.anchorRatios - The relative position of the anchor on this sprite.
 *     The anchor is used for positioning the sprite and for scaling. 0 puts
 *     the anchor at the left or the top, 1 puts the anchor at the right or the
 *     bottom. 0.5 positions the anchor at the center. Defaults to top left.
 * @param p.flipped Whether to flip the image horizontally.
 * @param p.filter A CSS filter to apply to the image. This will be cached for
 *     performance.
 * @returns True if it succeeded, false if the image wasn't loaded yet.
 */
function drawSprite({ context, image, frame, position, scale = 1, anchorRatios = {
    x: 0,
    y: 0,
}, flippedX = false, flippedY = false, filter, colorMap, }) {
    if (typeof image === "string") {
        image = images[image];
    }
    if (!image.loaded) {
        return false;
    }
    if (filter && colorMap) {
        throw new Error("Can't use both filter and color map on the same image.");
    }
    if (filter != null && filter.length > 0) {
        applyFilter(image.name, filter);
        image = images[getFilteredName(image.name, filter)];
        // The filtered image might not be loaded.
        if (!image.loaded) {
            return false;
        }
    }
    if (colorMap != null && Object.keys(colorMap).length > 0) {
        applyColorMap(image.name, colorMap);
        image = images[getColorMapName(image.name, colorMap)];
        // The color mapped image might not be loaded.
        if (!image.loaded) {
            return false;
        }
    }
    if (!image.frames) {
        return false;
    }
    const sourceRect = image.frames[frame].frame;
    const destW = scale * sourceRect.w;
    const destH = scale * sourceRect.h;
    context.save();
    context.translate(Math.round(position.x), Math.round(position.y));
    const adjustedAnchorRatios = {
        x: anchorRatios.x,
        y: anchorRatios.y,
    };
    if (flippedX) {
        context.scale(-1, 1);
        adjustedAnchorRatios.x = 1 - adjustedAnchorRatios.x;
    }
    if (flippedY) {
        context.scale(1, -1);
        adjustedAnchorRatios.y = 1 - adjustedAnchorRatios.y;
    }
    context.drawImage(image.image, sourceRect.x, sourceRect.y, sourceRect.w, sourceRect.h, -adjustedAnchorRatios.x * destW, -adjustedAnchorRatios.y * destH, destW, destH);
    context.restore();
    return true;
}
/**
 * Renders a frame of an animation to the canvas, based on the input time.
 *
 * Assumes all animations loop.
 *
 * @param p - Input to this function, as an object.
 * @param p.context - The context of the canvas to draw on.
 * @param p.image - The name, or image metadata of the spritesheet to draw.
 * @param p.animationName - The name of the animation.
 * @param p.time - The position of this animation in time, relative to
 *     the start. In seconds. Determines which frame to render.
 * @param p.position - The position on the canvas to draw this sprite
 * @param p.scale - How much to upscale the sprite. Should be an integer.
 * @param p.anchorRatios - The relative position of the anchor on this sprite.
 *     The anchor is used for positioning the sprite and for scaling. 0 puts
 *     the anchor at the left or the top, 1 puts the anchor at the right or the
 *     bottom. 0.5 positions the anchor at the center. Defaults to top left.
 * @param p.flipped Whether to flip the image horizontally.
 * @param p.filter A CSS filter to apply to the image. This will be cached for
 *     performance.
 * @returns True if it succeeded, false if the image wasn't loaded yet.
 */
function drawAnimation({ context, image, animationName, time, position, scale = 1, anchorRatios = {
    x: 0,
    y: 0,
}, flippedX = false, flippedY = false, filter = "", loop = true }) {
    if (typeof image === "string") {
        image = images[image];
    }
    if (!image.loaded) {
        return false;
    }
    const frame = getFrame(image, animationName, time, loop);
    return drawSprite({
        context,
        image,
        frame,
        position,
        scale,
        anchorRatios,
        flippedX,
        flippedY,
        filter,
    });
}
/**
 * Figures out which frame of the animation we should draw.
 */
function getFrame(image, animationName, time, loop = true) {
    if (typeof image === "string") {
        image = images[image];
    }
    if (!image.frames) {
        return -1;
    }
    const animData = image.animations[animationName];
    let localTimeMs = 1000 * time;
    if (loop) {
        localTimeMs %= animData.length;
    }
    else {
        localTimeMs = Math.min(localTimeMs, animData.length - 1);
    }
    let cumulativeTimeMs = 0;
    for (let i = animData.from; i <= animData.to; i++) {
        cumulativeTimeMs += image.frames[i].duration;
        if (cumulativeTimeMs > localTimeMs) {
            return i;
        }
    }
    throw new Error(`Something's wrong with the getFrame function`);
}
/**
 * Disables smoothing on the canvas across the different browsers.
 *
 * Keeps those pixels sharp!
 */
function disableSmoothing(context) {
    context.imageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
}
const Aseprite = {
    loadImage,
    loadImages,
    drawSprite,
    drawAnimation,
    disableSmoothing,
    applyFilter,
    getFrame,
    get images() {
        return images;
    },
};


/***/ }),

/***/ "./ts/lib/images.ts":
/*!**************************!*\
  !*** ./ts/lib/images.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Images: () => (/* binding */ Images),
/* harmony export */   images: () => (/* binding */ images),
/* harmony export */   loadImage: () => (/* binding */ loadImage)
/* harmony export */ });
const images = {};
/**
 * Asynchronously fetches an image.
 */
function loadImage({ name, path, extension = 'png' }) {
    const promise = new Promise((resolve, reject) => {
        if (images.hasOwnProperty(name)) {
            throw new Error(`Already loaded image ${name}.`);
        }
        if (!path.endsWith('/')) {
            path = path + '/';
        }
        const imagePath = `${path}${name}.${extension}`;
        images[name] = {
            loaded: false,
            image: undefined,
        };
        const image = new Image();
        image.onload = () => {
            images[name].image = image;
            images[name].loaded = true;
            resolve(images[name]);
        };
        image.onerror = () => {
            reject(`Error loading image ${name}.`);
        };
        image.src = imagePath;
    });
    images[name].loadPromise = promise;
    return promise;
}
const Images = {
    loadImage,
    images,
};


/***/ }),

/***/ "./ts/lib/keys.ts":
/*!************************!*\
  !*** ./ts/lib/keys.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ComboKeys: () => (/* binding */ ComboKeys),
/* harmony export */   KeyboardKeys: () => (/* binding */ KeyboardKeys),
/* harmony export */   NullKeys: () => (/* binding */ NullKeys),
/* harmony export */   RegularKeys: () => (/* binding */ RegularKeys)
/* harmony export */ });
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _KeyboardKeys_pressedKeys, _KeyboardKeys_pressedThisFrame, _KeyboardKeys_releasedThisFrame;
const disableDefaultKeys = new Set(["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]);
class RegularKeys {
    setUp() { }
    resetFrame() { }
    isPressed(keyCode) {
        return false;
    }
    wasPressedThisFrame(keyCode) {
        return false;
    }
    wasReleasedThisFrame(keyCode) {
        return false;
    }
    anyIsPressed(keyCodes) {
        for (const keyCode of keyCodes) {
            if (this.isPressed(keyCode)) {
                return true;
            }
        }
        return false;
    }
    anyWasPressedThisFrame(keyCodes) {
        for (const keyCode of keyCodes) {
            if (this.wasPressedThisFrame(keyCode)) {
                return true;
            }
        }
        return false;
    }
    anyWasReleasedThisFrame(keyCodes) {
        for (const keyCode of keyCodes) {
            if (this.wasReleasedThisFrame(keyCode)) {
                return true;
            }
        }
        return false;
    }
}
class KeyboardKeys extends RegularKeys {
    constructor() {
        super(...arguments);
        _KeyboardKeys_pressedKeys.set(this, new Set());
        _KeyboardKeys_pressedThisFrame.set(this, new Set());
        _KeyboardKeys_releasedThisFrame.set(this, new Set());
    }
    setUp() {
        // Thought: Should this be adding to a number rather than triggering a boolean? Eh.
        document.addEventListener('keydown', (evt) => {
            if (!__classPrivateFieldGet(this, _KeyboardKeys_pressedKeys, "f").has(evt.code)) {
                __classPrivateFieldGet(this, _KeyboardKeys_pressedThisFrame, "f").add(evt.code);
                // console.log(evt.code);
            }
            __classPrivateFieldGet(this, _KeyboardKeys_pressedKeys, "f").add(evt.code);
            // Also disable scrolling
            if (disableDefaultKeys.has(evt.code)) {
                evt.preventDefault();
            }
        });
        document.addEventListener('keyup', (evt) => {
            __classPrivateFieldGet(this, _KeyboardKeys_pressedKeys, "f").delete(evt.code);
            __classPrivateFieldGet(this, _KeyboardKeys_releasedThisFrame, "f").add(evt.code);
        });
    }
    resetFrame() {
        __classPrivateFieldGet(this, _KeyboardKeys_pressedThisFrame, "f").clear();
        __classPrivateFieldGet(this, _KeyboardKeys_releasedThisFrame, "f").clear();
    }
    isPressed(keyCode) {
        return __classPrivateFieldGet(this, _KeyboardKeys_pressedKeys, "f").has(keyCode);
    }
    wasPressedThisFrame(keyCode) {
        return __classPrivateFieldGet(this, _KeyboardKeys_pressedThisFrame, "f").has(keyCode);
    }
    wasReleasedThisFrame(keyCode) {
        return __classPrivateFieldGet(this, _KeyboardKeys_releasedThisFrame, "f").has(keyCode);
    }
}
_KeyboardKeys_pressedKeys = new WeakMap(), _KeyboardKeys_pressedThisFrame = new WeakMap(), _KeyboardKeys_releasedThisFrame = new WeakMap();
class ComboKeys extends RegularKeys {
    constructor(...keys) {
        super();
        this.subKeys = keys;
    }
    setUp() {
        this.subKeys.forEach(k => k.setUp());
    }
    resetFrame() {
        this.subKeys.forEach(k => k.resetFrame());
    }
    isPressed(keyCode) {
        return this.subKeys.some(k => k.isPressed(keyCode));
    }
    wasPressedThisFrame(keyCode) {
        return this.subKeys.some(k => k.wasPressedThisFrame(keyCode));
    }
    wasReleasedThisFrame(keyCode) {
        return this.subKeys.some(k => k.wasReleasedThisFrame(keyCode));
    }
}
const NullKeys = RegularKeys;


/***/ }),

/***/ "./ts/lib/sounds.ts":
/*!**************************!*\
  !*** ./ts/lib/sounds.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MuteState: () => (/* binding */ MuteState),
/* harmony export */   Sounds: () => (/* binding */ Sounds)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./ts/lib/util.ts");

var MuteState;
(function (MuteState) {
    MuteState[MuteState["PLAY_ALL"] = 0] = "PLAY_ALL";
    MuteState[MuteState["MUSIC_OFF"] = 1] = "MUSIC_OFF";
    MuteState[MuteState["ALL_OFF"] = 2] = "ALL_OFF";
})(MuteState || (MuteState = {}));
// Playing at 1 volume is too loud.
const VOLUME_MULTIPLE = 0.5;
class _Sounds {
    constructor() {
        this.audios = {};
        this.muteState = MuteState.PLAY_ALL;
        this.playbackRate = 1;
        this.volume = 1;
    }
    /**
     * Asynchronously fetches an audio.
     */
    loadSound({ name, path }) {
        const promise = new Promise((resolve) => {
            if (this.audios.hasOwnProperty(name)) {
                throw new Error(`Already loaded sound ${name}.`);
            }
            if (!path.endsWith('/')) {
                path = path + '/';
            }
            const audioPath = `${path}${name}.mp3`;
            this.audios[name] = {
                loaded: false,
                audio: undefined,
                loadPromise: promise,
            };
            const audio = new Audio();
            audio.oncanplaythrough = () => {
                this.audios[name].audio = audio;
                this.audios[name].loaded = true;
                resolve();
            };
            audio.onerror = () => {
                throw new Error(`Error loading audio ${name}.`);
            };
            audio.src = audioPath;
        });
        return promise;
    }
    addLoadedSound({ name, audio }) {
        if (this.audios.hasOwnProperty(name)) {
            throw new Error(`Already loaded sound ${name}.`);
        }
        this.audios[name] = {
            loaded: true,
            audio,
            loadPromise: Promise.resolve(),
        };
    }
    playSound(name, { volume = 1 } = {}) {
        if (this.muteState == MuteState.ALL_OFF) {
            return;
        }
        const audio = this.audios[name].audio?.cloneNode();
        if (audio == null) {
            return;
        }
        // TODO: Adjust SFX volumes, probably just here.
        audio.volume *= this.volume * volume;
        audio.playbackRate = this.playbackRate;
        // Disable type checking on these because typescript doesn't know about them yet.
        audio.mozPreservesPitch = false;
        audio.webkitPreservesPitch = false;
        audio.preservesPitch = false;
        const promise = audio.play();
        // This may fail if the user hasn't interacted with the page yet.
        // For these one-off sound effects, we don't need to do anything.
        promise?.catch(() => { });
    }
    /** We still run the logic here when muted, so that we can update things when unmuted. */
    async setSong(songName) {
        if (this.curSongName == songName) {
            return;
        }
        const lastSongName = this.curSongName;
        const lastSong = this.curSong;
        this.curSong?.pause();
        this.curSong = undefined;
        this.curSongName = undefined;
        const audioInfo = this.audios[songName];
        if (audioInfo == null) {
            // Setting an invalid song name is a way to stop audio from playing.
            return;
        }
        // Ensure the song is loaded
        await audioInfo.loadPromise;
        const audio = audioInfo.audio?.cloneNode();
        if (audio == null) {
            return;
        }
        audio.volume = this.volume * VOLUME_MULTIPLE;
        audio.loop = true;
        // Disable type checking on these because not typescript doesn't know about them yet.
        audio.mozPreservesPitch = false;
        audio.webkitPreservesPitch = false;
        audio.preservesPitch = false;
        if (lastSong != null) {
            audio.playbackRate = lastSong.playbackRate;
            if (lastSongName?.slice(0, 4) == songName.slice(0, 4)) {
                audio.currentTime = lastSong.currentTime;
            }
        }
        if (this.muteState == MuteState.PLAY_ALL) {
            const promise = audio.play();
            // This may fail if the user hasn't interacted with the page yet.
            // We'll try to play it again when startSongIfNotAlreadyPlaying is
            // called.
            promise?.catch(() => { });
        }
        this.curSong = audio;
        this.curSongName = songName;
    }
    setVolume(volume) {
        this.volume = volume;
        if (this.curSong != null) {
            this.curSong.volume = this.volume * VOLUME_MULTIPLE;
        }
    }
    updatePlaybackRate(desiredRate, dt) {
        const updateAmt = 1 - Math.exp(-10 * dt);
        this.playbackRate = (0,_util__WEBPACK_IMPORTED_MODULE_0__.lerp)(this.playbackRate, desiredRate, updateAmt);
        if (this.curSong != null) {
            this.curSong.playbackRate = this.playbackRate;
        }
    }
    loadMuteState() {
        const storedMuteString = window.sessionStorage.getItem('mute') ?? "";
        // Quick thing to make local dev default to music off.
        if (storedMuteString == '' && window.location.href.includes('localhost')) {
            console.log('Disabling music for local development');
            this.muteState = MuteState.MUSIC_OFF;
            return;
        }
        let muteState = parseInt(storedMuteString);
        if (muteState != MuteState.PLAY_ALL &&
            muteState != MuteState.MUSIC_OFF &&
            muteState != MuteState.ALL_OFF) {
            muteState = MuteState.PLAY_ALL;
        }
        this.muteState = muteState;
    }
    toggleMute() {
        switch (this.muteState) {
            case MuteState.PLAY_ALL:
                this.muteState = MuteState.MUSIC_OFF;
                break;
            case MuteState.MUSIC_OFF:
                this.muteState = MuteState.ALL_OFF;
                break;
            case MuteState.ALL_OFF:
            default:
                this.muteState = MuteState.PLAY_ALL;
                break;
        }
        window.sessionStorage.setItem('mute', this.muteState.toString());
        this.updateSoundMutedness();
    }
    updateSoundMutedness() {
        switch (this.muteState) {
            case MuteState.PLAY_ALL:
                if (this.curSong?.paused) {
                    const promise = this.curSong.play();
                    // Again, ignore the possible failure.
                    promise?.catch(() => { });
                }
                break;
            case MuteState.MUSIC_OFF:
            case MuteState.ALL_OFF:
                this.curSong?.pause();
                break;
        }
    }
    startSongIfNotAlreadyPlaying() {
        this.updateSoundMutedness();
    }
}
const Sounds = new _Sounds();


/***/ }),

/***/ "./ts/lib/util.ts":
/*!************************!*\
  !*** ./ts/lib/util.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   choose: () => (/* binding */ choose),
/* harmony export */   clamp: () => (/* binding */ clamp),
/* harmony export */   clampInvLerp: () => (/* binding */ clampInvLerp),
/* harmony export */   clampedSlurp: () => (/* binding */ clampedSlurp),
/* harmony export */   clampedSplitInternal: () => (/* binding */ clampedSplitInternal),
/* harmony export */   divideInterval: () => (/* binding */ divideInterval),
/* harmony export */   easeInOut: () => (/* binding */ easeInOut),
/* harmony export */   experp: () => (/* binding */ experp),
/* harmony export */   gray: () => (/* binding */ gray),
/* harmony export */   invLerp: () => (/* binding */ invLerp),
/* harmony export */   lerp: () => (/* binding */ lerp),
/* harmony export */   loop: () => (/* binding */ loop),
/* harmony export */   rgb: () => (/* binding */ rgb),
/* harmony export */   seededRandom: () => (/* binding */ seededRandom),
/* harmony export */   sinEaseInOut: () => (/* binding */ sinEaseInOut),
/* harmony export */   slurp: () => (/* binding */ slurp),
/* harmony export */   splitInternal: () => (/* binding */ splitInternal),
/* harmony export */   wait: () => (/* binding */ wait)
/* harmony export */ });
function easeInOut(t, amt = 2) {
    let tPow = Math.pow(t, amt);
    return tPow / (tPow + Math.pow(1 - t, amt));
}
function sinEaseInOut(t) {
    return 0.5 - 0.5 * Math.cos(Math.PI * t);
}
function loop(t) {
    return 0.5 - 0.5 * Math.cos(Math.PI * 2 * t);
}
function lerp(val1, val2, amt) {
    return (val2 - val1) * amt + val1;
}
// An alias for older projects
const slurp = lerp;
function experp(val1, val2, amt) {
    return Math.exp(slurp(Math.log(val1), Math.log(val2), amt));
}
function clampedSlurp(val1, val2, amt) {
    if (amt < 0) {
        return val1;
    }
    if (amt > 1) {
        return val2;
    }
    return slurp(val1, val2, amt);
}
function clamp(amt, val1, val2) {
    if (amt < val1) {
        return val1;
    }
    if (amt > val2) {
        return val2;
    }
    return amt;
}
/**
 * Inverse of lerp.
 *
 * Extracts a 0-1 interval from a section of a 0-1 interval
 *
 * For example, if min == 0.3 and max == 0.7, you get:
 *
 *           0.3  0.7
 *     t: 0 --+----+-- 1
 *           /      \
 *          /        \
 *         /          \
 *     -> 0 ---------- 1
 *
 * Useful for making sub animations.
 *
 * Doesn't do any clamping, so you might want to clamp yourself.
 */
function invLerp(t, min, max) {
    return (t - min) / (max - min);
}
const splitInternal = invLerp;
// Alias for older projects
const divideInterval = splitInternal;
/**
 * Like invLerp, but with clamping.
 */
function clampInvLerp(t, min, max) {
    return clamp(splitInternal(t, min, max), 0, 1);
}
const clampedSplitInternal = clampInvLerp;
function rgb(r, g, b) {
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}
function gray(whiteAmt) {
    whiteAmt = clamp(whiteAmt, 0, 1);
    const whiteRgb = Math.floor(255 * whiteAmt);
    return rgb(whiteRgb, whiteRgb, whiteRgb);
}
// Pseudo-random number generator functions
// From stack overflow: https://stackoverflow.com/a/47593316
function xmur3(str) {
    for (var i = 0, h = 1779033703 ^ str.length; i < str.length; i++)
        h = Math.imul(h ^ str.charCodeAt(i), 3432918353),
            h = h << 13 | h >>> 19;
    return function () {
        h = Math.imul(h ^ h >>> 16, 2246822507);
        h = Math.imul(h ^ h >>> 13, 3266489909);
        return (h ^= h >>> 16) >>> 0;
    };
}
// Just using a simple 32-bit random number generator, our numbers don't need to be too random.
function mulberry32(a) {
    return function () {
        var t = a += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}
/**
 * @param {string} seed What ya seed it with.
 * @returns {function():number} A wonderful seeded random number generator.
 */
function seededRandom(seed) {
    const seedFn = xmur3(seed);
    return mulberry32(seedFn());
}
function choose(arr, rng) {
    const index = Math.floor(rng() * arr.length);
    return arr[index];
}
function wait(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}


/***/ }),

/***/ "./node_modules/jsfxr/riffwave.js":
/*!****************************************!*\
  !*** ./node_modules/jsfxr/riffwave.js ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RIFFWAVE: () => (/* binding */ RIFFWAVE)
/* harmony export */ });
/*
 * RIFFWAVE.js v0.03 - Audio encoder for HTML5 <audio> elements.
 * Copyleft 2011 by Pedro Ladaria <pedro.ladaria at Gmail dot com>
 *
 * Public Domain
 *
 * Changelog:
 *
 * 0.01 - First release
 * 0.02 - New faster base64 encoding
 * 0.03 - Support for 16bit samples
 *
 * Notes:
 *
 * 8 bit data is unsigned: 0..255
 * 16 bit data is signed: -32,768..32,767
 *
 */
var FastBase64 = {
    chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encLookup: [],
    Init: function () {
        for (var i = 0; i < 4096; i++) {
            this.encLookup[i] = this.chars[i >> 6] + this.chars[i & 0x3F];
        }
    },
    Encode: function (src) {
        var len = src.length;
        var dst = '';
        var i = 0;
        while (len > 2) {
            var n = (src[i] << 16) | (src[i + 1] << 8) | src[i + 2];
            dst += this.encLookup[n >> 12] + this.encLookup[n & 0xFFF];
            len -= 3;
            i += 3;
        }
        if (len > 0) {
            var n1 = (src[i] & 0xFC) >> 2;
            var n2 = (src[i] & 0x03) << 4;
            if (len > 1)
                n2 |= (src[++i] & 0xF0) >> 4;
            dst += this.chars[n1];
            dst += this.chars[n2];
            if (len == 2) {
                var n3 = (src[i++] & 0x0F) << 2;
                n3 |= (src[i] & 0xC0) >> 6;
                dst += this.chars[n3];
            }
            if (len == 1)
                dst += '=';
            dst += '=';
        }
        return dst;
    } // end Encode
};
FastBase64.Init();
const RIFFWAVE = function (data) {
    this.data = []; // Array containing audio samples
    this.wav = []; // Array containing the generated wave file
    this.dataURI = ''; // http://en.wikipedia.org/wiki/Data_URI_scheme
    this.header = {
        chunkId: [0x52, 0x49, 0x46, 0x46], // 0    4    "RIFF" = 0x52494646
        chunkSize: 0, // 4    4    36+SubChunk2Size = 4+(8+SubChunk1Size)+(8+SubChunk2Size)
        format: [0x57, 0x41, 0x56, 0x45], // 8    4    "WAVE" = 0x57415645
        subChunk1Id: [0x66, 0x6d, 0x74, 0x20], // 12   4    "fmt " = 0x666d7420
        subChunk1Size: 16, // 16   4    16 for PCM
        audioFormat: 1, // 20   2    PCM = 1
        numChannels: 1, // 22   2    Mono = 1, Stereo = 2...
        sampleRate: 8000, // 24   4    8000, 44100...
        byteRate: 0, // 28   4    SampleRate*NumChannels*BitsPerSample/8
        blockAlign: 0, // 32   2    NumChannels*BitsPerSample/8
        bitsPerSample: 8, // 34   2    8 bits = 8, 16 bits = 16
        subChunk2Id: [0x64, 0x61, 0x74, 0x61], // 36   4    "data" = 0x64617461
        subChunk2Size: 0 // 40   4    data size = NumSamples*NumChannels*BitsPerSample/8
    };
    function u32ToArray(i) {
        return [i & 0xFF, (i >> 8) & 0xFF, (i >> 16) & 0xFF, (i >> 24) & 0xFF];
    }
    function u16ToArray(i) {
        return [i & 0xFF, (i >> 8) & 0xFF];
    }
    function split16bitArray(data) {
        var r = [];
        var j = 0;
        var len = data.length;
        for (var i = 0; i < len; i++) {
            r[j++] = data[i] & 0xFF;
            r[j++] = (data[i] >> 8) & 0xFF;
        }
        return r;
    }
    this.Make = function (data) {
        if (data instanceof Array)
            this.data = data;
        this.header.byteRate = (this.header.sampleRate * this.header.numChannels * this.header.bitsPerSample) >> 3;
        this.header.blockAlign = (this.header.numChannels * this.header.bitsPerSample) >> 3;
        this.header.subChunk2Size = this.data.length;
        this.header.chunkSize = 36 + this.header.subChunk2Size;
        this.wav = this.header.chunkId.concat(u32ToArray(this.header.chunkSize), this.header.format, this.header.subChunk1Id, u32ToArray(this.header.subChunk1Size), u16ToArray(this.header.audioFormat), u16ToArray(this.header.numChannels), u32ToArray(this.header.sampleRate), u32ToArray(this.header.byteRate), u16ToArray(this.header.blockAlign), u16ToArray(this.header.bitsPerSample), this.header.subChunk2Id, u32ToArray(this.header.subChunk2Size), this.data);
        this.dataURI = 'data:audio/wav;base64,' + FastBase64.Encode(this.wav);
    };
    if (data instanceof Array)
        this.Make(data);
}; // end RIFFWAVE


/***/ }),

/***/ "./node_modules/jsfxr/sfxr.js":
/*!************************************!*\
  !*** ./node_modules/jsfxr/sfxr.js ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Params: () => (/* binding */ Params),
/* harmony export */   SoundEffect: () => (/* binding */ SoundEffect),
/* harmony export */   convert: () => (/* binding */ convert),
/* harmony export */   parameters: () => (/* binding */ parameters),
/* harmony export */   sfxr: () => (/* binding */ sfxr),
/* harmony export */   waveforms: () => (/* binding */ waveforms)
/* harmony export */ });
/* harmony import */ var _riffwave_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./riffwave.js */ "./node_modules/jsfxr/riffwave.js");

// Wave shapes
var SQUARE = 0;
var SAWTOOTH = 1;
var SINE = 2;
var NOISE = 3;
// Playback volume
var masterVolume = 1;
var OVERSAMPLING = 8;
/*** Core data structure ***/
// Sound generation parameters are on [0,1] unless noted SIGNED & thus
// on [-1,1]
function Params() {
    this.oldParams = true; // Note what structure this is
    // Wave shape
    this.wave_type = SQUARE;
    // Envelope
    this.p_env_attack = 0; // Attack time
    this.p_env_sustain = 0.3; // Sustain time
    this.p_env_punch = 0; // Sustain punch
    this.p_env_decay = 0.4; // Decay time
    // Tone
    this.p_base_freq = 0.3; // Start frequency
    this.p_freq_limit = 0; // Min frequency cutoff
    this.p_freq_ramp = 0; // Slide (SIGNED)
    this.p_freq_dramp = 0; // Delta slide (SIGNED)
    // Vibrato
    this.p_vib_strength = 0; // Vibrato depth
    this.p_vib_speed = 0; // Vibrato speed
    // Tonal change
    this.p_arp_mod = 0; // Change amount (SIGNED)
    this.p_arp_speed = 0; // Change speed
    // Square wave duty (proportion of time signal is high vs. low)
    this.p_duty = 0; // Square duty
    this.p_duty_ramp = 0; // Duty sweep (SIGNED)
    // Repeat
    this.p_repeat_speed = 0; // Repeat speed
    // Flanger
    this.p_pha_offset = 0; // Flanger offset (SIGNED)
    this.p_pha_ramp = 0; // Flanger sweep (SIGNED)
    // Low-pass filter
    this.p_lpf_freq = 1; // Low-pass filter cutoff
    this.p_lpf_ramp = 0; // Low-pass filter cutoff sweep (SIGNED)
    this.p_lpf_resonance = 0; // Low-pass filter resonance
    // High-pass filter
    this.p_hpf_freq = 0; // High-pass filter cutoff
    this.p_hpf_ramp = 0; // High-pass filter cutoff sweep (SIGNED)
    // Sample parameters
    this.sound_vol = 0.5;
    this.sample_rate = 44100;
    this.sample_size = 8;
}
/*** Helper functions ***/
function sqr(x) { return x * x; }
function cube(x) { return x * x * x; }
function sign(x) { return x < 0 ? -1 : 1; }
function log(x, b) { return Math.log(x) / Math.log(b); }
var pow = Math.pow;
function frnd(range) {
    return Math.random() * range;
}
function rndr(from, to) {
    return Math.random() * (to - from) + from;
}
function rnd(max) {
    return Math.floor(Math.random() * (max + 1));
}
/*** Import/export functions ***/
// http://stackoverflow.com/questions/3096646/how-to-convert-a-floating-point-number-to-its-binary-representation-ieee-754-i
function assembleFloat(sign, exponent, mantissa) {
    return (sign << 31) | (exponent << 23) | (mantissa);
}
function floatToNumber(flt) {
    if (isNaN(flt)) // Special case: NaN
        return assembleFloat(0, 0xFF, 0x1337); // Mantissa is nonzero for NaN
    var sign = (flt < 0) ? 1 : 0;
    flt = Math.abs(flt);
    if (flt == 0.0) // Special case: +-0
        return assembleFloat(sign, 0, 0);
    var exponent = Math.floor(Math.log(flt) / Math.LN2);
    if (exponent > 127 || exponent < -126) // Special case: +-Infinity (and huge numbers)
        return assembleFloat(sign, 0xFF, 0); // Mantissa is zero for +-Infinity
    var mantissa = flt / Math.pow(2, exponent);
    return assembleFloat(sign, exponent + 127, (mantissa * Math.pow(2, 23)) & 0x7FFFFF);
}
// http://stackoverflow.com/a/16001019
function numberToFloat(bytes) {
    var sign = (bytes & 0x80000000) ? -1 : 1;
    var exponent = ((bytes >> 23) & 0xFF) - 127;
    var significand = (bytes & ~(-1 << 23));
    if (exponent == 128)
        return sign * ((significand) ? Number.NaN : Number.POSITIVE_INFINITY);
    if (exponent == -127) {
        if (significand == 0)
            return sign * 0.0;
        exponent = -126;
        significand /= (1 << 22);
    }
    else
        significand = (significand | (1 << 23)) / (1 << 23);
    return sign * significand * Math.pow(2, exponent);
}
// export parameter list to URL friendly base58 string
// https://gist.github.com/diafygi/90a3e80ca1c2793220e5/
var b58alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
var params_order = [
    "wave_type",
    "p_env_attack",
    "p_env_sustain",
    "p_env_punch",
    "p_env_decay",
    "p_base_freq",
    "p_freq_limit",
    "p_freq_ramp",
    "p_freq_dramp",
    "p_vib_strength",
    "p_vib_speed",
    "p_arp_mod",
    "p_arp_speed",
    "p_duty",
    "p_duty_ramp",
    "p_repeat_speed",
    "p_pha_offset",
    "p_pha_ramp",
    "p_lpf_freq",
    "p_lpf_ramp",
    "p_lpf_resonance",
    "p_hpf_freq",
    "p_hpf_ramp"
];
var params_signed = ["p_freq_ramp", "p_freq_dramp", "p_arp_mod", "p_duty_ramp", "p_pha_offset", "p_pha_ramp", "p_lpf_ramp", "p_hpf_ramp"];
Params.prototype.toB58 = function () {
    var convert = [];
    for (var pi in params_order) {
        var p = params_order[pi];
        if (p == "wave_type") {
            convert.push(this[p]);
        }
        else if (p.indexOf("p_") == 0) {
            var val = this[p];
            val = floatToNumber(val);
            convert.push(0xff & val);
            convert.push(0xff & (val >> 8));
            convert.push(0xff & (val >> 16));
            convert.push(0xff & (val >> 24));
        }
    }
    return function (B, A) { var d = [], s = "", i, j, c, n; for (i in B) {
        j = 0, c = B[i];
        s += c || s.length ^ i ? "" : 1;
        while (j in d || c) {
            n = d[j];
            n = n ? n * 256 + c : c;
            c = n / 58 | 0;
            d[j] = n % 58;
            j++;
        }
    } while (j--)
        s += A[d[j]]; return s; }(convert, b58alphabet);
};
Params.prototype.fromB58 = function (b58encoded) {
    this.fromJSON(sfxr.b58decode(b58encoded));
    return this;
};
Params.prototype.fromJSON = function (struct) {
    for (var p in struct) {
        if (struct.hasOwnProperty(p)) {
            this[p] = struct[p];
        }
    }
    return this;
};
/*** Presets ***/
// These functions roll up random sounds appropriate to various
// typical game events:
Params.prototype.pickupCoin = function () {
    this.wave_type = SAWTOOTH;
    this.p_base_freq = 0.4 + frnd(0.5);
    this.p_env_attack = 0;
    this.p_env_sustain = frnd(0.1);
    this.p_env_decay = 0.1 + frnd(0.4);
    this.p_env_punch = 0.3 + frnd(0.3);
    if (rnd(1)) {
        this.p_arp_speed = 0.5 + frnd(0.2);
        this.p_arp_mod = 0.2 + frnd(0.4);
    }
    return this;
};
Params.prototype.laserShoot = function () {
    this.wave_type = rnd(2);
    if (this.wave_type === SINE && rnd(1))
        this.wave_type = rnd(1);
    if (rnd(2) === 0) {
        this.p_base_freq = 0.3 + frnd(0.6);
        this.p_freq_limit = frnd(0.1);
        this.p_freq_ramp = -0.35 - frnd(0.3);
    }
    else {
        this.p_base_freq = 0.5 + frnd(0.5);
        this.p_freq_limit = this.p_base_freq - 0.2 - frnd(0.6);
        if (this.p_freq_limit < 0.2)
            this.p_freq_limit = 0.2;
        this.p_freq_ramp = -0.15 - frnd(0.2);
    }
    if (this.wave_type === SAWTOOTH)
        this.p_duty = 1;
    if (rnd(1)) {
        this.p_duty = frnd(0.5);
        this.p_duty_ramp = frnd(0.2);
    }
    else {
        this.p_duty = 0.4 + frnd(0.5);
        this.p_duty_ramp = -frnd(0.7);
    }
    this.p_env_attack = 0;
    this.p_env_sustain = 0.1 + frnd(0.2);
    this.p_env_decay = frnd(0.4);
    if (rnd(1))
        this.p_env_punch = frnd(0.3);
    if (rnd(2) === 0) {
        this.p_pha_offset = frnd(0.2);
        this.p_pha_ramp = -frnd(0.2);
    }
    //if (rnd(1))
    this.p_hpf_freq = frnd(0.3);
    return this;
};
Params.prototype.explosion = function () {
    this.wave_type = NOISE;
    if (rnd(1)) {
        this.p_base_freq = sqr(0.1 + frnd(0.4));
        this.p_freq_ramp = -0.1 + frnd(0.4);
    }
    else {
        this.p_base_freq = sqr(0.2 + frnd(0.7));
        this.p_freq_ramp = -0.2 - frnd(0.2);
    }
    if (rnd(4) === 0)
        this.p_freq_ramp = 0;
    if (rnd(2) === 0)
        this.p_repeat_speed = 0.3 + frnd(0.5);
    this.p_env_attack = 0;
    this.p_env_sustain = 0.1 + frnd(0.3);
    this.p_env_decay = frnd(0.5);
    if (rnd(1)) {
        this.p_pha_offset = -0.3 + frnd(0.9);
        this.p_pha_ramp = -frnd(0.3);
    }
    this.p_env_punch = 0.2 + frnd(0.6);
    if (rnd(1)) {
        this.p_vib_strength = frnd(0.7);
        this.p_vib_speed = frnd(0.6);
    }
    if (rnd(2) === 0) {
        this.p_arp_speed = 0.6 + frnd(0.3);
        this.p_arp_mod = 0.8 - frnd(1.6);
    }
    return this;
};
Params.prototype.powerUp = function () {
    if (rnd(1)) {
        this.wave_type = SAWTOOTH;
        this.p_duty = 1;
    }
    else {
        this.p_duty = frnd(0.6);
    }
    this.p_base_freq = 0.2 + frnd(0.3);
    if (rnd(1)) {
        this.p_freq_ramp = 0.1 + frnd(0.4);
        this.p_repeat_speed = 0.4 + frnd(0.4);
    }
    else {
        this.p_freq_ramp = 0.05 + frnd(0.2);
        if (rnd(1)) {
            this.p_vib_strength = frnd(0.7);
            this.p_vib_speed = frnd(0.6);
        }
    }
    this.p_env_attack = 0;
    this.p_env_sustain = frnd(0.4);
    this.p_env_decay = 0.1 + frnd(0.4);
    return this;
};
Params.prototype.hitHurt = function () {
    this.wave_type = rnd(2);
    if (this.wave_type === SINE)
        this.wave_type = NOISE;
    if (this.wave_type === SQUARE)
        this.p_duty = frnd(0.6);
    if (this.wave_type === SAWTOOTH)
        this.p_duty = 1;
    this.p_base_freq = 0.2 + frnd(0.6);
    this.p_freq_ramp = -0.3 - frnd(0.4);
    this.p_env_attack = 0;
    this.p_env_sustain = frnd(0.1);
    this.p_env_decay = 0.1 + frnd(0.2);
    if (rnd(1))
        this.p_hpf_freq = frnd(0.3);
    return this;
};
Params.prototype.jump = function () {
    this.wave_type = SQUARE;
    this.p_duty = frnd(0.6);
    this.p_base_freq = 0.3 + frnd(0.3);
    this.p_freq_ramp = 0.1 + frnd(0.2);
    this.p_env_attack = 0;
    this.p_env_sustain = 0.1 + frnd(0.3);
    this.p_env_decay = 0.1 + frnd(0.2);
    if (rnd(1))
        this.p_hpf_freq = frnd(0.3);
    if (rnd(1))
        this.p_lpf_freq = 1 - frnd(0.6);
    return this;
};
Params.prototype.blipSelect = function () {
    this.wave_type = rnd(1);
    if (this.wave_type === SQUARE)
        this.p_duty = frnd(0.6);
    else
        this.p_duty = 1;
    this.p_base_freq = 0.2 + frnd(0.4);
    this.p_env_attack = 0;
    this.p_env_sustain = 0.1 + frnd(0.1);
    this.p_env_decay = frnd(0.2);
    this.p_hpf_freq = 0.1;
    return this;
};
Params.prototype.synth = function () {
    this.wave_type = rnd(1);
    this.p_base_freq = [0.2723171360931539, 0.19255692561524382, 0.13615778746815113][rnd(2)];
    this.p_env_attack = rnd(4) > 3 ? frnd(0.5) : 0;
    this.p_env_sustain = frnd(1);
    this.p_env_punch = frnd(1);
    this.p_env_decay = frnd(0.9) + 0.1;
    this.p_arp_mod = [0, 0, 0, 0, -0.3162, 0.7454, 0.7454][rnd(6)];
    this.p_arp_speed = frnd(0.5) + 0.4;
    this.p_duty = frnd(1);
    this.p_duty_ramp = rnd(2) == 2 ? frnd(1) : 0;
    this.p_lpf_freq = [1, 0.9 * frnd(1) * frnd(1) + 0.1][rnd(1)];
    this.p_lpf_ramp = rndr(-1, 1);
    this.p_lpf_resonance = frnd(1);
    this.p_hpf_freq = rnd(3) == 3 ? frnd(1) : 0;
    this.p_hpf_ramp = rnd(3) == 3 ? frnd(1) : 0;
    return this;
};
Params.prototype.tone = function () {
    this.wave_type = SINE;
    this.p_base_freq = 0.35173364; // 440 Hz
    this.p_env_attack = 0;
    this.p_env_sustain = 0.6641; // 1 sec
    this.p_env_decay = 0;
    this.p_env_punch = 0;
    return this;
};
Params.prototype.click = function () {
    const base = ["explosion", "hitHurt"][rnd(1)];
    this[base]();
    if (rnd(1)) {
        this.p_freq_ramp = -0.5 + frnd(1.0);
    }
    if (rnd(1)) {
        this.p_env_sustain = (frnd(0.4) + 0.2) * this.p_env_sustain;
        this.p_env_decay = (frnd(0.4) + 0.2) * this.p_env_decay;
    }
    if (rnd(3) == 0) {
        this.p_env_attack = frnd(0.3);
    }
    this.p_base_freq = 1 - frnd(0.25);
    this.p_hpf_freq = 1 - frnd(0.1);
    return this;
};
Params.prototype.random = function () {
    this.wave_type = rnd(3);
    if (rnd(1))
        this.p_base_freq = cube(frnd(2) - 1) + 0.5;
    else
        this.p_base_freq = sqr(frnd(1));
    this.p_freq_limit = 0;
    this.p_freq_ramp = Math.pow(frnd(2) - 1, 5);
    if (this.p_base_freq > 0.7 && this.p_freq_ramp > 0.2)
        this.p_freq_ramp = -this.p_freq_ramp;
    if (this.p_base_freq < 0.2 && this.p_freq_ramp < -0.05)
        this.p_freq_ramp = -this.p_freq_ramp;
    this.p_freq_dramp = Math.pow(frnd(2) - 1, 3);
    this.p_duty = frnd(2) - 1;
    this.p_duty_ramp = Math.pow(frnd(2) - 1, 3);
    this.p_vib_strength = Math.pow(frnd(2) - 1, 3);
    this.p_vib_speed = rndr(-1, 1);
    this.p_env_attack = cube(rndr(-1, 1));
    this.p_env_sustain = sqr(rndr(-1, 1));
    this.p_env_decay = rndr(-1, 1);
    this.p_env_punch = Math.pow(frnd(0.8), 2);
    if (this.p_env_attack + this.p_env_sustain + this.p_env_decay < 0.2) {
        this.p_env_sustain += 0.2 + frnd(0.3);
        this.p_env_decay += 0.2 + frnd(0.3);
    }
    this.p_lpf_resonance = rndr(-1, 1);
    this.p_lpf_freq = 1 - Math.pow(frnd(1), 3);
    this.p_lpf_ramp = Math.pow(frnd(2) - 1, 3);
    if (this.p_lpf_freq < 0.1 && this.p_lpf_ramp < -0.05)
        this.p_lpf_ramp = -this.p_lpf_ramp;
    this.p_hpf_freq = Math.pow(frnd(1), 5);
    this.p_hpf_ramp = Math.pow(frnd(2) - 1, 5);
    this.p_pha_offset = Math.pow(frnd(2) - 1, 3);
    this.p_pha_ramp = Math.pow(frnd(2) - 1, 3);
    this.p_repeat_speed = frnd(2) - 1;
    this.p_arp_speed = frnd(2) - 1;
    this.p_arp_mod = frnd(2) - 1;
    return this;
};
Params.prototype.mutate = function () {
    if (rnd(1))
        this.p_base_freq += frnd(0.1) - 0.05;
    if (rnd(1))
        this.p_freq_ramp += frnd(0.1) - 0.05;
    if (rnd(1))
        this.p_freq_dramp += frnd(0.1) - 0.05;
    if (rnd(1))
        this.p_duty += frnd(0.1) - 0.05;
    if (rnd(1))
        this.p_duty_ramp += frnd(0.1) - 0.05;
    if (rnd(1))
        this.p_vib_strength += frnd(0.1) - 0.05;
    if (rnd(1))
        this.p_vib_speed += frnd(0.1) - 0.05;
    if (rnd(1))
        this.p_vib_delay += frnd(0.1) - 0.05;
    if (rnd(1))
        this.p_env_attack += frnd(0.1) - 0.05;
    if (rnd(1))
        this.p_env_sustain += frnd(0.1) - 0.05;
    if (rnd(1))
        this.p_env_decay += frnd(0.1) - 0.05;
    if (rnd(1))
        this.p_env_punch += frnd(0.1) - 0.05;
    if (rnd(1))
        this.p_lpf_resonance += frnd(0.1) - 0.05;
    if (rnd(1))
        this.p_lpf_freq += frnd(0.1) - 0.05;
    if (rnd(1))
        this.p_lpf_ramp += frnd(0.1) - 0.05;
    if (rnd(1))
        this.p_hpf_freq += frnd(0.1) - 0.05;
    if (rnd(1))
        this.p_hpf_ramp += frnd(0.1) - 0.05;
    if (rnd(1))
        this.p_pha_offset += frnd(0.1) - 0.05;
    if (rnd(1))
        this.p_pha_ramp += frnd(0.1) - 0.05;
    if (rnd(1))
        this.p_repeat_speed += frnd(0.1) - 0.05;
    if (rnd(1))
        this.p_arp_speed += frnd(0.1) - 0.05;
    if (rnd(1))
        this.p_arp_mod += frnd(0.1) - 0.05;
    return this;
};
/*** Simpler namespaced functional API ***/
const sfxr = {};
sfxr.toBuffer = function (synthdef) {
    return (new SoundEffect(synthdef)).getRawBuffer()["buffer"];
};
sfxr.toWebAudio = function (synthdef, audiocontext) {
    var sfx = new SoundEffect(synthdef);
    var buffer = sfx.getRawBuffer()["normalized"];
    if (audiocontext) {
        var buff = audiocontext.createBuffer(1, buffer.length, sfx.sampleRate);
        var nowBuffering = buff.getChannelData(0);
        for (var i = 0; i < buffer.length; i++) {
            nowBuffering[i] = buffer[i];
        }
        var proc = audiocontext.createBufferSource();
        proc.buffer = buff;
        return proc;
    }
};
sfxr.toWave = function (synthdef) {
    return (new SoundEffect(synthdef)).generate();
};
sfxr.toAudio = function (synthdef) {
    return sfxr.toWave(synthdef).getAudio();
};
sfxr.play = function (synthdef) {
    return sfxr.toAudio(synthdef).play();
};
sfxr.b58decode = function (b58encoded) {
    var decoded = function (S, A) { var d = [], b = [], i, j, c, n; for (i in S) {
        j = 0, c = A.indexOf(S[i]);
        if (c < 0)
            return undefined;
        c || b.length ^ i ? i : b.push(0);
        while (j in d || c) {
            n = d[j];
            n = n ? n * 58 + c : c;
            c = n >> 8;
            d[j] = n % 256;
            j++;
        }
    } while (j--)
        b.push(d[j]); return new Uint8Array(b); }(b58encoded, b58alphabet);
    var result = {};
    for (var pi in params_order) {
        var p = params_order[pi];
        var offset = (pi - 1) * 4 + 1;
        if (p == "wave_type") {
            result[p] = decoded[0];
        }
        else {
            var val = (decoded[offset] | (decoded[offset + 1] << 8) | (decoded[offset + 2] << 16) | (decoded[offset + 3] << 24));
            result[p] = numberToFloat(val);
        }
    }
    return result;
};
sfxr.b58encode = function (synthdef) {
    var p = new Params();
    p.fromJSON(synthdef);
    return p.toB58();
};
sfxr.generate = function (algorithm, options) {
    const p = new Params();
    const opts = options || {};
    p.sound_vol = opts["sound_vol"] || 0.25;
    p.sample_rate = opts["sample_rate"] || 44100;
    p.sample_size = opts["sample_size"] || 8;
    return p[algorithm]();
};
/*** Main entry point ***/
function SoundEffect(ps) {
    if (typeof (ps) == "string") {
        var PARAMS = new Params();
        if (ps.indexOf("#") == 0) {
            ps = ps.slice(1);
        }
        ps = PARAMS.fromB58(ps);
    }
    this.init(ps);
}
SoundEffect.prototype.init = function (ps) {
    this.parameters = ps;
    this.initForRepeat(); // First time through, this is a bit of a misnomer
    // Waveform shape
    this.waveShape = parseInt(ps.wave_type);
    // Filter
    this.fltw = Math.pow(ps.p_lpf_freq, 3) * 0.1;
    this.enableLowPassFilter = (ps.p_lpf_freq != 1);
    this.fltw_d = 1 + ps.p_lpf_ramp * 0.0001;
    this.fltdmp = 5 / (1 + Math.pow(ps.p_lpf_resonance, 2) * 20) *
        (0.01 + this.fltw);
    if (this.fltdmp > 0.8)
        this.fltdmp = 0.8;
    this.flthp = Math.pow(ps.p_hpf_freq, 2) * 0.1;
    this.flthp_d = 1 + ps.p_hpf_ramp * 0.0003;
    // Vibrato
    this.vibratoSpeed = Math.pow(ps.p_vib_speed, 2) * 0.01;
    this.vibratoAmplitude = ps.p_vib_strength * 0.5;
    // Envelope
    this.envelopeLength = [
        Math.floor(ps.p_env_attack * ps.p_env_attack * 100000),
        Math.floor(ps.p_env_sustain * ps.p_env_sustain * 100000),
        Math.floor(ps.p_env_decay * ps.p_env_decay * 100000)
    ];
    this.envelopePunch = ps.p_env_punch;
    // Flanger
    this.flangerOffset = Math.pow(ps.p_pha_offset, 2) * 1020;
    if (ps.p_pha_offset < 0)
        this.flangerOffset = -this.flangerOffset;
    this.flangerOffsetSlide = Math.pow(ps.p_pha_ramp, 2) * 1;
    if (ps.p_pha_ramp < 0)
        this.flangerOffsetSlide = -this.flangerOffsetSlide;
    // Repeat
    this.repeatTime = Math.floor(Math.pow(1 - ps.p_repeat_speed, 2) * 20000
        + 32);
    if (ps.p_repeat_speed === 0)
        this.repeatTime = 0;
    this.gain = Math.exp(ps.sound_vol) - 1;
    this.sampleRate = ps.sample_rate;
    this.bitsPerChannel = ps.sample_size;
};
SoundEffect.prototype.initForRepeat = function () {
    var ps = this.parameters;
    this.elapsedSinceRepeat = 0;
    this.period = 100 / (ps.p_base_freq * ps.p_base_freq + 0.001);
    this.periodMax = 100 / (ps.p_freq_limit * ps.p_freq_limit + 0.001);
    this.enableFrequencyCutoff = (ps.p_freq_limit > 0);
    this.periodMult = 1 - Math.pow(ps.p_freq_ramp, 3) * 0.01;
    this.periodMultSlide = -Math.pow(ps.p_freq_dramp, 3) * 0.000001;
    this.dutyCycle = 0.5 - ps.p_duty * 0.5;
    this.dutyCycleSlide = -ps.p_duty_ramp * 0.00005;
    if (ps.p_arp_mod >= 0)
        this.arpeggioMultiplier = 1 - Math.pow(ps.p_arp_mod, 2) * .9;
    else
        this.arpeggioMultiplier = 1 + Math.pow(ps.p_arp_mod, 2) * 10;
    this.arpeggioTime = Math.floor(Math.pow(1 - ps.p_arp_speed, 2) * 20000 + 32);
    if (ps.p_arp_speed === 1)
        this.arpeggioTime = 0;
};
SoundEffect.prototype.getRawBuffer = function () {
    var fltp = 0;
    var fltdp = 0;
    var fltphp = 0;
    var noise_buffer = Array(32);
    for (var i = 0; i < 32; ++i)
        noise_buffer[i] = Math.random() * 2 - 1;
    var envelopeStage = 0;
    var envelopeElapsed = 0;
    var vibratoPhase = 0;
    var phase = 0;
    var ipp = 0;
    var flanger_buffer = Array(1024);
    for (var i = 0; i < 1024; ++i)
        flanger_buffer[i] = 0;
    var num_clipped = 0;
    var buffer = [];
    var normalized = [];
    var sample_sum = 0;
    var num_summed = 0;
    var summands = Math.floor(44100 / this.sampleRate);
    for (var t = 0;; ++t) {
        // Repeats
        if (this.repeatTime != 0 && ++this.elapsedSinceRepeat >= this.repeatTime)
            this.initForRepeat();
        // Arpeggio (single)
        if (this.arpeggioTime != 0 && t >= this.arpeggioTime) {
            this.arpeggioTime = 0;
            this.period *= this.arpeggioMultiplier;
        }
        // Frequency slide, and frequency slide slide!
        this.periodMult += this.periodMultSlide;
        this.period *= this.periodMult;
        if (this.period > this.periodMax) {
            this.period = this.periodMax;
            if (this.enableFrequencyCutoff)
                break;
        }
        // Vibrato
        var rfperiod = this.period;
        if (this.vibratoAmplitude > 0) {
            vibratoPhase += this.vibratoSpeed;
            rfperiod = this.period * (1 + Math.sin(vibratoPhase) * this.vibratoAmplitude);
        }
        var iperiod = Math.floor(rfperiod);
        if (iperiod < OVERSAMPLING)
            iperiod = OVERSAMPLING;
        // Square wave duty cycle
        this.dutyCycle += this.dutyCycleSlide;
        if (this.dutyCycle < 0)
            this.dutyCycle = 0;
        if (this.dutyCycle > 0.5)
            this.dutyCycle = 0.5;
        // Volume envelope
        if (++envelopeElapsed > this.envelopeLength[envelopeStage]) {
            envelopeElapsed = 0;
            if (++envelopeStage > 2)
                break;
        }
        var env_vol;
        var envf = envelopeElapsed / this.envelopeLength[envelopeStage];
        if (envelopeStage === 0) { // Attack
            env_vol = envf;
        }
        else if (envelopeStage === 1) { // Sustain
            env_vol = 1 + (1 - envf) * 2 * this.envelopePunch;
        }
        else { // Decay
            env_vol = 1 - envf;
        }
        // Flanger step
        this.flangerOffset += this.flangerOffsetSlide;
        var iphase = Math.abs(Math.floor(this.flangerOffset));
        if (iphase > 1023)
            iphase = 1023;
        if (this.flthp_d != 0) {
            this.flthp *= this.flthp_d;
            if (this.flthp < 0.00001)
                this.flthp = 0.00001;
            if (this.flthp > 0.1)
                this.flthp = 0.1;
        }
        // 8x oversampling
        var sample = 0;
        for (var si = 0; si < OVERSAMPLING; ++si) {
            var sub_sample = 0;
            phase++;
            if (phase >= iperiod) {
                phase %= iperiod;
                if (this.waveShape === NOISE)
                    for (var i = 0; i < 32; ++i)
                        noise_buffer[i] = Math.random() * 2 - 1;
            }
            // Base waveform
            var fp = phase / iperiod;
            if (this.waveShape === SQUARE) {
                if (fp < this.dutyCycle)
                    sub_sample = 0.5;
                else
                    sub_sample = -0.5;
            }
            else if (this.waveShape === SAWTOOTH) {
                if (fp < this.dutyCycle)
                    sub_sample = -1 + 2 * fp / this.dutyCycle;
                else
                    sub_sample = 1 - 2 * (fp - this.dutyCycle) / (1 - this.dutyCycle);
            }
            else if (this.waveShape === SINE) {
                sub_sample = Math.sin(fp * 2 * Math.PI);
            }
            else if (this.waveShape === NOISE) {
                sub_sample = noise_buffer[Math.floor(phase * 32 / iperiod)];
            }
            else {
                throw "ERROR: Bad wave type: " + this.waveShape;
            }
            // Low-pass filter
            var pp = fltp;
            this.fltw *= this.fltw_d;
            if (this.fltw < 0)
                this.fltw = 0;
            if (this.fltw > 0.1)
                this.fltw = 0.1;
            if (this.enableLowPassFilter) {
                fltdp += (sub_sample - fltp) * this.fltw;
                fltdp -= fltdp * this.fltdmp;
            }
            else {
                fltp = sub_sample;
                fltdp = 0;
            }
            fltp += fltdp;
            // High-pass filter
            fltphp += fltp - pp;
            fltphp -= fltphp * this.flthp;
            sub_sample = fltphp;
            // Flanger
            flanger_buffer[ipp & 1023] = sub_sample;
            sub_sample += flanger_buffer[(ipp - iphase + 1024) & 1023];
            ipp = (ipp + 1) & 1023;
            // final accumulation and envelope application
            sample += sub_sample * env_vol;
        }
        // Accumulate samples appropriately for sample rate
        sample_sum += sample;
        if (++num_summed >= summands) {
            num_summed = 0;
            sample = sample_sum / summands;
            sample_sum = 0;
        }
        else {
            continue;
        }
        sample = sample / OVERSAMPLING * masterVolume;
        sample *= this.gain;
        // store the original normalized floating point sample
        normalized.push(sample);
        if (this.bitsPerChannel === 8) {
            // Rescale [-1, 1) to [0, 256)
            sample = Math.floor((sample + 1) * 128);
            if (sample > 255) {
                sample = 255;
                ++num_clipped;
            }
            else if (sample < 0) {
                sample = 0;
                ++num_clipped;
            }
            buffer.push(sample);
        }
        else {
            // Rescale [-1, 1) to [-32768, 32768)
            sample = Math.floor(sample * (1 << 15));
            if (sample >= (1 << 15)) {
                sample = (1 << 15) - 1;
                ++num_clipped;
            }
            else if (sample < -(1 << 15)) {
                sample = -(1 << 15);
                ++num_clipped;
            }
            buffer.push(sample & 0xFF);
            buffer.push((sample >> 8) & 0xFF);
        }
    }
    return {
        "buffer": buffer,
        "normalized": normalized,
        "clipped": num_clipped,
    };
};
SoundEffect.prototype.generate = function () {
    var rendered = this.getRawBuffer();
    var wave = new _riffwave_js__WEBPACK_IMPORTED_MODULE_0__.RIFFWAVE();
    wave.header.sampleRate = this.sampleRate;
    wave.header.bitsPerSample = this.bitsPerChannel;
    wave.Make(rendered.buffer);
    wave.clipping = rendered.clipped;
    wave.buffer = rendered.normalized;
    wave.getAudio = _sfxr_getAudioFn(wave);
    return wave;
};
var _actx = null;
var _sfxr_getAudioFn = function (wave) {
    return function () {
        // check for procedural audio
        var actx = null;
        if (!_actx) {
            if ('AudioContext' in window) {
                _actx = new AudioContext();
            }
            else if ('webkitAudioContext' in window) {
                _actx = new webkitAudioContext();
            }
        }
        actx = _actx;
        if (actx) {
            var buff = actx.createBuffer(1, wave.buffer.length, wave.header.sampleRate);
            var nowBuffering = buff.getChannelData(0);
            for (var i = 0; i < wave.buffer.length; i++) {
                nowBuffering[i] = wave.buffer[i];
            }
            var volume = 1.0;
            var obj = {
                "channels": [],
                "setVolume": function (v) { volume = v; return obj; },
                "play": function () {
                    var proc = actx.createBufferSource();
                    proc.buffer = buff;
                    var gainNode = actx.createGain();
                    gainNode.gain.value = volume;
                    gainNode.connect(actx.destination);
                    proc.connect(gainNode);
                    if (proc["start"]) {
                        proc.start();
                    }
                    else if (proc["noteOn"]) {
                        proc.noteOn(0);
                    }
                    this.channels.push(proc);
                    return proc;
                }
            };
            return obj;
        }
        else {
            var audio = new Audio();
            audio.src = wave.dataURI;
            return audio;
        }
    };
};
/*** conversions from slider values, internal, and units ***/
// convert from slider values to internal representation
var sliders = {
    p_env_attack: function (v) { return v * v * 100000.0; },
    p_env_sustain: function (v) { return v * v * 100000.0; },
    p_env_punch: function (v) { return v; },
    p_env_decay: function (v) { return v * v * 100000.0; },
    p_base_freq: function (v) { return 8 * 44100 * (v * v + 0.001) / 100; },
    p_freq_limit: function (v) { return 8 * 44100 * (v * v + 0.001) / 100; },
    p_freq_ramp: function (v) { return 1.0 - Math.pow(v, 3.0) * 0.01; },
    p_freq_dramp: function (v) { return -Math.pow(v, 3.0) * 0.000001; },
    p_vib_speed: function (v) { return Math.pow(v, 2.0) * 0.01; },
    p_vib_strength: function (v) { return v * 0.5; },
    p_arp_mod: function (v) {
        return v >= 0 ? 1.0 - Math.pow(v, 2) * 0.9 : 1.0 + Math.pow(v, 2) * 10;
    },
    p_arp_speed: function (v) {
        return (v === 1.0) ? 0 :
            Math.floor(Math.pow(1.0 - v, 2.0) * 20000 + 32);
    },
    p_duty: function (v) { return 0.5 - v * 0.5; },
    p_duty_ramp: function (v) { return -v * 0.00005; },
    p_repeat_speed: function (v) {
        return (v === 0) ? 0 :
            Math.floor(Math.pow(1 - v, 2) * 20000) + 32;
    },
    p_pha_offset: function (v) { return (v < 0 ? -1 : 1) * Math.pow(v, 2) * 1020; },
    p_pha_ramp: function (v) { return (v < 0 ? -1 : 1) * Math.pow(v, 2); },
    p_lpf_freq: function (v) { return Math.pow(v, 3) * 0.1; },
    p_lpf_ramp: function (v) { return 1.0 + v * 0.0001; },
    p_lpf_resonance: function (v) { return 5.0 / (1.0 + Math.pow(v, 2) * 20); }, // * (0.01 + fltw);
    p_hpf_freq: function (v) { return Math.pow(v, 2) * 0.1; },
    p_hpf_ramp: function (v) { return 1.0 + v * 0.0003; },
    sound_vol: function (v) { return Math.exp(v) - 1; }
};
var sliders_inverse = {
    p_env_attack: function (v) { return Math.sqrt(v / 100000.0); },
    p_env_sustain: function (v) { return Math.sqrt(v / 100000.0); },
    p_env_punch: function (v) { return v; },
    p_env_decay: function (v) { return Math.sqrt(v / 100000.0); },
    p_base_freq: function (v) { return Math.sqrt(v * 100 / 8 / 44100 - 0.001); },
    p_freq_limit: function (v) { return Math.sqrt(v * 100 / 8 / 44100 - 0.001); },
    p_freq_ramp: function (v) { return Math.cbrt((1.0 - v) / 0.01); },
    p_freq_dramp: function (v) { return Math.cbrt(v / -0.000001); },
    p_vib_speed: function (v) { return Math.sqrt(v / 0.01); },
    p_vib_strength: function (v) { return v / 0.5; },
    p_arp_mod: function (v) {
        return v < 1 ? Math.sqrt((1.0 - v) / 0.9) : -Math.sqrt((v - 1.0) / 10.0);
    },
    p_arp_speed: function (v) {
        return (v === 0) ? 1.0 :
            ((1.0 - Math.sqrt((v - (v < 100 ? 30 : 32)) / 20000)));
    },
    p_duty: function (v) { return (v - 0.5) / -0.5; },
    p_duty_ramp: function (v) { return v / -0.00005; },
    p_repeat_speed: function (v) { return v === 0 ? 0 : -(Math.sqrt((v - 32) / 20000) - 1.0); },
    p_pha_offset: function (v) { return (v < 0 ? -1 : 1) * Math.sqrt(Math.abs(v) / 1020); },
    p_pha_ramp: function (v) { return (v < 0 ? -1 : 1) * Math.sqrt(Math.abs(v)); },
    p_lpf_freq: function (v) { return Math.cbrt(v / 0.1); },
    p_lpf_ramp: function (v) { return (v - 1.0) / 0.0001; },
    p_lpf_resonance: function (v) { return Math.sqrt((1.0 / (v / 5.0) - 1) / 20); },
    p_hpf_freq: function (v) { return Math.sqrt(v / 0.1); },
    p_hpf_ramp: function (v) { return (v - 1.0) / 0.0003; },
    sound_vol: function (v) { return Math.log(v + 1); ; }
};
// convert from internal representation to domain value without units
var domain = {
    p_env_attack: function (v) { return (v / 44100); },
    p_env_sustain: function (v) { return (v / 44100); },
    p_env_punch: function (v) { return (v * 100); },
    p_env_decay: function (v) { return (v / 44100); },
    p_base_freq: function (v) { return v; },
    p_freq_limit: function (v) { return v; },
    p_freq_ramp: function (v) { return (44100 * Math.log(v) / Math.log(0.5)); },
    p_freq_dramp: function (v) { return (v * 44100 / Math.pow(2, -44101. / 44100)); },
    p_vib_speed: function (v) { return (441000 / 64. * v); },
    p_vib_strength: function (v) { return (v * 100); },
    p_arp_mod: function (v) { return (1. / v); },
    p_arp_speed: function (v) { return (v / 44100); },
    p_duty: function (v) { return (100 * v); },
    p_duty_ramp: function (v) { return (8 * 44100 * v); },
    p_repeat_speed: function (v) { return v === 0 ? 0 : (44100. / v); },
    p_pha_offset: function (v) { return (1000 * v / 44100); },
    p_pha_ramp: function (v) { return (1000 * v); },
    p_lpf_freq: function (v) { return (v === .1) ? 0 : 8 * 44100 * v / (1 - v); },
    p_lpf_ramp: function (v) { return Math.pow(v, 44100); },
    p_lpf_resonance: function (v) { return (100 * (1 - v * .11)); },
    p_hpf_freq: function (v) { return 8 * 44100 * v / (1 - v); },
    p_hpf_ramp: function (v) { return Math.pow(v, 44100); },
    sound_vol: function (v) { return 10 * Math.log(v * v) / Math.log(10); }
};
var domain_inverse = {
    p_env_attack: function (v) { return (v * 44100); },
    p_env_sustain: function (v) { return (v * 44100); },
    p_env_punch: function (v) { return (v / 100); },
    p_env_decay: function (v) { return (v * 44100); },
    p_base_freq: function (v) { return v; },
    p_freq_limit: function (v) { return v; },
    p_freq_ramp: function (v) { return Math.exp(Math.log(0.5) * v / 44100); },
    p_freq_dramp: function (v) { return v * Math.pow(2, -44101. / 44100) / 44100; },
    p_vib_speed: function (v) { return (64. / 441000) * v; },
    p_vib_strength: function (v) { return (v / 100); },
    p_arp_mod: function (v) { return (1. / v); },
    p_arp_speed: function (v) { return (v * 44100); },
    p_duty: function (v) { return (v / 100); },
    p_duty_ramp: function (v) { return (v / (8 * 44100)); },
    p_repeat_speed: function (v) { return v <= 0 ? 0 : v > 1378 ? 32 : (44100 / v); },
    p_pha_offset: function (v) { return (v / 1000) * 44100; },
    p_pha_ramp: function (v) { return (v / 1000); },
    p_lpf_freq: function (v) { return (v / (v + 8 * 44100)); },
    p_lpf_ramp: function (v) { return Math.pow(v, 1 / 44100); },
    p_lpf_resonance: function (v) { return (1 - v / 100) / .11; },
    p_hpf_freq: function (v) { return (v / (v + 8 * 44100)); },
    p_hpf_ramp: function (v) { return Math.pow(v, 1 / 44100); },
    sound_vol: function (v) { return Math.sqrt(Math.pow(10, v / 10)); }
};
// convert from internal representation to printable units
var units = {
    p_env_attack: function (v) { return (v / 44100).toPrecision(4) + ' sec'; },
    p_env_sustain: function (v) { return (v / 44100).toPrecision(4) + ' sec'; },
    p_env_punch: function (v) { return '+' + (v * 100).toPrecision(4) + '%'; },
    p_env_decay: function (v) { return (v / 44100).toPrecision(4) + ' sec'; },
    p_base_freq: function (v) { return v.toPrecision(4) + 'Hz'; },
    p_freq_limit: function (v) { return v.toPrecision(4) + 'Hz'; },
    p_freq_ramp: function (v) {
        return (44100 * Math.log(v) / Math.log(0.5)).toPrecision(4) + ' 8va/sec';
    },
    p_freq_dramp: function (v) {
        return (v * 44100 / Math.pow(2, -44101. / 44100)).toExponential(4) +
            ' 8va/s^2';
    },
    p_vib_speed: function (v) {
        return v === 0 ? 'OFF' :
            (441000 / 64. * v).toPrecision(4) + ' Hz';
    },
    p_vib_strength: function (v) {
        return v === 0 ? 'OFF' :
            '&plusmn; ' + (v * 100).toPrecision(4) + '%';
    },
    p_arp_mod: function (v) {
        return ((v === 1) ? 'OFF' :
            'x ' + (1. / v).toPrecision(4));
    },
    p_arp_speed: function (v) {
        return (v === 0 ? 'OFF' :
            (v / 44100).toPrecision(4) + ' sec');
    },
    p_duty: function (v) { return (100 * v).toPrecision(4) + '%'; },
    p_duty_ramp: function (v) { return (8 * 44100 * v).toPrecision(4) + '%/sec'; },
    p_repeat_speed: function (v) {
        return v === 0 ? 'OFF' :
            (44100 / v).toPrecision(4) + ' Hz';
    },
    p_pha_offset: function (v) {
        return v === 0 ? 'OFF' :
            (1000 * v / 44100).toPrecision(4) + ' msec';
    },
    // Not so sure about this:
    p_pha_ramp: function (v) {
        return v === 0 ? 'OFF' :
            (1000 * v).toPrecision(4) + ' msec/sec';
    },
    p_lpf_freq: function (v) {
        return (v === .1) ? 'OFF' : Math.round(8 * 44100 * v / (1 - v)) + ' Hz';
    },
    p_lpf_ramp: function (v) {
        if (v === 1)
            return 'OFF';
        return Math.pow(v, 44100).toPrecision(4) + ' ^sec';
    },
    p_lpf_resonance: function (v) { return (100 * (1 - v * .11)).toPrecision(4) + '%'; },
    p_hpf_freq: function (v) {
        return (v === 0) ? 'OFF' : Math.round(8 * 44100 * v / (1 - v)) + ' Hz';
    },
    p_hpf_ramp: function (v) {
        if (v === 1)
            return 'OFF';
        return Math.pow(v, 44100).toPrecision(4) + ' ^sec';
    },
    sound_vol: function (v) {
        v = 10 * Math.log(v * v) / Math.log(10);
        var sign = v >= 0 ? '+' : '';
        return sign + v.toPrecision(4) + ' dB';
    }
};
// Other exports, to match the previous exports structure.
const convert = {
    sliders, domain, sliders_inverse, domain_inverse, units,
};
const parameters = {
    params_order, params_signed
};
const waveforms = {
    SQUARE, SAWTOOTH, SINE, NOISE
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./ts/main.ts ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game/game */ "./ts/game/game.ts");

async function init() {
    await _game_game__WEBPACK_IMPORTED_MODULE_0__.Game.preload();
    const game = new _game_game__WEBPACK_IMPORTED_MODULE_0__.Game('.canvas');
    game.start();
}
window.addEventListener('load', init);

})();

/******/ })()
;
//# sourceMappingURL=main.bundle.js.map