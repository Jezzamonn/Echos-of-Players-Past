import { KeyHistory } from "./recordreplay/key-history";

// Hair color options: black, brown, blonde
// Hair style options: poofy, pointy, bald
// Skin tone options: light, medium, dark
// Clothing options: blue, green
export interface PlayerInfo {
    player: string;
    moves: KeyHistory;

    hairColor?: string;
    hairStyle?: string;
    skinTone?: string;
    clothing?: string;
}
