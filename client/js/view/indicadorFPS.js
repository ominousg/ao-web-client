import Font from '../font';
import { Text } from 'pixi.js';
import GameTextStyle from './gametextstyle';

class IndicadorFPS extends Text {
	constructor(escala) {
		let style = new GameTextStyle(Font.INDICADOR_MAPA, escala);
		super(' ', style);
		this.setEscala(escala);
	}

	actualizar(fps) {
		this.text = 'FPS: ' + fps;
	}

	setEscala(escala) {
		this.style.setEscala(escala);
	}
}
export default IndicadorFPS;
