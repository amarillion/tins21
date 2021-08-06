import Phaser from 'phaser';

import Mushroom from '../sprites/Mushroom.js';
import { getTriangleTesselation } from '../tesselate.js';

export default class extends Phaser.Scene {
	constructor () {
		super({ key: 'GameScene' });
	}
	init () {}
	preload () {}

	renderTesselation(tesselation) {
		const { shape, offset, primitiveUnit } = tesselation;

		const scaledShape = [];

		const SCALE = 64;
		for (let i = 0; i < shape.length; ++i) {
			scaledShape[i] = shape[i] * SCALE;
		}

		const createPrimitiveUnit = (xco, yco) => {
			for (const element of primitiveUnit) {
				const poly = new Phaser.GameObjects.Polygon(
					this, 
					xco + element.x * SCALE, yco + element.y * SCALE, 
					scaledShape,
					0xFF0000, 1.0
				);
				poly.isFilled = false;
				poly.isStroked = true;
				poly.setStrokeStyle(2.0, 0x000000, 1.0);
				poly.rotation = element.rotation;
				this.add.existing(poly);
			}
		}

		let xco = 100;
		let yco = 100;
		for (let x = 0; x < 5; ++x) {
			let secondX = xco;
			let secondY = yco;
			for (let y = 0; y < 5; ++y) {
				createPrimitiveUnit(secondX, secondY);
				secondX += offset[2] * SCALE;
				secondY += offset[3] * SCALE;
			}
			xco += offset[0] * SCALE;
			yco += offset[1] * SCALE;
		}

	}

	create () {

		// this.mushroom = new Mushroom({
		// 	scene: this,
		// 	x: 400,
		// 	y: 300,
		// 	asset: 'mushroom'
		// });

		// this.add.existing(this.mushroom);
		// this.add.text(100, 100, 'Phaser 3 - ES6 - Webpack ', {
		// 	font: '64px Bangers',
		// 	fill: '#7744ff'
		// });

		const t = getTriangleTesselation();
		this.renderTesselation(t);

	}
}
