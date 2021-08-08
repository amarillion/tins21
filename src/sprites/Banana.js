import { MapSprite } from "./MapSprite.js";

const STEPS = 40;

export class Banana extends MapSprite {
	
	constructor ({ scene, node }) {
		super({ scene, node, asset: 'banana-spritesheet' });
		this.play('banana');
	}

}