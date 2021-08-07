import { Grid, Node } from '../grid.js';
import Phaser from 'phaser';

import Mushroom from '../sprites/Mushroom.js';
import { getCairoTesselation, getDiamondTesselation, getHexagonalTesselation, getSquareTesselation, getTriangleTesselation, TESSELATIONS } from '../tesselate.js';
import { transform, translate, scale, applyToPoints, rotate, applyToPoint } from 'transformation-matrix';

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

function createTile(scene, tesselation, connectionMask) {
	const resKey = `tile-${tesselation.name}-${connectionMask}`
	const graphics = scene.make.graphics({ x: 0, y: 0, add: false });
	const w = 4 * SCALE;
	const h = 4 * SCALE;
	renderTile(scene, graphics, w / 2, h / 2, tesselation, connectionMask);
	graphics.generateTexture(resKey, w, h);
	return resKey;
}

function renderTile(scene, graphics, ox, oy, tesselation, connectionMask) {
	const { points, sides, pathLen, links, primitiveUnit, unitSize } = tesselation;
	let ccx = points.reduce((prev, cur) => prev + cur.x, 0) / points.length;
	let ccy = points.reduce((prev, cur) => prev + cur.y, 0) / points.length;
	
	const matrix = transform(
		translate(ox, oy),
		scale(SCALE, SCALE),
	);
	const tPoints = applyToPoints(matrix, points);
	const polygon = new Phaser.Geom.Polygon(tPoints);

	graphics.fillStyle(0x44aa44);
	graphics.fillPoints(polygon.points, true);

	// draw paths
	const primary = links[0];
	for (const { dx, dy, idx } of primary) {
		graphics.lineStyle(8.0, 0xCCCC88);
		console.log({ dx, dy, idx, primitiveUnit });
		const targetUnit = primitiveUnit[idx];
		const xx = dx * unitSize[0] + targetUnit.x;
		const yy = dy * unitSize[1] + targetUnit.y;

		const matrix2 = transform(
			translate(ox, oy),
			scale(SCALE, SCALE),
			translate(xx, yy),
			rotate(targetUnit.rotation)
		);
		const src = applyToPoint(matrix, { x: ccx, y: ccy });
		const target = applyToPoint(matrix2, { x: ccx, y: ccy });	
		graphics.lineBetween(src.x, src.y, (target.x + src.x) / 2, (target.y + src.y) / 2);
		// const dx = Math.cos(Math.PI * 2 * i / sides);
		// const dy = Math.sin(Math.PI * 2 * i / sides);
		// graphics.lineBetween(cx, cy, cx + dx * pathLen * SCALE, cy + dy * pathLen * SCALE);
	}

	graphics.lineStyle(3.0, 0x338833);
	graphics.strokePoints(polygon.points, true);

	/*
	const shape = scene.make.graphics({ add: false });
	//  Create a hash shape Graphics object
	shape.fillStyle(0xffffff);
	//  You have to begin a path for a Geometry mask to work
	graphics.fillPoints(polygon.points, true);
	const mask = shape.createGeometryMask();
	graphics.setMask(mask);
	*/


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

		/*
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
		*/

		
	
		// make tile variants

		const startx = 64, starty = 64;
		let xco = startx;
		let yco = starty;
		
		for (const tesselation of Object.values(TESSELATIONS)) {

			for (let i = 0; i < 1; ++i) {
				const imgKey = createTile(this, tesselation, i);
				console.log(imgKey);
				const image = this.add.image(xco, yco, imgKey);
				xco += 128;
				if (xco > SCREENW) {
					yco += 128;
					xco = startx;
				}
			}
		}
	}
}
