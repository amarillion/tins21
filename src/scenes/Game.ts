import { Grid, Node } from '../grid';
import Phaser from 'phaser';
import { pickOne } from '@amarillion/helixgraph/lib/random.js';
import { assert } from '@amarillion/helixgraph/lib/assert.js';
import { trackbackNodes } from '@amarillion/helixgraph/lib/pathFinding.js';
import { breadthFirstSearch } from '@amarillion/helixgraph';

import Mushroom from '../sprites/Mushroom.js';
import { TESSELATIONS } from '../tesselate';
import { TILES, initTiles, Tile } from '../tiles';
import { MAX_SCORE, SCALE, SCREENH, SCREENW } from '../constants.js';
import { ProgressBar } from '../sprites/progress-bar';
import DraggableTile from '../sprites/DraggableTile';
import { openDialog } from '../components/Dialog';
import { LEVELDATA } from '../levels';

const CONTROL_SIZE = 120;
const BAR_W = 100;
const BAR_H = 50;
const MARGIN = 5;

function initGrid(tesselation) {
	const { unitSize, links } = tesselation;
	
	const mw = Math.ceil(SCREENW / SCALE / unitSize[0]);
	const mh = Math.ceil(SCREENH / SCALE / unitSize[1]);
	
	// let mw = 8, mh = 4;
	const xco = 0;
	let yco = 0;

	const grid = new Grid(mw, mh); // TODO: infinite grid?

	for (let my = 0; my < mh; ++my) {
		let rowX = xco;
		for (let mx = 0; mx < mw; ++mx) {
			const unit = grid.get(mx, my);
			unit.addPrimitiveUnit(mx, my, rowX, yco, tesselation, SCALE);
			rowX += unitSize[0] * SCALE;
		}
		yco += unitSize[1] * SCALE;
	}

	grid.initLinks(links);

	return grid;
}

export class Game extends Phaser.Scene {

	constructor () {
		super({ key: 'GameScene' });
	}
	// init () {}
	// preload () {}

