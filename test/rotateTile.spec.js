import { getRotationUnits, rotateMaskLeft, rotateMaskRight, TILES } from '../src/tiles';
import { RotatingTileMixin } from '../src/sprites/RotatingTileMixin';
import { TESSELATIONS } from '../src/tesselate';
import { wrapRotation } from '../src/util/geometry';

test('mask rotation left', () => {

	expect (rotateMaskLeft(1, 0, 4)).toEqual(1);
	expect (rotateMaskLeft(1, 1, 4)).toEqual(2);
	expect (rotateMaskLeft(1, 2, 4)).toEqual(4);
	expect (rotateMaskLeft(1, 3, 4)).toEqual(8);
	expect (rotateMaskLeft(1, 4, 4)).toEqual(1);

	expect (rotateMaskLeft(1, 0, 3)).toEqual(1);
	expect (rotateMaskLeft(1, 1, 3)).toEqual(2);
	expect (rotateMaskLeft(1, 2, 3)).toEqual(4);
	expect (rotateMaskLeft(1, 3, 3)).toEqual(1);
	expect (rotateMaskLeft(1, 4, 3)).toEqual(2);

	expect (rotateMaskLeft(3, 0, 4)).toEqual(3);
	expect (rotateMaskLeft(3, 1, 4)).toEqual(6);
	expect (rotateMaskLeft(3, 2, 4)).toEqual(12);
	expect (rotateMaskLeft(3, 3, 4)).toEqual(9);
	expect (rotateMaskLeft(3, 4, 4)).toEqual(3);

});

test('mask rotation right', () => {

	expect (rotateMaskRight(1, 0, 4)).toEqual(1);
	expect (rotateMaskRight(1, 1, 4)).toEqual(8);
	expect (rotateMaskRight(1, 2, 4)).toEqual(4);
	expect (rotateMaskRight(1, 3, 4)).toEqual(2);
	expect (rotateMaskRight(1, 4, 4)).toEqual(1);

	expect (rotateMaskRight(1, 0, 3)).toEqual(1);
	expect (rotateMaskRight(1, 1, 3)).toEqual(4);
	expect (rotateMaskRight(1, 2, 3)).toEqual(2);
	expect (rotateMaskRight(1, 3, 3)).toEqual(1);
	expect (rotateMaskRight(1, 4, 3)).toEqual(4);

	expect (rotateMaskRight(3, 0, 4)).toEqual(3);
	expect (rotateMaskRight(3, 1, 4)).toEqual(9);
	expect (rotateMaskRight(3, 2, 4)).toEqual(12);
	expect (rotateMaskRight(3, 3, 4)).toEqual(6);
	expect (rotateMaskRight(3, 4, 4)).toEqual(3);

});

test('rounding angles to units', () => {

	expect (getRotationUnits(-2 * Math.PI, 4)).toBe(0);
	expect (getRotationUnits(-0.5 * Math.PI, 4)).toBe(3);
	expect (getRotationUnits(-0.2 * Math.PI, 4)).toBe(0);
	expect (getRotationUnits(0.2 * Math.PI, 4)).toBe(0);
	expect (getRotationUnits(0.4 * Math.PI, 4)).toBe(1);
	expect (getRotationUnits(0.6 * Math.PI, 4)).toBe(1);
	expect (getRotationUnits(0.8 * Math.PI, 4)).toBe(2);
	expect (getRotationUnits(1.0 * Math.PI, 4)).toBe(2);
	expect (getRotationUnits(1.2 * Math.PI, 4)).toBe(2);
	expect (getRotationUnits(1.4 * Math.PI, 4)).toBe(3);
	expect (getRotationUnits(1.6 * Math.PI, 4)).toBe(3);
	expect (getRotationUnits(1.8 * Math.PI, 4)).toBe(0);
	expect (getRotationUnits(2.0 * Math.PI, 4)).toBe(0);
	expect (getRotationUnits(2.2 * Math.PI, 4)).toBe(0);

});

class MockSprite {

	constructor() {
		this._rotation = 0;
		this.texture = null;
	}

	set rotation(value) {
		this._rotation = wrapRotation(value);
	}

	get rotation() {
		return this._rotation;
	}

	setTexture(resKey) {
		this.texture = resKey;
	}
}

class MockDraggableTile extends RotatingTileMixin(MockSprite) {

	constructor(tile, tesselation) {
		super();
		this.initTile(tile, tesselation);
	}
}

const DEG90 = Math.PI / 2;
const DEG120 = Math.PI * 2 / 3;
const DEG180 = Math.PI;

function setupSprite(tesselation, spriteRotation, elementRotation) {
	const tiles = TILES[tesselation.name];
	const sprite = new MockDraggableTile(tiles[3], tesselation);		
	sprite.rotation = spriteRotation;
	const { targetRotation, tile } = sprite.matchRotation(elementRotation);
	return { sprite, targetRotation, tile };
}

test('draggable tile mixin squares', () => {
	
	{
		const { sprite, targetRotation, tile } = setupSprite(TESSELATIONS.SQUARE, 0, 0);
		expect(sprite.rotation).toBe(0);
		expect(targetRotation).toBe(0);
		expect(tile.connectionMask).toBe(0b0011);
	}

	{
		const { sprite, targetRotation, tile } = setupSprite(TESSELATIONS.SQUARE, DEG90, 0);
		expect(sprite.rotation).toBe(0);
		expect(targetRotation).toBe(0);
		expect(tile.connectionMask).toBe(0b0110);
	}

	{
		const { sprite, targetRotation, tile } = setupSprite(TESSELATIONS.SQUARE, -DEG90, 0);
		expect(sprite.rotation).toBe(0);
		expect(targetRotation).toBe(0);
		expect(tile.connectionMask).toBe(0b1001);
	}

	/*
	TODO: fails still...
	{
		const { sprite, targetRotation, tile } = setupSprite(TESSELATIONS.SQUARE, -DEG180, 0);
		expect(sprite.rotation).toBe(0);
		expect(targetRotation).toBe(0);
		expect(tile.connectionMask).toBe(0b1100);
	}
	*/

	/*
	TODO: fails still...
	{
		const { sprite, targetRotation, tile } = setupSprite(TESSELATIONS.SQUARE, DEG180, 0);
		expect(sprite.rotation).toBe(0);
		expect(targetRotation).toBe(0);
		expect(tile.connectionMask).toBe(0b1100);
	}
	*/ 

});
