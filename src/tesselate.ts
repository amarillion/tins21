const SIN60 = Math.sqrt(0.75);
const PI = Math.PI;

export type PrimitiveUnitPart = {x: number, y: number, rotation: number};

export type TesselationType = {
	points: Array<{x: number, y: number}>;
	primitiveUnit: Array<PrimitiveUnitPart>;
	name: string;
	unitSize: [number, number];
	links: Array<Array<{ dx: number, dy: number, idx: number }>>
	sides: number,
	
	/** Rotational symmetry: how many fold symmetry does our shape have */
	symmetry: number

	/** how many times should you press L or R to go a full circle? */
	rotationSteps: number
};

function getTriangleTesselation() : TesselationType  {
	const points = [
		{x: 0, y: 0      },
		{x: 1, y: 2*SIN60},
		{x: 2, y: 0      },
	];
	const primitiveUnit = [
		{ x: 0,  y: 0, rotation: 0 },
		{ x: 1,  y: 2*SIN60, rotation: PI },
		{ x: -1, y: 2*SIN60, rotation: 0 },
		{ x: 2,  y: 4*SIN60, rotation: PI }
	];
	const links = [
		[
			{ dx: 0, dy: -1, idx: 3 },
			{ dx: 1, dy: 0, idx: 1 },
			{ dx: 0, dy: 0, idx: 1 },
		], [
			{ dx: 0, dy: 0, idx: 2 },
			{ dx: -1, dy: 0, idx: 0 },
			{ dx: 0, dy: 0, idx: 0 },
		], [
			{ dx: 0, dy: 0, idx: 1 },
			{ dx: 0, dy: 0, idx: 3 },
			{ dx: -1, dy: 0, idx: 3 },
		], [
			{ dx: 0, dy: 1, idx: 0 },
			{ dx: 0, dy: 0, idx: 2 },
			{ dx: 1, dy: 0, idx: 2 },
		]
	];
	return {
		points,
		primitiveUnit,
		unitSize : [ 2, 4 * SIN60 ],
		links,
		name: 'TRIANGULAR',
		sides: 3,
		symmetry: 3,
		rotationSteps: 6
	};
}

function getSquareTesselation() : TesselationType {
	const points = [
		{x: 0, y: 0 },
		{x: 1.5, y: 0 },
		{x: 1.5, y: 1.5 },
		{x: 0, y: 1.5 },
	];
	const primitiveUnit = [
		{ x: 0, y: 0, rotation: 0 }
	];
	const links = [
		// first elt
		[
			{ dx: 0, dy: -1, idx: 0 }, // north
			{ dx: 1, dy:  0, idx: 0 }, // east
			{ dx: 0, dy:  1, idx: 0 }, // south
			{ dx: -1,dy:  0, idx: 0 }, // west
		]
	];
	return {
		points,
		primitiveUnit,
		unitSize : [ 1.5, 1.5 ], 
		links,
		name: 'SQUARE',
		sides: 4,
		symmetry: 4,
		rotationSteps: 4
	};
}

function getHexagonalTesselation() : TesselationType  {	
	const points = [
		{ x: 0,       y: 0   }, 
		{ x: 0,       y: 1   }, 
		{ x: SIN60,   y: 1.5 }, 
		{ x: 2*SIN60, y: 1   }, 
		{ x: 2*SIN60, y: 0   }, 
		{ x: SIN60,   y: -0.5},
	];
	const primitiveUnit = [
		{ x: 0, y: 0, rotation: 0 },
		{ x: -SIN60, y: 1.5, rotation: 0 },
	];
	const links = [
		// first elt
		[
			{ dx:  1, dy: -1, idx: 1 }, // NE
			{ dx:  1, dy:  0, idx: 0 }, // E
			{ dx:  1, dy:  0, idx: 1 }, // SE
			{ dx:  0, dy:  0, idx: 1 }, // SW
			{ dx: -1, dy:  0, idx: 0 }, // W
			{ dx: 0,  dy: -1, idx: 1 }, // NW
		],
		// second elt
		[
			{ dx:  0, dy: 0, idx: 0 }, // NE
			{ dx:  1, dy: 0, idx: 1 }, // E
			{ dx:  0, dy: 1, idx: 0 }, // SE
			{ dx: -1, dy: 1, idx: 0 }, // SW
			{ dx: -1, dy: 0, idx: 1 }, // W
			{ dx: -1, dy: 0, idx: 0 }, // NW
		]
	];
	return {
		points,
		primitiveUnit,
		unitSize : [ 2*SIN60, 3 ],
		links,
		name: 'HEXAGONAL',
		sides: 6,
		symmetry: 6,
		rotationSteps: 6
	};
}

