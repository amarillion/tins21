import { assert } from '@amarillion/helixgraph/lib/assert.js';
import { pickOne } from '@amarillion/helixgraph/lib/random.js';
import Phaser from 'phaser';
import { Node } from '../grid.ts';

const STEPS = 40;

export default class extends Phaser.GameObjects.Sprite {
	
	constructor ({ scene, node, asset }) {
		super(scene, node.cx, node.cy, asset);
		this.node = node;
		this.stepsRemain = 0;
		this.prevNode = null;
		this.solution = scene.solution && scene.solution.slice(1);
	}

	preUpdate(time, delta) {
		super.preUpdate(time, delta);

		if (!this.nextNode) {
			this.stepsRemain = STEPS;
			const links = Node.getAdjacent(this.node).map(v => v[1]).filter(n => n !== this.prevNode);
			assert(links.length > 0);

			if (this.solution && links.indexOf(this.solution[0]) >= 0) {
				this.nextNode = this.solution.shift();
			}
			else {
				this.nextNode = pickOne(links);
			}
		}

		const deltax = this.nextNode.cx - this.node.cx;
		const deltay = this.nextNode.cy - this.node.cy;

		this.x = this.nextNode.cx - this.stepsRemain * (deltax / STEPS);
		this.y = this.nextNode.cy - this.stepsRemain * (deltay / STEPS);
		this.stepsRemain--;
		
		if (this.stepsRemain <= 0) {
			this.prevNode = this.node;
			this.node = this.nextNode;
			this.nextNode = null;
			if (this.node === this.scene.endNode) {
				this.scene.endReached();
				this.destroy();
			}
			if (!this.node.tile) {
				this.destroy();
			}
		}
	}
}
