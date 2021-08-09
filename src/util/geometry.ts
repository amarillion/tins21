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
