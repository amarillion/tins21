import Phaser from 'phaser';
import { Node } from '../grid';
import { Stream } from '@amarillion/helixgraph/lib/iterableUtils.js';
import { Game } from '../scenes/Game';

const STEPS = 40;

export type ActionType = {
	type: 'MOVE' | 'SIT';
	time: number
}

export class MapSprite extends Phaser.GameObjects.Sprite {
	
	node: Node;
	stepsRemain: number;
	nextNode: Node;
	prevNode: Node;
	halfwayCheckpoint: boolean;
	solution: Node[];
	followingPath: boolean;
	action: ActionType;
	scene: Game

	constructor ({ scene, node, asset }) {
		super(scene, node.cx, node.cy, asset);
		
		this.node = node;
		this.stepsRemain = 0;
		this.nextNode = null;
		this.prevNode = null;
		this.halfwayCheckpoint = false;
		this.followingPath = true;
	}

	determineNextNode() : Node {
		return null;
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

	onNodeReached() {
		// pass
	}

	followPath() {
		if (!this.nextNode) {
			this.stepsRemain = STEPS;
			this.nextNode = this.determineNextNode();
			this.halfwayCheckpoint = false;

			if (!this.nextNode) {
				this.action = {
					type: 'SIT',
					time: STEPS
				};
				return;
			}
		}

		const deltax = this.nextNode.cx - this.node.cx;
		const deltay = this.nextNode.cy - this.node.cy;

		this.x = this.nextNode.cx - this.stepsRemain * (deltax / STEPS);
		this.y = this.nextNode.cy - this.stepsRemain * (deltay / STEPS);
		
		if (!this.halfwayCheckpoint && this.stepsRemain < (STEPS / 2)) {
			this.onHalfWay();
			this.halfwayCheckpoint = true;
		}
	}

	completeAction() {
		if (this.action.type === 'MOVE') {
			this.prevNode = this.node;
			this.node = this.nextNode;
			this.nextNode = null;
			this.action = null;
			this.onNodeReached();
		}
	}

	determineNextAction() : ActionType {
		return {
			type : 'SIT',
			time : STEPS, 
		};
	}

	preUpdate(time, delta) {
		super.preUpdate(time, delta);

		if (!this.action) {
			this.action = this.determineNextAction();
			console.log('New action', this, this.action);
			this.stepsRemain = this.action.time;
		}

		if (this.action.type === 'MOVE') {
			this.followPath();
		}

		this.stepsRemain--;
		if (this.stepsRemain <= 0) {
			this.completeAction();
			this.action = null;
		}

	}
}
