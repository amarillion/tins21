import Phaser from 'phaser';

import { TESSELATIONS } from './tesselate';
import { transform, translate, scale, applyToPoints, rotate, applyToPoint } from 'transformation-matrix';
import { SCALE } from './constants.js';
import { centerOfMass, Point } from './util/geometry';

export type Tile = {
	resKey: string,
	connectionMask: number;

	/* position that equals 0,0 position of a unit in the grid */
	origin: Point;

	/* center of mass */
	center: Point
}

export const TILES : Record<string, Tile[]> = {};

export function initTiles(scene) {
	for (const tesselation of Object.values(TESSELATIONS)) {
		TILES[tesselation.name] = [];
		for (let i = 0; i < Math.pow(2, tesselation.sides); ++i) {
			createTile(scene, tesselation, i);
		}
	}
}

function boundingBox(points : Point[]) {
	return {
		top : Math.min(...points.map(p => p.y)),
		left : Math.min(...points.map(p => p.x)),
		bottom : Math.max(...points.map(p => p.y)),
		right : Math.max(...points.map(p => p.x)),
	};
}

function createTile(scene, tesselation, connectionMask) {
	const resKey = `tile-${tesselation.name}-${connectionMask}`;
	const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

	const { points } = tesselation;
	const cc = centerOfMass(points);

	const MARGIN = 8;
	const bbox = boundingBox(points);
	const ox = (-bbox.left * SCALE) + MARGIN;
	const oy = (-bbox.top * SCALE) + MARGIN;

	const w = (bbox.right - bbox.left) * SCALE + 2 * MARGIN;
	const h = (bbox.bottom - bbox.top) * SCALE + 2 * MARGIN;
	renderTile(graphics, ox, oy, tesselation, connectionMask, 0x44aa44, 0x338833, 0xCCCC88);
	graphics.generateTexture(resKey, w, h);
	

	TILES[tesselation.name][connectionMask] = {
		resKey,
		connectionMask,
		origin: { 
			x: ox, y: oy
		},
		center: {
			x: ox + (cc.x * SCALE), y: oy + (cc.y * SCALE)
		}
	};
}

function renderTile(graphics, ox, oy, tesselation, connectionMask, fillColor, outlineColor, pathColor) {
	const { points, links, primitiveUnit, unitSize } = tesselation;
	const cc = centerOfMass(points);
	
	const srcMatrix = transform(
		translate(ox, oy),
		scale(SCALE, SCALE),
	);

	// transformation-matrix annoyance: type definition does not account for the fact that output type is the same as input type
	// this makes it impossible to pass the result to Phaser.Geom.Polygon without typecast.
	const tPoints = applyToPoints(srcMatrix, points); 
	const polygon = new Phaser.Geom.Polygon(tPoints as Phaser.Types.Math.Vector2Like[]);

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
		const src = applyToPoint(srcMatrix, cc);
		const target = applyToPoint(destMatrix, cc);	
		graphics.lineBetween(src.x, src.y, (target.x + src.x) / 2, (target.y + src.y) / 2);
	}

	graphics.lineStyle(3.0, outlineColor);
	graphics.strokePoints(polygon.points, true);
}
