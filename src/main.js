import Phaser from 'phaser';

import BootScene from './scenes/Boot.js';
import SplashScene from './scenes/Splash.js';
import GameScene from './scenes/Game.ts';
import { MenuScene } from './scenes/menu.js';
import { MenuComponent } from './components/menuComponent.js';

import { SCREENH, SCREENW } from './constants.js';

const config = {
	type: Phaser.AUTO,
	parent: 'content',
	disableContextMenu: true,
	backgroundColor: '#dddddd',
	width: SCREENW,
	height: SCREENH,
	localStorageName: 'tins21-amarillion',
	fps: {
		target: 60
	},
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		parent: 'content'
	},
	scene: [BootScene, SplashScene, GameScene, MenuScene]
};

class Game extends Phaser.Game {
	constructor () {
		super(config);
	}
}

customElements.define('game-menu', MenuComponent);

window.game = new Game();
