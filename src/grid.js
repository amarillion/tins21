import BaseGrid from '@amarillion/helixgraph/lib/BaseGrid.js';
import {scale, rotate, translate, transform, applyToPoints } from 'transformation-matrix';

export class Node {

	constructor(mx, my, idx, xco, yco, element, points, SCALE) {
		this.mx = mx;
		this.my = my;
		this.idx = idx;
		this.unitXco = xco;
		this.unitYco = yco;
		this.xco = xco + element.x * SCALE;
		this.yco = yco + element.y * SCALE;
		const matrix = transform(
			translate(xco, yco),
			scale(SCALE, SCALE),
			translate(element.x, element.y),
			rotate(element.rotation),
		);
		this.points = applyToPoints(matrix, points);
		this.cx = this.points.reduce((prev, cur) => prev + cur.x, 0) / this.points.length;
		this.cy = this.points.reduce((prev, cur) => prev + cur.y, 0) / this.points.length;
		this.element = element;
		this.links = [];
	}

	toString() {
		return `unit [${this.mx} ${this.my}] index: ${this.idx}`
	}

	static getLinks(node) {
		return Object.entries(node.links);
	}

	static getAdjacent(node) {
		const connectionMask = node.tile && node.tile.connectionMask || 0;
		const links = Node.getLinks(node);
		let result = [];
		let bit = 1;
		for (let i = 0; i < links.length; ++i) {
			if ((connectionMask & bit) > 0) {
				result.push(links[i]);
			}
			bit *= 2;
		}
		return result;
	}

}

/** Unit combines all shapes in a primitive unit */
export class Unit {
	constructor(x, y, grid) {
		this.x = x;
		this.y = y;
		this.grid = grid;
		this.nodes = [];
	}

	push(node) {
		this.nodes.push(node);
	}

	addPrimitiveUnit(mx, my, secondX, secondY, tesselation, SCALE) {
		const { primitiveUnit, unitSize, points } = tesselation;
		let idx = 0;
		for (const element of primitiveUnit) {
			this.push(new Node(mx, my, idx++, secondX, secondY, element, points, SCALE));
		}
		this.xco = secondX;
		this.yco = secondY;
		this.unitSize = unitSize;

		// for (let i = 0; i < 2; i += 0.3) {
		// 	const element = {
		// 		x: 0, y: 0, rotation: i
		// 	};
		// 	this.push(new Node(secondX, secondY, element, points, SCALE));
		// }

	}

}

export class Grid extends BaseGrid {
	
	constructor(w, h) {
		super(w, h, (x, y, grid) => new Unit(x, y, grid));
	}

	initLinks(linksTemplate) {
		
		for (const unit of this.eachNode()) {
			let mx = unit.x;
			let my = unit.y;
			for (let l = 0; l < linksTemplate.length; ++l) {
				const node = unit.nodes[l];
				if (!node) continue;
				for (const { dx, dy, idx } of linksTemplate[l]) {
					const nx = mx + dx, ny = my + dy;
					const targetUnit = this.get(nx, ny);
					if (!targetUnit) continue;
					const targetNode = targetUnit.nodes[idx];
					node.links.push(targetNode);
					// console.log(`linked ${node} to ${targetNode}`);
				}
			}
		}

	}
}
