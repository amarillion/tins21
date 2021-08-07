import { Grid, Node } from '../grid.ts';
import Phaser from 'phaser';
import { pickOne } from '@amarillion/helixgraph/lib/random.js';
import { assert } from '@amarillion/helixgraph/lib/assert.js';
import { trackbackNodes } from '@amarillion/helixgraph/lib/pathFinding.js';
import { breadthFirstSearch } from '@amarillion/helixgraph';

import Mushroom from '../sprites/Mushroom.js';
import { getCairoTesselation, getDiamondTesselation, getHexagonalTesselation, getSquareTesselation, getTriangleTesselation, TESSELATIONS } from '../tesselate.js';
import { TILES, initTiles } from '../tiles.js';
import { MAX_SCORE, SCALE, SCREENH, SCREENW } from '../config.js';

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

	initLevel() {
		this.add.displayList.removeAll();

		this.score = 0;

		const tesselList = Object.values(TESSELATIONS);
		const tesselation = tesselList[this.level % tesselList.length];

		this.grid = initGrid(tesselation);
		this.renderPolygons(this.grid);

		const tileSet = TILES[tesselation.name];

		this.noDeadEnds = tileSet.filter(tile => !(tile.connectionMask in {0:0, 1:1, 2:2, 4:4, 8:8, 16:16, 32:32, 64:64}));

		this.startNode = this.findNodeAt(150, 150);
		this.setTile(this.startNode, tileSet[tileSet.length - 1]);
		this.add.circle(150, 150, 10, 0xFF0000, 1.0);

		this.endNode = this.findNodeAt(SCREENW - 150, SCREENH - 150);
		this.setTile(this.endNode, tileSet[tileSet.length - 1]);
		this.add.circle(SCREENW - 150, SCREENH - 150, 10, 0x00FF00, 1.0);

		assert(this.startNode);
		assert(this.endNode);

	}

	endReached() {
		this.score++;
		if (this.score > MAX_SCORE) {
			alert("You won this level!");
			this.level++;
			this.initLevel();
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
			setTimeout(() => adjacent.delegate.isFilled = true, (i+2) * 200);
			setTimeout(() => adjacent.delegate.isFilled = false, (i+3) * 200);
		}
		setTimeout(() => node.delegate.isFilled = false, 100);
		console.log(`{ dx: ${node.mx - 1}, dy: ${node.my - 1}, idx: ${node.idx} },`);
	}

	addMonster() {
		this.mushroom = new Mushroom({
			scene: this,
			node: this.startNode,
			asset: 'mushroom'
		});
		this.add.existing(this.mushroom);
	}

	findNodeAt(xco, yco) {
		// TODO: check bounding box of unit as speed optimization...
		for (const unit of this.grid.eachNode()) {
			for (const node of unit.nodes) {
				if (!node.delegate) continue; // outside screen is undefined
				if (Phaser.Geom.Polygon.Contains(node.delegate.geom, xco, yco)) {
					return node;
				}
			}
		}
		return null;
	}

	setTile(node, tile) {
		node.tile = tile
		node.tileImg = this.add.image(node.xco, node.yco, node.tile.resKey);
		node.tileImg.rotation = node.element.rotation;
		this.checkPath();
	}

	checkPath() {
		const prev = breadthFirstSearch(this.startNode, this.endNode, Node.getAdjacent);
		this.solution = trackbackNodes(this.startNode, this.endNode, prev);
		if (this.solution) {
			console.log(this.solution);
		}
	}

	create () {
		// make tile variants
		this.level = 0;
		initTiles(this);

		this.time.addEvent({ delay: 1000, callback: () => this.addMonster(), loop: true });
	
		this.initLevel();
		
		this.input.on('pointerdown', (pointer) => {
			const node = this.findNodeAt(pointer.x, pointer.y);
			if (node) {
				const tile = pickOne(this.noDeadEnds); 
				this.setTile(node, tile);
				// this.debugAdjacent(node);
			}
		});
	}
}
