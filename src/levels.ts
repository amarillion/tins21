import { TESSELATIONS } from './tesselate';

export const LEVELDATA = [

	{ // 0
		dialog: `
<h2>Fole and Raul, our heroes</h2>
<p>
After years of adventuring in deep space,
Fole and Raul are ready to return home.
</p>
<p>
All they have to now, is load up their precious cargo.
The flowers are already in the ship...
</p>
<p>
They are ready to move a load of bananas.
But wait, what's that?
</p>
<p>
There are indiginous life forms here.
They are fluffy.
And they sure love bananas!
</p>
<h2>How to play</h2>
DRAG your tile from the TOP-RIGHT corner.
ROTATE before you drag, by clicking the L or R buttons.
Create a path, but be careful that the fluffs don't sabotage it.
If the fluffs get too annoying, DRAG them away.
`,
		tesselation: TESSELATIONS.SQUARE.name
	}, { // 1
		dialog: `
<h2>Intermission</h2>
<p>
Boy, the geometry of this place is weird, isn't it?
It reminds me of someone...
<p>`,
		tesselation: TESSELATIONS.HEXAGONAL.name
	}, { // 2
		dialog: `<h2>SHAMELESS PLUG</h2>
		<p>Do you like the hexagonal music?
		</p><p>
		Follow <a href="https://twitter.com/donall">@Donall</a> on twitter!
		</p>`,
		tesselation: TESSELATIONS.TRIANGULAR.name
	}, { // 3
		dialog: `<h2>SHAMELESS PLUG</h2>
		<p>
		Do you want to know the backstory?
		</p><p>
		How did our two heroes got into this mess?
		Play <a href="https://tins.amarillion.org/entry/205/">Fole and Raul go Flower Power</a>, and find out!</p>`,
		tesselation: TESSELATIONS.CAIRO.name,
	}, { // 4
		tesselation: TESSELATIONS.DIAMOND.name,
		dialog: `<h2>SHAMELESS PLUG</h2>
		<p>Did you enjoy TINS?</p>
		<p>
		Join <a href="https://tins.amarillion.org/">KrampusHack</a> this December, 
		a relaxed, secret-santa-style Game Jam by the origanizers of TINS
		where you make a game as a gift for somebody else.
		</p>
		`,
	}
];
