/**
 * Created by horacio on 13/08/2016.
 * Migration from PixiJS v4.0.3 to v6.4.2 by ominousf on 03/25/2023
 */
import Font from "../font";
import { Text } from "pixi.js";
import Palette from "../utils/palette";
import GameTextStyle from "./gametextstyle";

class IndicadorMapa extends Text {
	constructor(escala) {
		let style = new GameTextStyle(Font.INDICADOR_MAPA,escala);
		super(" ",style);
		this.setEscala(escala);
	}

	actualizar(numMap, x, y) {
		this.text = "Mapa " + numMap + " X: " + x + " Y: " + y;
	}

	setEscala(escala){
		this.style.setEscala(escala);
	}

}
export default IndicadorMapa;
