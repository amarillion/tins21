import { Grid, Node } from '../grid.js';
import Phaser from 'phaser';

import Mushroom from '../sprites/Mushroom.js';
import { getCairoTesselation, getDiamondTesselation, getHexagonalTesselation, getSquareTesselation, getTriangleTesselation, TESSELATIONS } from '../tesselate.js';

const SCREENH = 600;
const SCREENW = 800;
const SCALE = 64;

function initGrid(tesselation) {
	const { unitSize, links } = tesselation;
	
	// const mw = Math.ceil(SCREENW / unitSize[0]);
	// const mh = Math.ceil(SCREENH / unitSize[1]);
	// let xco = 0;
	// let yco = 0;
	
	let mw = 3, mh = 3, xco = 0, yco = 0;

	const grid = new Grid(mw, mh); // TODO: infinite grid?

	for (let my = 0; my < mh; ++my) {
		let secondX = xco;
		let secondY = yco;
		for (let mx = 0; mx < mw; ++mx) {
			const unit = grid.get(mx, my);
			unit.addPrimitiveUnit(mx, my, secondX, secondY, tesselation, SCALE)
			secondX += unitSize[0] * SCALE;
		}
		yco += unitSize[1] * SCALE;
	}

	grid.initLinks(links);

	return grid;
}

export default class extends Phaser.Scene {
	constructor () {
		super({ key: 'GameScene' });
	}
	init () {}
	preload () {}

	renderPolygons(grid) {

		for (const unit of grid.eachNode()) {
			const rect = new Phaser.GameObjects.Rectangle(
				this, unit.xco, unit.yco, unit.unitSize[0] * SCALE, unit.unitSize[1] * SCALE
			);
			rect.isFilled = false;
			rect.isStroked = true;
			rect.setStrokeStyle(3.0, 0xAA8888, 1.0);
			this.add.existing(rect);
			rect.setOrigin(0,0);
			console.log({ xco: unit.xco, yco: unit.yco, w: unit.unitSize[0], h: unit.unitSize[1], rect })

			for (const node of unit.nodes) {
				const { points } = node;
				const poly = new Phaser.GameObjects.Polygon(
					this, 
					0, 0,
					points,
					0, 1.0
				);
				poly.setOrigin(0,0);
				// const rect = poly.getBounds();
				// if (rect.bottom < 0 || rect.top > SCREENH || rect.right < 0 || rect.left > SCREENW) continue;
		
				poly.isFilled = false;
				poly.isStroked = true;
				poly.setStrokeStyle(3.0, 0xA0A0A0, 1.0);
				this.add.existing(poly);
				node.delegate = poly;
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

		const tesselation = TESSELATIONS.HEXAGONAL;
		this.grid = initGrid(tesselation);
		this.renderPolygons(this.grid);

		this.input.on('pointerdown', (pointer) => {
			for (const unit of this.grid.eachNode()) {
				for (const node of unit.nodes) {
					if (!node.delegate) continue; // outside screen is undefined
					if (Phaser.Geom.Polygon.Contains(node.delegate.geom, pointer.x, pointer.y)) {
						node.delegate.isFilled = true;
						const adjacentList = Node.getAdjacent(node)
						for (let i = 0; i < adjacentList.length; ++i) {
							const adjacent = adjacentList[i][1];
							setTimeout(() => adjacent.delegate.isFilled = true, (i+1) * 100);
							setTimeout(() => adjacent.delegate.isFilled = false, (i+2) * 100);
						}
						setTimeout(() => node.delegate.isFilled = false, 100);
						console.log(`{ dx: ${node.mx - 1}, dy: ${node.my - 1}, idx: ${node.idx} },`);
					}
				}
			}
		});

	}
}
