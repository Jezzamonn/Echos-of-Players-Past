import { KeyHistory } from "./recordreplay/key-history";

// TODO: Include player appearance options.
export interface PlayerInfo {
    player: string;
    moves: KeyHistory;
}
