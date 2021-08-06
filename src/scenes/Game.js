import Phaser from 'phaser';

import Mushroom from '../sprites/Mushroom.js';
import { getCairoTesselation, getDiamondTesselation, getHexagonalTesselation, getSquareTesselation, getTriangleTesselation } from '../tesselate.js';

const SCREENH = 600;
const SCREENW = 800;
const SCALE = 64;

function initGrid(tesselation) {
	const grid = [];

	const { offset, primitiveUnit } = tesselation;

	const createPrimitiveUnit = (xco, yco) => {
		let i = 0;
		const elements = [];
		for (const element of primitiveUnit) {
			elements.push({ xco, yco, element });
		}
		return elements;
	}

	let xco = 0;
	let yco = 0;
	while (yco < SCREENH) {
		let secondX = xco;
		let secondY = yco;
		while (secondX < SCREENW) {
			const elements = createPrimitiveUnit(secondX, secondY);
			grid.push(elements);
			secondX += offset[2] * SCALE;
		}
		yco += offset[1] * SCALE;
	}

	return grid;
}

export default class extends Phaser.Scene {
	constructor () {
		super({ key: 'GameScene' });
	}
	init () {}
	preload () {}

	renderPolygons(grid, tesselation) {

		const { shape } = tesselation;
		const scaledShape = [];

		for (let i = 0; i < shape.length; ++i) {
			scaledShape[i] = shape[i] * SCALE;
		}

		for (const cell of grid) {
			for (const { xco, yco, element } of cell) {
				const poly = new Phaser.GameObjects.Polygon(
					this, 
					xco + element.x * SCALE, yco + element.y * SCALE, 
					scaledShape,
					0, 1.0
				);
				const rect = poly.getBounds();
				if (rect.bottom < 0 || rect.top > SCREENH || rect.right < 0 || rect.left > SCREENW) continue;
		
				poly.isFilled = false;
				poly.isStroked = true;
				poly.setStrokeStyle(3.0, 0xA0A0A0, 1.0);
				poly.rotation = element.rotation;
				this.add.existing(poly);
			}
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

		const tesselation = getHexagonalTesselation();
		this.grid = initGrid(tesselation);
		this.renderPolygons(this.grid, tesselation);

	}
}
