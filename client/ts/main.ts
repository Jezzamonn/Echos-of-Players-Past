import './ui/all-ui';

import { Game } from "./game/game";
import { PlayerInfo, PlayerVisualInfo } from './game/player-info';
import { Sounds } from './lib/sounds';
import { RootComponent, UIState } from './ui/root-component';

async function init() {
    await Game.preload()

    const game = new Game();
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

    root.addEventListener('hide-title', () => {
        root.uiState = UIState.Customizing;
    });

    root.addEventListener('select-customization', (event: CustomEvent<PlayerVisualInfo>) => {
        console.log('start game')
        game.playerVisualInfo = event.detail;
        game.start();
    });

    Sounds.setSongs(['drums-small', 'chords-small']);
}

init();