/**
 * Created by horacio on 07/06/2016.
 * PixiJS migrations by ominousf: v4.0.3 to v6.4.2 on 03/25/2023
 * v6.4.2 to 7.4.0 on 24/02/2024
 */
import { Text } from 'pixi.js';
import Font from '../font';
import * as GameTextStyle from './gametextstyle';

const init = (nombre, clan, font, escala = 1) => {
	if (clan) {
		nombre = nombre + '\n' + clan;
	}

	const style = GameTextStyle.init(Font.NOMBRE_BASE_FONT, escala);
	const text = new Text(nombre, style);

	text.anchor.set(0.5, 0);
	text._escala = escala;

	return text;
};

const setPosition = (text, x, y) => {
	text.x = Math.round((x + 16) * text._escala);
	text.y = Math.round((y + 32) * text._escala);
};

const setEscala = (text, nuevaEscala) => {
	text.x = text.x * (nuevaEscala / text._escala);
	text.y = text.y * (nuevaEscala / text._escala);
	GameTextStyle.setEscala(text.style, nuevaEscala);
	text._escala = nuevaEscala;
};

export { init, setPosition, setEscala };
