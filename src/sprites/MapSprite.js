import { assert } from '@amarillion/helixgraph/lib/assert.js';
import { pickOne } from '@amarillion/helixgraph/lib/random.js';
import Phaser from 'phaser';
import { Node } from '../grid.ts';
import { Stream } from '@amarillion/helixgraph/lib/iterableUtils.js';

const STEPS = 40;

export class MapSprite extends Phaser.GameObjects.Sprite {
	
	constructor ({ scene, node, asset }) {
		super(scene, node.cx, node.cy, asset);
		
		this.node = node;
		this.stepsRemain = 0;
		this.nextNode = null;
		this.prevNode = null;
		this.halfwayCheckpoint = false;
		this.solution = scene.solution && scene.solution.slice(1);
	}

	determineNextNode() {
		const exits = Stream.of(Node.getExits(this.node)).map(v => v[1]).filter(n => n !== this.prevNode).collect();
		
		if(exits.length === 0) {
			this.destroy();
		}
		
		let result;

		if (this.solution && exits.indexOf(this.solution[0]) >= 0) {
			result = this.solution.shift();
		}
		else {
			result = pickOne(exits);
		}
		return result;
	}

	onHalfWay() {
		if (!this.nextNode.tile) {
			this.destroy();
		}

		const reversePath = Stream.of(Node.getExits(this.nextNode)).map(v => v[1]).find(n => n === this.node);
		if (!reversePath) {
			// we can't go further. Go back along the same path.
			[this.node, this.nextNode] = [this.nextNode, this.node];
		}
	
	}

	preUpdate(time, delta) {
		super.preUpdate(time, delta);

		if (!this.nextNode) {
			this.stepsRemain = STEPS;
			this.nextNode = this.determineNextNode();
			this.halfwayCheckpoint = false;
		}

		const deltax = this.nextNode.cx - this.node.cx;
		const deltay = this.nextNode.cy - this.node.cy;

		this.x = this.nextNode.cx - this.stepsRemain * (deltax / STEPS);
		this.y = this.nextNode.cy - this.stepsRemain * (deltay / STEPS);
		this.stepsRemain--;
		
		if (!this.halfwayCheckpoint && this.stepsRemain < (STEPS / 2)) {
			this.onHalfWay();
			this.halfwayCheckpoint = true;
		}

		if (this.stepsRemain <= 0) {
			this.prevNode = this.node;
			this.node = this.nextNode;
			this.nextNode = null;
			if (this.node === this.scene.endNode) {
				this.scene.endReached();
				this.destroy();
			}
		}
	}
}