function getDiamondTesselation() : TesselationType {
	const points = [
		{x: 0, y:  0 },
		{x: 0, y:  1 },
		{x: SIN60, y:  1.5 },
		{x: SIN60, y:  0.5 },
	];
	const primitiveUnit = [
		{ x: 0,                  y: 0, rotation: 0 },
		{ x: 2*SIN60,            y: 0, rotation: PI * 2 / 3 },
		{ x: SIN60,              y: 1.5, rotation: PI * 4 / 3 },

		{ x: -SIN60,             y: 1.5, rotation: 0 },
		{ x: SIN60,              y: 1.5, rotation: PI * 2 / 3 },
		{ x: 0,                  y: 3, rotation: PI * 4 / 3 },
	];
	const links = [
		[
			{ dx: 0, dy: 0, idx: 1 },
			{ dx: 0, dy: 0, idx: 2 },
			{ dx: 0, dy: 0, idx: 4 },
			{ dx: -1, dy: 0, idx: 2 },
		],[
			{ dx: 0, dy: 0, idx: 2 },
			{ dx: 0, dy: 0, idx: 0 },
			{ dx: 0, dy: -1, idx: 5 },
			{ dx: 1, dy: -1, idx: 3 },
		],[
			{ dx: 0, dy: 0, idx: 0 },
			{ dx: 0, dy: 0, idx: 1 },
			{ dx: 1, dy: 0, idx: 0 },
			{ dx: 1, dy: 0, idx: 4 },
		],[
			{ dx: 0, dy: 0, idx: 4 },
			{ dx: 0, dy: 0, idx: 5 },
			{ dx: -1, dy: 1, idx: 1 },
			{ dx: -1, dy: 0, idx: 5 },
		],[
			{ dx: 0, dy: 0, idx: 5 },
			{ dx: 0, dy: 0, idx: 3 },
			{ dx: -1, dy: 0, idx: 2 },
			{ dx: 0, dy: 0, idx: 0 },
		],[
			{ dx: 0, dy: 0, idx: 3 },
			{ dx: 0, dy: 0, idx: 4 },
			{ dx: 1, dy: 0, idx: 3 },
			{ dx: 0, dy: 1, idx: 1 },
		]
	];
	return {
		points,
		primitiveUnit,
		unitSize : [ 2*SIN60, 3 ],
		links,
		name: 'DIAMOND',
		sides: 4,
		symmetry: 2,
		rotationSteps: 6
	};
}

function getCairoTesselation(): TesselationType  {
	const points = [
		{ x: 0,         y: 0 },
		{ x: SIN60,     y: 0.5 },
		{ x: SIN60-0.5, y: SIN60+0.5 },
		{ x: 0.5-SIN60, y: SIN60+0.5 },
		{ x: -SIN60,    y: 0.5 },
	];

	const H = 0.5 + SIN60;
	const B = SIN60 - 0.5;
	const primitiveUnit = [
		{ x: 0,            y: 0,         rotation: 0 },
		{ x: -B,           y: H,         rotation: PI*0.5 },
		{ x: 0,            y: 2*H,       rotation: PI },
		{ x: B,            y: H, rotation: PI*1.5 },

		{ x: 2*SIN60 + 0,  y: 2 * SIN60 + 0,         rotation: 0 },
		{ x: 2*SIN60 + -B, y: 2 * SIN60 + H,         rotation: PI*0.5 },
		{ x: 2*SIN60 + 0,  y: 2 * SIN60 + 2*H,       rotation: PI },
		{ x: 2*SIN60 + B,  y: 2 * SIN60 + H, rotation: PI*1.5 },
	];

	const links = [
		[ // 0
			{ dx: 0, dy: -1, idx: 5 },
			{ dx: 0, dy: 0, idx: 3 },
			{ dx: 0, dy: 0, idx: 2 },
			{ dx: 0, dy: 0, idx: 1 },
			{ dx: -1, dy: -1, idx: 7 },
		], [ // 1 
			{ dx: 0, dy: 0, idx: 2 },
			{ dx: -1, dy: 0, idx: 4 },
			{ dx: -1, dy: 0, idx: 3 },
			{ dx: -1, dy: -1, idx: 6 },
			{ dx: 0, dy: 0, idx: 0 },
		], [ // 2
			{ dx: -1, dy: 0, idx: 7 },
			{ dx: 0, dy: 0, idx: 1 },
			{ dx: 0, dy: 0, idx: 0 },
			{ dx: 0, dy: 0, idx: 3 },
			{ dx: 0, dy: 0, idx: 5 },
		], [ // 3
			{ dx: 0, dy: 0, idx: 0 },
			{ dx: 0, dy: -1, idx: 6 },
			{ dx: 1, dy: 0, idx: 1 },
			{ dx: 0, dy: 0, idx: 4 },
			{ dx: 0, dy: 0, idx: 2 },
		], [ // 4
			{ dx: 1, dy: 0, idx: 1 },
			{ dx: 0, dy: 0, idx: 7 },
			{ dx: 0, dy: 0, idx: 6 },
			{ dx: 0, dy: 0, idx: 5 },
			{ dx: 0, dy: 0, idx: 3 },
		], [ // 5
			{ dx: 0, dy: 0, idx: 6 },
			{ dx: 0, dy: 1, idx: 0 },
			{ dx: -1, dy: 0, idx: 7 },
			{ dx: 0, dy: 0, idx: 2 },
			{ dx: 0, dy: 0, idx: 4 },
		], [ // 6
			{ dx: 0, dy: 1, idx: 3 },
			{ dx: 0, dy: 0, idx: 5 },
			{ dx: 0, dy: 0, idx: 4 },
			{ dx: 0, dy: 0, idx: 7 },
			{ dx: 1, dy: 1, idx: 1 },
		],
		[ // 7
			{ dx: 0, dy: 0, idx: 4 },
			{ dx: 1, dy: 0, idx: 2 },
			{ dx: 1, dy: 0, idx: 5 },
			{ dx: 1, dy: 1, idx: 0 },
			{ dx: 0, dy: 0, idx: 6 },
		],
	];
	return {
		points,
		primitiveUnit,
		unitSize: [ 4*SIN60, 4*SIN60 ],
		links,
		name: 'CAIRO',
		sides: 5,
		symmetry: 1,
		rotationSteps: 5
	};
}

export const TESSELATIONS : Record<string, TesselationType> = {
	CAIRO: getCairoTesselation(),
	DIAMOND: getDiamondTesselation(),
	SQUARE: getSquareTesselation(),
	HEXAGONAL: getHexagonalTesselation(),
	TRIANGULAR: getTriangleTesselation()
};
