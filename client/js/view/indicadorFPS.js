import { BitmapText } from 'pixi.js';

class IndicadorFPS extends BitmapText {
	constructor(escala) {
		super(' ', {
			fontName: 'Roboto Mono',
			fontSize: 18,
			tint: 0xffff00
		});
	}

	actualizar(fps) {
		this.text = 'FPS: ' + fps;
	}
}
export default IndicadorFPS;
