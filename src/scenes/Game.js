import Phaser from 'phaser';

import Mushroom from '../sprites/Mushroom.js';
import { getCairoTesselation, getDiamondTesselation, getHexagonalTesselation, getSquareTesselation, getTriangleTesselation } from '../tesselate.js';

export default class extends Phaser.Scene {
	constructor () {
		super({ key: 'GameScene' });
	}
	init () {}
	preload () {}

	renderTesselation(tesselation) {
		const SCREENH = 600;
		const SCREENW = 800;

		const { shape, offset, primitiveUnit } = tesselation;

		const scaledShape = [];

		const SCALE = 64;
		for (let i = 0; i < shape.length; ++i) {
			scaledShape[i] = shape[i] * SCALE;
		}

		const createPrimitiveUnit = (xco, yco) => {
			let i = 0;
			for (const element of primitiveUnit) {
				const poly = new Phaser.GameObjects.Polygon(
					this, 
					xco + element.x * SCALE, yco + element.y * SCALE, 
					scaledShape,
					0, 1.0
				);
				const rect = poly.getBounds();
				if (rect.top < 0 || rect.bottom > SCREENH || rect.left < 0 || rect.right > SCREENW) continue;

				poly.isFilled = false;
				poly.isStroked = true;
				poly.setStrokeStyle(3.0, 0x808080, 1.0);
				poly.rotation = element.rotation;
				this.add.existing(poly);
			}
		}

		let xco = 0;
		let yco = 0;
		let y = 0;
		while (yco < SCREENH) {
			y++;
			if (y % 2) {
				xco -= offset[2] * SCALE;
				yco -= offset[3] * SCALE;
			}
			let secondX = xco;
			let secondY = yco;
			while (secondX < SCREENW) {
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

		const t = getHexagonalTesselation();
		this.renderTesselation(t);

	}
}
