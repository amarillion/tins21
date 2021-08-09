import { Stream } from '@amarillion/helixgraph/lib/iterableUtils.js';
import { pickOne } from '@amarillion/helixgraph/lib/random.js';
import { ActionType, MapSprite } from './MapSprite';
import { Node } from '../grid';

const STEPS = 40;

export class Fluff extends MapSprite {
	
	constructor ({ scene, node }) {
		super({ scene, node, asset: 'fluff-spritesheet' });
		this.play('fluff');
	}

	determineNextNode() {
		const exits = Stream.of(Node.getExits(this.node)).map(v => v[1]).filter(n => n !== this.prevNode).collect();
		
		if(exits.length === 0) {
			this.destroy();
		}

		return pickOne(exits);
	}

	determineNextAction() : ActionType {
		if (this.actionCounter % 2 === 1) {
			return {
				type: 'MOVE',
				time: STEPS * 2
			};
		}
		else {
			return {
				type: 'SIT',
				time: STEPS
			};

		}
	}

	onHalfWay() {
		if (!this.nextNode.tile) {
			[this.node, this.nextNode] = [this.nextNode, this.node];
			return;
		}

		const reversePath = Stream.of(Node.getExits(this.nextNode)).map(v => v[1]).find(n => n === this.node);
		if (!reversePath) {
			// we can't go further. 
			// Two options: return or destroy...
			if (Math.random() > 0.5) {
				[this.node, this.nextNode] = [this.nextNode, this.node];
			}
			else {
				this.scene.destroyTile(this.nextNode);
				this.destroy(); // TODO: animate...
			}
		}
	}

}
