import Phaser from 'phaser';

import BootScene from './scenes/Boot.js';
import SplashScene from './scenes/Splash.js';
import GameScene from './scenes/Game.ts';
import { MenuScene } from './scenes/menu.js';
import config from './config.js';
import { MenuComponent } from './menuComponent.js';

const gameConfig = Object.assign(config, {
	scene: [BootScene, SplashScene, GameScene, MenuScene]
});

class Game extends Phaser.Game {
	constructor () {
		super(gameConfig);
	}
}

customElements.define('game-menu', MenuComponent);

window.game = new Game();
