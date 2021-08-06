const SIN60 = Math.sqrt(0.75);
const PI = Math.PI;

console.log ({ SIN60 });
export function getTriangleTesselation() {
	const shape = [
		0, 0, 
		1, 2*SIN60, 
		2, 0
	];
	const primitiveUnit = [
		{ x: 0, y: 0, rotation: 0 },
		{ x: 1, y: 0, rotation: PI },
		{ x: -1,   y: 2*SIN60, rotation: 0 },
		{ x: 0, y: 2*SIN60, rotation: PI }
	];
	const offset = [ 0, 4 * SIN60, 2, 0 ]
	const links = [
		[],
		[],
		[],
		[],
	]
	return {
		shape,
		primitiveUnit,
		offset,
		links
	}
}

export function getSquareTesselation() {
	const shape = [
		0, 0, 2, 0, 2, 2, 0, 2
	];
	const primitiveUnit = [
		{ x: 0, y: 0, rotation: 0 }
	];
	const offset = [ 0, 2, 2, 0 ]
	const links = [
		// first elt
		[
			[ 0, -1, 0 ], // north
			[ 1,  0, 0 ], // east
			[ 0,  1, 0 ], // south
			[ -1, 0, 0 ], // west
		]
	]
	return {
		shape,
		primitiveUnit,
		offset, 
		links
	}
}

export function getHexagonalTesselation() {	
	const shape = [
		0, 0, 0, 1, SIN60, 1.5, 2*SIN60, 1, 2*SIN60, 0, SIN60, -0.5
	];
	const primitiveUnit = [
		{ x: 0, y: 0, rotation: 0 },
		{ x: -SIN60, y: 1.5, rotation: 0 },
	];
	const offset = [ 0, 3, 2*SIN60, 0 ];
	const links = [
		// first elt
		[
			[ -1, 1, 1 ], // NE
			[  1, 0, 0 ], // E
			[  1, 0, 1 ], // SE
			[  0, 0, 1 ], // SW
			[ -1, 0, 0 ], // W
			[ 0, -1, 1 ], // NW
		],
		// second elt
		[
			[  0, 0, 0 ], // NE
			[  1, 0, 1 ], // E
			[  0, 1, 0 ], // SE
			[ -1, 1, 0 ], // SW
			[ -1, 0, 1 ], // W
			[ -1, 0, 0 ], // NW
		]
	]
	return {
		shape,
		primitiveUnit,
		offset,
		links
	}
}

export function getDiamondTesselation() {
	const shape = [
		0, 0, 0, 1, SIN60, 1.5, SIN60, 0.5
	];
	const primitiveUnit = [
		{ x: 0,         y: 0, rotation: 0 },
		{ x: SIN60 / 2, y: -0.75, rotation: PI * 2 / 3 },
		{ x: SIN60,     y: 0, rotation: PI * 4 / 3 },

		{ x: -SIN60 + 0,         y: 1.5 + 0, rotation: 0 },
		{ x: -SIN60 + SIN60 / 2, y: 1.5 + -0.75, rotation: PI * 2 / 3 },
		{ x: -SIN60 + SIN60,     y: 1.5 + 0, rotation: PI * 4 / 3 },
	];
	const offset = [ 0, 3, 2*SIN60, 0 ];
	return {
		shape,
		primitiveUnit,
		offset
	}
}

export function getCairoTesselation() {
	const shape = [
		0, 0, 
		SIN60, 0.5, 
		SIN60-0.5, SIN60+0.5, 
		0.5-SIN60, SIN60+0.5, 
		-SIN60, 0.5
	];

	const primitiveUnit = [
		{ x: SIN60,               y: -(SIN60 + 0.5) / 2, rotation: 0 },
		{ x: -(SIN60*1.5 - 0.25), y: SIN60, rotation: PI*0.5 },
		{ x: -SIN60,              y: (SIN60 + 0.5) / 2, rotation: PI },
		{ x: SIN60*1.5 - 0.25,    y: -SIN60, rotation: PI*1.5 },

		{ x: (-2 * SIN60) + SIN60,               y: (2 * SIN60) + -(SIN60 + 0.5) / 2, rotation: 0 },
		{ x: (-2 * SIN60) + -(SIN60*1.5 - 0.25), y: (2 * SIN60) + SIN60, rotation: PI*0.5 },
		{ x: (-2 * SIN60) + -SIN60,              y: (2 * SIN60) + (SIN60 + 0.5) / 2, rotation: PI },
		{ x: (-2 * SIN60) + SIN60*1.5 - 0.25,    y: (2 * SIN60) + -SIN60, rotation: PI*1.5 },
	];

	const offset = [ 0, 4*SIN60, 4*SIN60, 0 ];
	return {
		shape,
		primitiveUnit,
		offset
	}
}