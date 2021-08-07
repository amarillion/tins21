import Phaser from 'phaser';

import { TESSELATIONS } from './tesselate.js';
import { transform, translate, scale, applyToPoints, rotate, applyToPoint } from 'transformation-matrix';
import { SCALE } from './config.js';

export const TILES = {};
export function initTiles(scene) {
	for (const tesselation of Object.values(TESSELATIONS)) {
		TILES[tesselation.name] = [];
		for (let i = 0; i < Math.pow(2, tesselation.sides); ++i) {
			createTile(scene, tesselation, i);
		}
	}
}

function createTile(scene, tesselation, connectionMask) {
	const resKey = `tile-${tesselation.name}-${connectionMask}`
	const graphics = scene.make.graphics({ x: 0, y: 0, add: false });
	const w = 4 * SCALE;
	const h = 4 * SCALE;
	renderTile(graphics, w / 2, h / 2, tesselation, connectionMask, 0x44aa44, 0x338833, 0xCCCC88);
	graphics.generateTexture(resKey, w, h);

	TILES[tesselation.name][connectionMask] = {
		resKey,
		connectionMask
	}
}

function renderTile(graphics, ox, oy, tesselation, connectionMask, fillColor, outlineColor, pathColor) {
	const { points, links, primitiveUnit, unitSize } = tesselation;
	let ccx = points.reduce((prev, cur) => prev + cur.x, 0) / points.length;
	let ccy = points.reduce((prev, cur) => prev + cur.y, 0) / points.length;
	
	const srcMatrix = transform(
		translate(ox, oy),
		scale(SCALE, SCALE),
	);
	const tPoints = applyToPoints(srcMatrix, points);
	const polygon = new Phaser.Geom.Polygon(tPoints);

	graphics.fillStyle(fillColor);
	graphics.fillPoints(polygon.points, true);

	// draw paths
	const primary = links[0];
	let connectionBit = 1;
	for (const { dx, dy, idx } of primary) {
		if ((connectionMask & connectionBit) === 0) {
			connectionBit *= 2;
			continue;
		}
		connectionBit *= 2;

		graphics.lineStyle(8.0, pathColor);
		const destUnit = primitiveUnit[idx];
		const xx = dx * unitSize[0] + destUnit.x;
		const yy = dy * unitSize[1] + destUnit.y;

		const destMatrix = transform(
			translate(ox, oy),
			scale(SCALE, SCALE),
			translate(xx, yy),
			rotate(destUnit.rotation)
		);
		const src = applyToPoint(srcMatrix, { x: ccx, y: ccy });
		const target = applyToPoint(destMatrix, { x: ccx, y: ccy });	
		graphics.lineBetween(src.x, src.y, (target.x + src.x) / 2, (target.y + src.y) / 2);
	}

	graphics.lineStyle(3.0, outlineColor);
	graphics.strokePoints(polygon.points, true);
}
