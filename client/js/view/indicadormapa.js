/**
 * Created by horacio on 13/08/2016.
 * PixiJS migrations by ominousf: v4.0.3 to v6.4.2 on 03/25/2023
 * v6.4.2 to 7.4.0 on 24/02/2024
 */

import { BitmapText } from 'pixi.js';

const createBitmapText = () =>
	new BitmapText(' ', {
		fontName: 'Roboto Mono',
		fontSize: 18,
		tint: 0xffff00
	});

const initIndicadorMapa = (escala) => createBitmapText(escala);

const actualizar = (indicadorMapa, numMap, x, y) => {
	indicadorMapa.text = `Mapa ${numMap} X: ${x} Y: ${y}`;
};

export { initIndicadorMapa, actualizar };
