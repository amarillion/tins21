import Phaser from 'phaser';

/*
	Adds an event listener on a DOM element, and returns a function that
	removes it again when called.
*/
export function registerEventListener(elt, type, func, capture = false) {
	elt.addEventListener(type, func, capture);
	return () => {
		elt.removeEventListener(type, func, capture);
	};
}

export class MenuScene extends Phaser.Scene {

	constructor () {
		super({ key: 'MenuScene' });
	}

	async create() {
		document.querySelector('div#wrapper').style = 'display: none;';
		document.querySelector('game-menu').style = 'display: visible;';

		this.component = document.querySelector('game-menu');
		// this.component.style.display = 'visible';
		this.unregister = [
			registerEventListener(this.component, 'Start', () => this.startGame()),
			// registerEventListener(this.component, "button-pressed", () => this.menuOkSound.play()),
		];
		this.events.on('shutdown', () => this.shutdown());
	}

	startGame() {
		this.scene.start('GameScene');
	}

	shutdown() {
		this.unregister.forEach(f => f());
		document.querySelector('game-menu').style = 'display: none;';
		document.querySelector('div#wrapper').style = 'display: visible;';
	}
}
