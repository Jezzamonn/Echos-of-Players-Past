import './ui/all-ui';

import { Game } from "./game/game";
import { PlayerInfo } from './game/player-info';
import { RootComponent } from './ui/root-component';

async function init() {
    await Game.preload()

    const game = new Game();
    game.start();
    // Global game to make events and such easier.
    (window as any).game = game;

    const root = document.querySelector('root-component') as RootComponent;
    game.setCanvas(root.shadowRoot?.querySelector('canvas')!);

    game.onLevelChange = (levelName: string, attemptNum: number) => {
        root.levelName = levelName;
        root.levelAttemptNumber = attemptNum;
    }

    root.addEventListener('players-selected', (event: CustomEvent<PlayerInfo[]>) => {
        console.log('players selected')
        game.selectPlayers(event.detail);
    });
}

init();