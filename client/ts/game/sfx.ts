// @ts-ignore
import { sfxr } from "jsfxr";
import { MuteState, Sounds } from "../lib/sounds";

const sfx: { [key: string]: any } = {};

class _SFX {
    sounds: { [key: string]: any } = {};

    preload() {
        for (let key in sfx) {
            this.sounds[key] = sfxr.toAudio(sfx[key]);
        }
    }

    play(name: string) {
        if (Sounds.muteState === MuteState.ALL_OFF) {
            return;
        }

        const sound = this.sounds[name];
        if (sound) {
            sound.play();
        }
    }
}

export const SFX = new _SFX();