	debugPrimaryUnitRectangle(unit) {
		// render primary unit rectangle
		const rect = new Phaser.GameObjects.Rectangle(
			this, unit.xco, unit.yco, unit.unitSize[0] * SCALE, unit.unitSize[1] * SCALE
		);
		rect.isFilled = false;
		rect.isStroked = true;
		rect.setStrokeStyle(3.0, 0xAA8888, 1.0);
		this.bgLayer.add(rect);
		rect.setOrigin(0,0);
		console.log({ xco: unit.xco, yco: unit.yco, w: unit.unitSize[0], h: unit.unitSize[1], rect });
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
				this.bgLayer.add(poly);
				node.delegate = poly;
			}
			
		}
	
	}

	spriteLayer : Phaser.GameObjects.Layer;
	bgLayer: Phaser.GameObjects.Layer;
	tileLayer: Phaser.GameObjects.Layer;
	uiLayer: Phaser.GameObjects.Layer;

	score: number;
	level: number;

	grid: Grid;
	tileSet: Tile[];
	noDeadEnds: Tile[];
	startNode: Node;
	endNode: Node;
	solution: Node[];
	progressbar: ProgressBar;
	control: Phaser.GameObjects.Ellipse;
	nextTile: Tile;
	draggableTile: DraggableTile;
	uiBlocked: boolean;

	initGates() {
		this.startNode = this.findNodeAt(150, 150);
		this.setTile(this.startNode, this.tileSet[this.tileSet.length - 1]);
		const c1 = new Phaser.GameObjects.Ellipse(this, this.startNode.cx, this.startNode.cy, 10, 10, 0xFF0000, 1.0);
		this.spriteLayer.add(c1);

		this.endNode = this.findNodeAt(SCREENW - 150, SCREENH - 150);
		this.setTile(this.endNode, this.tileSet[this.tileSet.length - 1]);
		const c2 = new Phaser.GameObjects.Ellipse(this, this.endNode.cx, this.endNode.cy, 10, 10, 0x00FF00, 1.0);
		this.spriteLayer.add(c2);
	}

	initUI() {
		const control = new Phaser.GameObjects.Ellipse(this, SCREENW - (CONTROL_SIZE / 2), (CONTROL_SIZE / 2), CONTROL_SIZE - MARGIN, CONTROL_SIZE - MARGIN, 0x888888, 0.5);
		control.setStrokeStyle(2.0, 0x000000);
		this.control = control;
		this.uiLayer.add(control);

		this.progressbar = new ProgressBar({
			scene: this, layer: this.uiLayer,
			x: SCREENW - BAR_W - MARGIN, y: SCREENH - BAR_H - MARGIN,
			w: BAR_W, h: BAR_H
		});
	}

	initLevel() {
		this.children.removeAll(); // was: this.add.displayList.removeAll
		
		this.bgLayer = this.add.layer();
		this.bgLayer.setDepth(0);
		this.tileLayer = this.add.layer();
		this.tileLayer.setDepth(1);
		this.spriteLayer = this.add.layer();
		this.spriteLayer.setDepth(2);
		this.uiLayer = this.add.layer();
		this.uiLayer.setDepth(3);
		
		this.score = 0;
		const levelData = LEVELDATA[this.level % LEVELDATA.length];
		const tesselation = TESSELATIONS[levelData.tesselation];

		this.grid = initGrid(tesselation);
		this.renderPolygons(this.grid);

		this.tileSet = TILES[tesselation.name];
		this.noDeadEnds = this.tileSet.filter(tile => !(tile.connectionMask in {0:0, 1:1, 2:2, 4:4, 8:8, 16:16, 32:32, 64:64}));

		this.initGates();

		this.initUI();

		this.updateNextTile();

		assert(this.startNode !== null);
		assert(this.endNode !== null);

	}

	endReached() {
		this.score++;
		this.progressbar.refresh(this.score, MAX_SCORE);

		if (this.score === MAX_SCORE) {
			openDialog('<h1>You won this level!</h1>', () => {
				this.uiBlocked = false;
				this.level++;
				this.initLevel();
			});
			this.uiBlocked = true;
		}
	}

	debugAdjacent(node) {
		node.delegate.isFilled = true;
		const adjacentList = Node.getAdjacent(node);
		for (let i = 0; i < adjacentList.length; ++i) {
			const adjacent = adjacentList[i][1];
			setTimeout(() => adjacent.delegate.isFilled = true, (i+2) * 200);
			setTimeout(() => adjacent.delegate.isFilled = false, (i+3) * 200);
		}
		setTimeout(() => node.delegate.isFilled = false, 100);
		console.log(`{ dx: ${node.mx - 1}, dy: ${node.my - 1}, idx: ${node.idx} },`);
	}

	addMonster() {
		const sprite = new Mushroom({
			scene: this,
			node: this.startNode,
			asset: Math.random() > 0.5 ? 'Fluff' : 'banana'
			// asset: 'alt-bun'
		});
		this.spriteLayer.add(sprite);
	}

	findNodeAt(xco, yco) {
		// TODO: check bounding box of unit as speed optimization...
		for (const unit of this.grid.eachNode()) {
			for (const node of unit.nodes) {
				if (!node.delegate) continue; // outside screen is undefined
				const delegate = node.delegate as Phaser.GameObjects.Polygon;
				if (Phaser.Geom.Polygon.Contains(delegate.geom, xco, yco)) {
					return node;
				}
			}
		}
		return null;
	}

	setTile(node : Node, tile : Tile) {
		node.tile = tile;
		const img = new Phaser.GameObjects.Image(this, node.xco, node.yco, node.tile.resKey);
		img.setDisplayOrigin(tile.origin.x, tile.origin.y);
		img.rotation = node.element.rotation;
		node.tileImg = img;
		this.tileLayer.add(img);
		this.checkPath();
	}

	checkPath() {
		const prev = breadthFirstSearch(this.startNode, this.endNode, Node.getAdjacent);
		this.solution = trackbackNodes(this.startNode, this.endNode, prev);
		if (this.solution) {
			console.log(this.solution);
		}
	}

	updateNextTile() {
		this.nextTile = pickOne(this.noDeadEnds);

		if (this.draggableTile) {
			this.draggableTile.destroy();
		}

		this.draggableTile = new DraggableTile({
			scene: this, 
			x: SCREENW - (CONTROL_SIZE / 2),
			y: (CONTROL_SIZE / 2),
			tile: this.nextTile
		});
		this.uiLayer.add(this.draggableTile);
	}

	create () {
		// make tile variants
		this.level = 0;
		this.uiBlocked = false;
		initTiles(this);

		this.time.addEvent({ delay: 1000, callback: () => this.addMonster(), loop: true });
	
		this.initLevel();
		
		this.input.on('pointerdown', (pointer) => {
			/*
			const node = this.findNodeAt(pointer.x, pointer.y);
			if (node && !node.tile) {
				assert(!!this.nextTile);
				this.setTile(node, this.nextTile);
				this.updateNextTile();
				// this.debugAdjacent(node);
			}
			*/
			this.onDown(pointer);
		});
		this.input.on('pointermove', (pointer) => this.onMove(pointer));
		this.input.on('pointerup', (pointer) => this.onRelease(pointer));
	}

	dragTarget : DraggableTile;

	onDown(pointer) {
		/**
		 * Phaser annoyance: the geom of an ellipse object does not have the translation information
		 *  needed to convert to screen coordinates.
		 * 
		 * Therefore there is no straightforward way to check if an ellipse object overlaps with the mouse pointer -
		 * you need to do an error-prone translation first
		 */
		const xx = pointer.x - this.control.x + this.control.displayOriginX;
		const yy = pointer.y - this.control.y + this.control.displayOriginY;
		const contains = Phaser.Geom.Ellipse.Contains(this.control.geom, xx, yy);
		if (contains) {
			this.dragTarget = this.draggableTile;
		}
	}

	onMove(pointer) {
		if (this.dragTarget) {
			this.dragTarget.x = pointer.x;
			this.dragTarget.y = pointer.y;
		}
	}

	onRelease(pointer) {
		if (!this.dragTarget) return;

		const node = this.findNodeAt(pointer.x, pointer.y);
		const dragSuccess = (node && !node.tile);
		if (dragSuccess) {
			this.setTile(node, this.nextTile);
			this.updateNextTile();
		}
		else {
			this.tweens.add({
				targets: [ this.dragTarget ],
				duration: 200,
				x: this.control.x,
				y: this.control.y
			});
		}
		this.dragTarget = null;
	}

}
