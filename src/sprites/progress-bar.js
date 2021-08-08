import Phaser from 'phaser';

export class ProgressBar {
	
	constructor({ scene, layer, x, y, w, h, value = 0, max = 1.0 }) {
		this.graphics = scene.make.graphics();
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.refresh(value, max);
		layer.add(this.graphics);
	}

	refresh(value, max) {
		this.graphics.clear();

		this.graphics.fillStyle(0x808080, 0.5);
		this.graphics.fillRect(this.x, this.y, this.w, this.h);

		this.graphics.fillStyle(0xFFFF00, 1.0);
		const fraction = value / max;
		this.graphics.fillRect(this.x, this.y, this.w * fraction, this.h);
		
		this.graphics.lineStyle(3.0, 0x808080); // Phaser annoyance: parameter ordering inconsistent with fillStyle.
		this.graphics.strokeRect(this.x, this.y, this.w, this.h); // Phaser annoyance: naming inconsistent: lineStyle vs strokeRect
	}

}
