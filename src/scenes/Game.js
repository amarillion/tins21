import { Grid, Node } from '../grid.js';
import Phaser from 'phaser';
import { pickOne } from '@amarillion/helixgraph/lib/random.js';

import Mushroom from '../sprites/Mushroom.js';
import { getCairoTesselation, getDiamondTesselation, getHexagonalTesselation, getSquareTesselation, getTriangleTesselation, TESSELATIONS } from '../tesselate.js';
import { TILES, initTiles } from '../tiles.js';

const SCREENH = 600;
const SCREENW = 800;
const SCALE = 64;

function initGrid(tesselation) {
	const { unitSize, links } = tesselation;
	
	const mw = Math.ceil(SCREENW / SCALE / unitSize[0]);
	const mh = Math.ceil(SCREENH / SCALE / unitSize[1]);
	
	// let mw = 8, mh = 4;
	let xco = 0, yco = 0;

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

	debugPrimaryUnitRectangle(unit) {
		// render primary unit rectangle
		const rect = new Phaser.GameObjects.Rectangle(
			this, unit.xco, unit.yco, unit.unitSize[0] * SCALE, unit.unitSize[1] * SCALE
		);
		rect.isFilled = false;
		rect.isStroked = true;
		rect.setStrokeStyle(3.0, 0xAA8888, 1.0);
		this.add.existing(rect);
		rect.setOrigin(0,0);
		console.log({ xco: unit.xco, yco: unit.yco, w: unit.unitSize[0], h: unit.unitSize[1], rect })
	}

	renderPolygons(grid) {

		for (const unit of grid.eachNode()) {

			/*
			this.debugPrimaryUnitRectangle(unit);
			*/

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

	createTilesPreview() {
		const startx = 64, starty = 64;
		let xco = startx;
		let yco = starty;
		
		for (const imgKey of TILES.DIAMOND) {
			// const imgKey = pickOne(TILES.CAIRO)
			console.log(imgKey);
			this.add.image(xco, yco, imgKey);
			xco += 128;
			if (xco > SCREENW) {
				yco += 128;
				xco = startx;
			}
		}
	}

	debugAdjacent(node) {
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

	create () {
		// make tile variants
		initTiles(this);

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

		const tesselation = TESSELATIONS.CAIRO;
		this.grid = initGrid(tesselation);
		this.renderPolygons(this.grid);

		this.input.on('pointerdown', (pointer) => {
			for (const unit of this.grid.eachNode()) {
				for (const node of unit.nodes) {
					if (!node.delegate) continue; // outside screen is undefined
					if (Phaser.Geom.Polygon.Contains(node.delegate.geom, pointer.x, pointer.y)) {
						// this.debugAdjacent(node);
						const resKey = pickOne(TILES[tesselation.name]);
						const tile = this.add.image(node.xco, node.yco, resKey);
						tile.rotation = node.element.rotation;
					}
				}
			}
		});

	}
}
