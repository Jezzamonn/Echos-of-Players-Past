// Functions that handle the connection to the server.
// Do either a GET or POST request to the server.

import { PlayerInfo } from "../player-info";
import { KeyHistory } from "../recordreplay/key-history";

const SERVER_URL = "https://us-central1-stellar-ether-198321.cloudfunctions.net/players";

export async function saveMoves(player: string, level: string, moves: KeyHistory) {
    const data = {
        player,
        level,
        moves,
    };

    await fetch(SERVER_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
}

export async function fetchSavedMoves(level: string): Promise<PlayerInfo[]> {
    const response = await fetch(`${SERVER_URL}?level=${level}`);
    return await response.json();
}