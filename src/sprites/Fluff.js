import { MapSprite } from "./MapSprite.js";

export class Fluff extends MapSprite {
	
	constructor ({ scene, node }) {
		super({ scene, node, asset: 'fluff-spritesheet' });
		this.play('fluff');
	}
}