/**
 * Created by horacio on 13/08/2016.
 * PixiJS migrations by ominousf: v4.0.3 to v6.4.2 on 03/25/2023
 * v6.4.2 to 7.4.0 on 24/02/2024
 */
import { BitmapText } from 'pixi.js';

class IndicadorMapa extends BitmapText {
	constructor(escala) {
		super(' ', {
			fontName: 'Roboto Mono',
			fontSize: 18,
			tint: 0xffff00
		});
	}

	actualizar(numMap, x, y) {
		this.text = 'Mapa ' + numMap + ' X: ' + x + ' Y: ' + y;
	}
}

export default IndicadorMapa;
