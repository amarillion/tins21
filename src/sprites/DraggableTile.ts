import Phaser from 'phaser';
import { Tile } from '../tiles';
import { Game } from '../scenes/Game';

export default class extends Phaser.GameObjects.Sprite {
	
	constructor ({ scene, x, y, tile } : { scene: Game, x: number, y : number, tile: Tile }) {
		super(scene, x, y, tile.resKey);
	}

}
