const SIN60 = Math.sqrt(0.75);
const PI = Math.PI;

console.log ({ SIN60 });
export function getTriangleTesselation() {
	const shape = [
		0, 0, 
		0.5, SIN60, 
		1, 0
	];
	const primitiveUnit = [
		{ x: 0, y: 0, rotation: 0 },
		{ x: 0.5, y: 0, rotation: PI }
	];
	const offset = [ 1, 0, 0, SIN60 ]

	return {
		shape,
		primitiveUnit,
		offset
	}
}

export function getSquareTesselation() {
	const shape = [
		0, 0, 1, 0, 1, 1, 0, 1
	];
	const primitiveUnit = [
		{ x: 0, y: 0, rotation: 0 }
	];
	const offset = [ 1, 0, 0, 1]
	return {
		shape,
		primitiveUnit,
		offset
	}
}

export function getHexagonalTesselation() {	
	const shape = [
		0, 0, 0, 1, SIN60, 1.5, 2*SIN60, 1, 2*SIN60, 0, SIN60, -0.5
	];
	const primitiveUnit = [
		{ x: 0, y: 0, rotation: 0 }
	];
	const offset = [ 2*SIN60, 0, SIN60, 1.5 ];
	return {
		shape,
		primitiveUnit,
		offset
	}
}

export function getDiamondTesselation() {
	const shape = [
		0, 0, 0, 1, SIN60, 1.5, SIN60, 0.5
	];
	const primitiveUnit = [
		{ x: 0, y: 0, rotation: 0 },
		{ x: SIN60 / 2, y: -0.75, rotation: PI * 2 / 3 },
		{ x: SIN60, y: 0, rotation: PI * 4 / 3 }
	];
	const offset = [ 2*SIN60, 0, SIN60, 1.5 ];
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
		{ x: SIN60, y: -(SIN60 + 0.5) / 2, rotation: 0 },
		
		{ x: -(SIN60*1.5 - 0.25), y: SIN60, rotation: PI*0.5 },
		
		{ x: -SIN60, y: (SIN60 + 0.5) / 2, rotation: PI },
		
		{ x: SIN60*1.5 - 0.25, y: -SIN60, rotation: PI*1.5 },
	];

	const offset = [ 4*SIN60, 0, 2*SIN60, 2*SIN60 ];
	return {
		shape,
		primitiveUnit,
		offset
	}
}