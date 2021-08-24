import Phaser from 'phaser';
import { Tile } from '../tiles';
import { Game } from '../scenes/Game';
import { Point, wrapRotation } from '../util/geometry';
import { getRotationUnits, rotateMaskLeft, rotateMaskRight } from '../tileUtil';
import { Node } from '../grid';
import { assert } from '@amarillion/helixgraph/lib/assert';

const TWO_PI = Math.PI * 2;

export interface Draggable {
	dragRelease: ( pointer: Point ) => void,
	dragStart: ( pointer: Point ) => void,
	/** Moving the mouse. If mouse moved outside of screen, x and y are negative.  */
	dragMove: ( pointer: Point ) => void,
	dragCancel: ( pointer: Point ) => void,
}

export default class extends Phaser.GameObjects.Sprite {
	
	scene: Game;
	grabPoint: Point;
	target: Point;
	tile: Tile;

	debugGraphics: Phaser.GameObjects.Graphics;

	constructor ({ scene, x, y, tile } : { scene: Game, x: number, y : number, tile: Tile }) {
		super(scene, x, y, tile.resKey);
		this.grabPoint = null;
		this.tile = tile;
		this.rotationBlocked = false;
	}

	preUpdate(/*time, delta*/) {
		// keep moving towards target?
		// keep track of speed?
	}

	dragStart(pointer) {
		this.grabPoint = {
			x : pointer.x - this.x,
			y : pointer.y - this.y
		};
	}

	dragMove(pointer : Point) {
		if (pointer.x < 0) {
			this.visible = false;
		}
		else {
			this.visible = true;
			this.x = pointer.x;
			this.y = pointer.y;
		}
	}

	rotateLeft() {
		if (this.rotationBlocked) return;
		const rotationSteps = this.scene.tesselation.rotationSteps;
		const targetRotation = this.rotation - (TWO_PI / rotationSteps);
		this.scene.tweens.add({
			targets:[this],
			duration: 100,
			rotation: targetRotation,
			onComplete: () => this.rotationBlocked = false
		});
	}

	rotationBlocked: boolean;

	rotateRight() {
		if (this.rotationBlocked) return;
		const rotationSteps = this.scene.tesselation.rotationSteps;
		const targetRotation = this.rotation + (TWO_PI / rotationSteps);
		this.scene.tweens.add({
			targets:[this],
			duration: 100,
			rotation: targetRotation,
			onComplete: () => this.rotationBlocked = false
		});
	}

	dragCancel() {
		this.visible = true; // in case we're out of screen
		const scene = this.scene;
		scene.tweens.add({
			targets: [ this ],
			duration: 200,
			x: scene.control.x,
			y: scene.control.y,
		});
	}

	/**
	 * Rotate, while at the same time substituting the contents of the tile,
	 * so that the rotation appears invisible.
	 * @param sign negative: left rotation. Positive: right rotation
	 */
	rotateContents(sign : -1 | 1) {
		const scene = this.scene;
		const symmetryAngle = TWO_PI / this.scene.tesselation.symmetry;
		let connectionMask = this.tile.connectionMask;
		const sides = this.scene.tesselation.sides;
		const symmetryUnit = Math.round(sides / this.scene.tesselation.symmetry);
		
		let currentRotation = this.rotation;
		// const before = currentRotation;
		
		if (sign === -1) {
			connectionMask = rotateMaskLeft(connectionMask, symmetryUnit, sides);
			currentRotation -= symmetryAngle;
		}
		else {
			connectionMask = rotateMaskRight(connectionMask, symmetryUnit, sides);
			currentRotation += symmetryAngle;
		}
		// console.log('reducing angle', angle(before), '->', angle(currentRotation), angleUnit);
		
		// replace tile and texture
		this.rotation = currentRotation;
		this.tile = scene.tileSet[connectionMask];
		this.setTexture(this.tile.resKey);
	}

	dropTile(node : Node) {
		const angle = x => Math.round(x * 360 / (TWO_PI));

		const scene = this.scene;
		
		// round rotation to nearest unit angle...
		const symmetryAngle = TWO_PI / this.scene.tesselation.symmetry;

		const targetRotation = wrapRotation(node.element.rotation);
		const before = this.rotation;
		
		const deltaRotation = () => wrapRotation(targetRotation - this.rotation); 
		
		// converting to angle to round off, and avoid float equality problems
		// where the angle should be 0 but in reality it's 1e-16.
		let it = 0;
		while (angle(deltaRotation()) > angle(symmetryAngle / 2)) {
			console.log('rotate left', angle(deltaRotation()), angle(symmetryAngle / 2));
			this.rotateContents(+1);
			assert(it++ < 6);
		}

		it = 0;
		while (angle(deltaRotation()) < angle(-symmetryAngle / 2)) {
			console.log('rotate right', angle(deltaRotation()), angle(-symmetryAngle / 2));
			this.rotateContents(-1);
			//TODO: this can get in an infinite loop if elementRotation is +180 and targetRotation = -180
			assert(it++ < 6);
		}

		console.log('before', {
			before: angle(before),
			after: angle(this.rotation),
			elementRotation: angle(node.element.rotation),
			targetRotation: angle(targetRotation),
			symmetryAngle: angle(symmetryAngle),
		});
		
		scene.tweens.add({
			targets: [ this ],
			duration: 300,
			x: node.cx,
			y: node.cy,
			rotation: targetRotation,
			onComplete: () => {
				scene.setTile(node, this.tile);
				this.destroy();
			}
		});

	}

	dragRelease(/* pointer */) {
		const scene = this.scene;
		
		if (scene.controlContains({ x: this.x, y: this.y })) {
			// we've moved our shape back to the corner
			this.dragCancel();
			return;
		}
		
		const node = scene.findNodeAt(this.x, this.y);
		const dragSuccess = (node && !node.tile);
		if (dragSuccess) {
			this.dropTile(node);
			scene.updateNextTile();
		}
		else {
			this.dragCancel();
		}
	}
}
