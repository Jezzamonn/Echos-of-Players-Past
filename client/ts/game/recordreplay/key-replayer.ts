import { RegularKeys } from '../../lib/keys';
import { KeyHistory } from './key-history';

const KEY_BIT_POSITIONS: { [key: string]: number } = {
    'ArrowLeft': 0,
    'ArrowRight': 1,
    'ArrowUp': 2,
    'ArrowDown': 3,
    'Space': 4,
};

export class KeyReplayer extends RegularKeys {
    keyHistory: KeyHistory = [];
    historyIndex: number = 0;
    frameCount = 0;
    started = false;

    currentBitfield = 0;
    lastBitfield = 0;

    constructor(keyHistory: KeyHistory) {
        super();
        this.keyHistory = keyHistory;
    }

    start() {
        this.started = true;
    }

    isPressed(keyCode: string): boolean {
        if (KEY_BIT_POSITIONS[keyCode] === undefined) {
            return false;
        }
        const bitPosition = KEY_BIT_POSITIONS[keyCode];
        return (this.currentBitfield & (1 << bitPosition)) !== 0;
    }

    wasPressedThisFrame(keyCode: string): boolean {
        if (KEY_BIT_POSITIONS[keyCode] === undefined) {
            return false;
        }
        const bitPosition = KEY_BIT_POSITIONS[keyCode];
        return (this.currentBitfield & (1 << bitPosition)) !== 0 &&
            (this.lastBitfield & (1 << bitPosition)) === 0;
    }

    wasReleasedThisFrame(keyCode: string): boolean {
        const bitPosition = KEY_BIT_POSITIONS[keyCode];
        return (this.currentBitfield & (1 << bitPosition)) === 0 &&
            (this.lastBitfield & (1 << bitPosition)) !== 0;
    }

    resetFrame() {
        if (!this.started) {
            return;
        }

        if (this.historyIndex >= this.keyHistory.length) {
            return;
        }

        const [frame, bitfield] = this.keyHistory[this.historyIndex];
        if (frame === this.frameCount) {
            this.lastBitfield = this.currentBitfield;
            this.currentBitfield = bitfield;
            this.historyIndex++;
        }

        this.frameCount++;
    }
}
