const SIN60 = Math.sin(60);
const PI = Math.PI;

export function getTriangleTesselation() {
	const shape = [
		0, 0, 
		0.5, 2 * SIN60, 
		1, 0
	];
	const primitiveUnit = [
		{ x: 0, y: 0, rotation: 0 },
		{ x: 0.5, y: 0, rotation: PI }
	];
	const offset = [ 1, 0, 0, 1 ]

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
	const offset = [1, 0, 0, 1]
	return {
		shape,
		primitiveUnit,
		offset
	}
}

/*
function getHexagonalTesselation() {	
	const shape = [
		0, 0,
	];
	const primitiveUnit = [
		{ x: 0, y: 0, rotation: 0 }
	];
	const offset = 
	return {
		shape,
		primitiveUnit,
		offset
	}
}

function getDiamondTesselation() {

}

*/