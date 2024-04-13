import {
    ACTION_KEYS,
    DOWN_KEYS,
    LEFT_KEYS,
    RIGHT_KEYS,
    UP_KEYS,
} from '../../constants';
import { RegularKeys } from '../../lib/keys';
import { KeyHistory } from './key-history';

export class KeyRecorder {
    frameCount = 0;
    gotSomeInput = false;

    // [frame, keys pressed combined into a bitfield]
    keyHistory: KeyHistory = [];

    update(keys: RegularKeys) {
        const left = keys.anyIsPressed(LEFT_KEYS);
        const right = keys.anyIsPressed(RIGHT_KEYS);
        const up = keys.anyIsPressed(UP_KEYS);
        const down = keys.anyIsPressed(DOWN_KEYS);
        const action = keys.anyIsPressed(ACTION_KEYS);

        if (!this.gotSomeInput && !(left || right || up || down || action)) {
            // Don't start recording until the first input.
            return;
        }
        this.gotSomeInput = true;

        let lastInput = 0;
        if (this.keyHistory.length > 0) {
            lastInput = this.keyHistory[this.keyHistory.length - 1][1];
        }

        const bitfield =
            (+left << 0) |
            (+right << 1) |
            (+up << 2) |
            (+down << 3) |
            (+action << 4);

        if (bitfield != lastInput) {
            this.keyHistory.push([this.frameCount, bitfield]);
        }

        this.frameCount++;
    }
}
