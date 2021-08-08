import { Stream } from '@amarillion/helixgraph/lib/iterableUtils.js';
import { pickOne } from '@amarillion/helixgraph/lib/random.js';
import { MapSprite } from './MapSprite.js';
import { Node } from '../grid.ts';

export class Fluff extends MapSprite {
	
	determineNextNode() {
		const exits = Stream.of(Node.getExits(this.node)).map(v => v[1]).filter(n => n !== this.prevNode).collect();
		
		if(exits.length === 0) {
			this.destroy();
		}

		return pickOne(exits);
	}

	onHalfWay() {
		if (!this.nextNode.tile) {
			[this.node, this.nextNode] = [this.nextNode, this.node];
			return;
		}

		const reversePath = Stream.of(Node.getExits(this.nextNode)).map(v => v[1]).find(n => n === this.node);
		if (!reversePath) {
			// we can't go further. Go back along the same path.
			[this.node, this.nextNode] = [this.nextNode, this.node];
		}
	}

	constructor ({ scene, node }) {
		super({ scene, node, asset: 'fluff-spritesheet' });
		this.play('fluff');
	}
}