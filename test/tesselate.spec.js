import { TESSELATIONS } from '../src/tesselate';

test('tesselation links are consistent', () => {

	for (const t of Object.values(TESSELATIONS)) {
		const { links, sides, primitiveUnit } = t;
		expect(primitiveUnit.length).toEqual(links.length);

		for (const link of links) {
			expect(link.length).toEqual(sides);
		}
	}

});
