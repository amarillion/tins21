#!/usr/bin/node

import { applyToPoints, rotate, scale, transform, translate } from 'transformation-matrix';
import { TESSELATIONS } from '../src/tesselate';

import { SCALE } from '../src/constants.js';

test('matrix tranformation', () => {
	
	const { points } = TESSELATIONS.DIAMOND;

	const xco = 200;
	const yco = 200;
	
	const element = {
		x: 0,
		y: 0,
		rotation: Math.PI * 2 / 3 // 120 degrees
	};
	
	const matrix = transform(
		translate(xco, yco),
		scale(SCALE, SCALE),
		translate(element.x, element.y),
		rotate(element.rotation),
	);
	
	const newPoints = applyToPoints(matrix, points);
	console.log(points, newPoints);
	expect(newPoints[0]).toEqual({ x: 200, y: 200 });
});
