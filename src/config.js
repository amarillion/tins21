import Phaser from 'phaser';

const ASPECT_RATIO = 16/9;
export const SCREENW = 800;
export const SCREENH = SCREENW / ASPECT_RATIO;
export const SCALE = 64;

export default {
	type: Phaser.AUTO,
	parent: 'content',
	backgroundColor: '#dddddd',
	width: SCREENW,
	height: SCREENH,
	localStorageName: 'tins21-amarillion'
};
