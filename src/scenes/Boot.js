import Phaser from 'phaser';

export default class extends Phaser.Scene {
	constructor () {
		super({ key: 'BootScene' });
	}

	preload () {
		this.load.image('loaderBg', './assets/images/loader-bg.png');
		this.load.image('loaderBar', './assets/images/loader-bar.png');
	}

	update () {
		this.scene.start('SplashScene');
	}

}
