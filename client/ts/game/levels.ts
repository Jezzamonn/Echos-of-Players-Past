import { Images } from "../lib/images";
import { Sounds } from "../lib/sounds";

export interface LevelInfo {
    name: string;
    song?: string;
    numPlayers: number;
}


export const LEVELS: LevelInfo[] = [
    // {
    //     name: 'level-test',
    // },
    {
        name: 'level1',
        numPlayers: 1,
    },
    {
        name: 'level2',
        numPlayers: 2,
    },
    {
        name: 'twoswitches',
        numPlayers: 2,
    },
    {
        name: 'spikes',
        numPlayers: 2,
    },
    {
        name: 'toggle-buttons',
        numPlayers: 2,
    },
    {
        name: 'threeplayers',
        numPlayers: 3,
    },
    {
        name: 'chaos',
        numPlayers: 4,
    },
    {
        name: 'silly',
        numPlayers: 5,
    }
];

export class Levels {
    static preload(): Promise<any> {
        const promises: Promise<any>[] = [];
        for (const level of LEVELS) {
            promises.push(
                Images.loadImage({name: level.name, path: 'level/', extension: 'gif'}),
            );
            if (level.song && Sounds.audios[level.song] === undefined) {
                promises.push(
                    Sounds.loadSound({name: level.song, path: 'music/'}),
                );
            }
        }

        return Promise.all(promises);
    }
}