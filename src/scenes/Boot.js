import Phaser from 'phaser';

export default class extends Phaser.Scene {
	constructor () {
		super({ key: 'BootScene' });
	}

	preload () {
		//
		// load your assets
		//
		this.load.image('Fluff', './assets/images/Fluff.png');
		this.load.image('alt-bun', './assets/images/alt-bun.png');
		this.load.image('banana', './assets/images/bananana.png');
	}

	create () {
		this.scene.start('MenuScene'); // TODO: change back to MenuScene
	}

}
