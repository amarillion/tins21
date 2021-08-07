import Phaser from 'phaser';

const ASPECT_RATIO = 16/9;
export const SCREENW = 800;
export const SCREENH = SCREENW / ASPECT_RATIO;

export const SCALE = 64;
export const MAX_SCORE = 25;

export default {
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
	}
};
