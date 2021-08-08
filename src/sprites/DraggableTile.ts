import Phaser from 'phaser';
import { Tile } from '../tiles';
import { Game } from '../scenes/Game';
import { Point } from '../util/geometry';
import { getRotationUnits, rotateMaskRight } from '../tileUtil';

export default class extends Phaser.GameObjects.Sprite {
	
	scene: Game;
	grabPoint: Point;
	target: Point;

	debugGraphics: Phaser.GameObjects.Graphics;

	constructor ({ scene, x, y, tile } : { scene: Game, x: number, y : number, tile: Tile }) {
		super(scene, x, y, tile.resKey);
		this.grabPoint = null;
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
		this.x = pointer.x;
		this.y = pointer.y;		
	}

	rotateLeft() {
		const sides = this.scene.tesselation.sides;
		this.rotation -= (Math.PI * 2 / sides);
	}

	rotateRight() {
		const sides = this.scene.tesselation.sides;
		this.rotation += (Math.PI * 2 / sides);
	}

	dragRelease( pointer ) {
		const scene = this.scene;
		const node = scene.findNodeAt(this.x, this.y);
		const dragSuccess = (node && !node.tile);
		if (dragSuccess) {
			// round rotation to nearest unit angle...
			const sides = this.scene.tesselation.sides; //TODO: depends on tesselation
			const rotationStep = getRotationUnits(this.rotation, sides);
			const connectionMask = rotateMaskRight(scene.nextTile.connectionMask, rotationStep, sides);
			
			// find rotated tile...
			scene.setTile(node, scene.tileSet[connectionMask]);
			scene.updateNextTile();
		}
		else {
			scene.tweens.add({
				targets: [ this ],
				duration: 200,
				x: scene.control.x,
				y: scene.control.y
			});
		}
	}
}
