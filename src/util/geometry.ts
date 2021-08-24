export type Point = {
	x: number;
	y: number;
};

export function centerOfMass(points : Point[]) : Point {
	return {
		x : points.reduce((prev, cur) => prev + cur.x, 0) / points.length,
		y : points.reduce((prev, cur) => prev + cur.y, 0) / points.length
	};
}

export const TWO_PI = Math.PI * 2;

function wrap(value : number, min : number, max : number) {
	const range = max - min;
	return (min + ((value - min) % range));
}
/** like Phaser function of same name */
export function wrapRotation(rotation: number) {
	return wrap(rotation, -Math.PI, Math.PI);
}

export function length(point : Point) {
	return Math.sqrt(point.x * point.x * point.y * point.y);
}

export function minus(a : Point, b : Point) {
	return { x : a.x - b.x, y : a.y - b.y };
}

export function plus(a : Point, b : Point) {
	return { x : a.x + b.x, y : a.y + b.y };
}
