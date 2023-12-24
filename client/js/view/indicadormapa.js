/**
 * Created by horacio on 13/08/2016.
 * Migration from PixiJS v4.0.3 to v6.4.2 by ominousf on 03/25/2023
 */
import { BitmapText } from 'pixi.js';

class IndicadorMapa extends BitmapText {
	constructor(escala) {
		super(' ', {
			fontName: 'Roboto Mono',
			fontSize: 16
		});
		this.escala = escala;
		// this.adjustScale(escala);
	}

	actualizar(numMap, x, y) {
		this.text = 'Mapa ' + numMap + ' X: ' + x + ' Y: ' + y;
	}

	// adjustScale(escala) {
	// 	this.scale.set(escala, escala);
	// }
}

export default IndicadorMapa;
