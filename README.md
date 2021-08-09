# Tins 21

Entry for the TINS 2021 Game Jam, by Amarillion (code), OliviaGS (art) and Donall (music)

The home of this game is

https://tins.amarillion.org/entry/228/

# Play online

You can play this game online by opening:

https://github.com/amarillion/tins21/dist

(Use the QR code in the title screen to play on your iPad or cell phone)

# How to play

Create a path by dragging tiles from the top-right corner into the field.
You can click the L + R buttons (before dragging) to rotate a tile.

Create a path, but be careful that the fluffs don't sabotage it.
If the fluffs get too annoying, DRAG them away.

Each level has a different geometry.

The goal of each level is to collect enough bananas.

# Implementation of the rules

The last-minute special requirements for TINS 2021 were implemented as follows:

```
genre rule #143: Humoristic/Funny. Make the player laugh out loud at least once by funny situations, dialogue, or anything else in your game. 
```

Our pitiful attempt at humour is mostly based on the setting of the game. Two adventurers traveling through space. Their most precious cargo is bananas, for some reason. And they are obstructed by... harmless bunnies. We hope that the bouncing sprites and the quirky music add to this effect.

```
artistical rule #147: Inspired by MC Escher
```

MC Escher is more than just impossible objects. Escher's art was inspired by symmetry and unusual geometries. Escher took a particular interest in tiling patterns. Not just square tiles, but hexagonal, diamond shaped, pentagonal, ...

I based this game on MC Escher's interest in tiling patterns. This game has 5 different ones to discover. And let me assure you, basing a game on pentagonal tiling is not making things easier for the programmer...

```
artistical rule #94: The game should contain a plug for another program or thing you made.
```

The game plugs various aspects of our work in between levels. Any ideas we had for more interesting ways to hide these plugs were abandoned due to time pressure.

```
technical rule #113: Hexagonal - something in the game must be hexagonal
```

One of the levels is based on hexagonal tiling. Also, if you notice, the music is written in 6/8 time.

```
bonus rule #13: Test of Might - you may skip another rule if your code contains automated test coverage
```

I did write some unit tests in jest, to fix some hard bugs related to tile rotation. But I don't really want to skip any of the other rules.

# Tech stack and code re-use

Our tech stack is: JavaScript/TypeScript, Phaser 3, webpack for bundling, and jest for unit testing.

This game is mostly written from scratch, but I did re-use some code snippets from a few previous game jam entries. For example, the dialog system comes from [ldjam46](https://github.com/amarillion/ldjam46/),
and the menu comes from [ldjam47](https://github.com/amarillion/ldjam47/)

I've also depended on my own path finding node module, [helixgraph](https://amarillion.github.io/helixgraph/)

# How to build from scratch

To build this game, install the latest version of npm (7 or higher)

```
npm install
npm run build
```

You can now serve the 'dist' folder with your favorite http server, for example:

```
npx http-server dist
```

And point your browser to http://localhost:8080