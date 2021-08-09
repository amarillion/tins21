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
		// die of old age...
		if (this.actionCounter > 50) {
			return {
				type: 'SIT',
				time: STEPS,
				onComplete: () => {
					this.destroy();
				}
			};
		}
		
		const explodeChance = Math.min(0.5, this.actionCounter / 20);
		if (Math.random() < explodeChance) {
			if (this.node !== this.scene.startNode && this.node !== this.scene.endNode) {
				return {
					type: 'SHAKE',
					time: STEPS * 3,
					onComplete: () => {
						this.scene.destroyTile(this.node);
						this.destroy();
					}
				};
			}
		}

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
		if (!this.path.hasDestTile()) {
			this.path.reverse();
			return;
		}

		if (!this.path.hasDestExit()) {
			// we can't go further. 
			// Two options: return or destroy...
			if (Math.random() > 0.5) {
				this.path.reverse();
			}
			else {
				this.scene.destroyTile(this.path.dest);
				this.destroy(); // TODO: animate...
			}
		}
	}

}
