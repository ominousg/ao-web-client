/**
 * Created by horacio on 07/06/2016.
 * PixiJS migrations by ominousf: v4.0.3 to v6.4.2 on 03/25/2023
 * v6.4.2 to 7.4.0 on 24/02/2024
 */
import { Enums } from '../enums';
import { Text } from 'pixi.js';
import Font from '../font';
import GameTextStyle from './gametextstyle';

class CharacterName extends Text {
	constructor(nombre, clan, font, escala) {
		if (clan) {
			nombre = nombre + '\n' + clan;
		}

		let style = new GameTextStyle(Font.NOMBRE_BASE_FONT, escala);
		super(nombre, style);

		this.anchor.set(0.5, 0);

		escala = escala || 1;
		this._escala = escala;
	}

	setPosition(x, y) {
		this.x = Math.round((x + 16) * this._escala);
		this.y = Math.round((y + 32) * this._escala);
	}

	setEscala(nuevaEscala) {
		this.x = this.x * (nuevaEscala / this._escala);
		this.y = this.y * (nuevaEscala / this._escala);
		this.style.setEscala(nuevaEscala);

		this._escala = nuevaEscala;
	}
}

export default CharacterName;
