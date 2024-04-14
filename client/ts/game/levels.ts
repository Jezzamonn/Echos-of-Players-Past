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
        name: 'level-twoswitches',
        numPlayers: 3,
    },
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