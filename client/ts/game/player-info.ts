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

export interface PlayerVisualInfo {
    player?: string;
    hairColor?: string;
    hairStyle?: string;
    skinTone?: string;
    clothing?: string;
}

export function playerInfoToLayers(player: PlayerVisualInfo): string[] {
    let hairLayer = `Hair${player.hairStyle ?? 'Poofy'}${player.hairColor ?? 'Brown'}`;
    if (player.hairStyle === 'bald') {
        hairLayer = '';
    }
    return [
        hairLayer,
        `Head${player.skinTone ?? 'Medium'}`,
        `Body${player.clothing ?? 'Blue'}`,
        "Ghost"
    ];
}