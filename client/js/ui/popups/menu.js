/**
 * Created by horacio on 07/08/2016.
 */

import PopUp from "./popup";
import eventEmitter from "../utils/eventEmitter";
import { PopupNames } from "./popupNames";

const htmlString = `
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="../css/main.css" type="text/css">
</head>

<body>
<article id="menu">
    <div class="dialogContent">
        <div>
            <button id="botonMapa1" class="btn btn-default margenBoton horizontal_center">Mapa</button>
            <button id="botonEstadisticas1" class="btn btn-default margenBoton horizontal_center">Estadisticas</button>
            <button id="botonClanes1" class="btn btn-default margenBoton horizontal_center">Clanes</button>
            <button id="botonParty1" class="btn btn-default margenBoton horizontal_center">Party</button>
            <button id="botonOpciones1" class="btn btn-default margenBoton horizontal_center">Ajustes</button>
        </div>
    </div>
</article>
</body>
</html>
`;

class Menu extends PopUp {
	constructor(game, showMapaCb, showEstadisticasCb, showClanesCb, showOpcionesCb) {
		var options = {
			title: "MENU",
			width: 220,
			height: 300,
			minWidth: 150,
			minHeight: 280
		};
		var $element = $(`<div>${htmlString}</div>`);
		super($element, options);
		this.game = game;
		this.showMapaCb = showMapaCb;
		this.showEstadisticasCb = showEstadisticasCb;
		this.showClanesCb = showClanesCb;
		this.showOpcionesCb = showOpcionesCb;

		this._lastClosedTime = 0;
		this.initCallbacks();
	}

	hide(){
		super.hide();
		this._lastClosedTime = Date.now();
	}

	show(fromEscapeKey){
		// fromEscapeKey: fix feo para poder mostrar y ocultar con la tecla esc
		if (fromEscapeKey){
			if (this._lastClosedTime > Date.now() - 20 ){
				return;
			}
		}
		super.show();
	}

	initCallbacks() {
		var self = this;

		$("#botonMapa1").click(function () {
			eventEmitter.emit(PopupNames.GUIA_MAPA);
		});

		$("#botonEstadisticas1").click(function () {
			self.showEstadisticasCb();
			// eventEmitter.emit(PopupNames.ESTADISTICAS);
		});

		$("#botonClanes1").click(function () {
			self.showClanesCb();
		});

		$("#botonParty1").click(function () {
			self.game.client.sendRequestPartyForm();
		});

		$("#botonOpciones1").click(function () {
			self.showOpcionesCb();
		});

		// $("#comerciarBotonComprar").click(function () {
		//     var slot = self.shopGrid.getSelectedSlot();
		//     if (slot) {
		//         var inputCantidad = $("#comerciarInputCantidad").val();
		//         if (!isNaN(inputCantidad)) {
		//             if (inputCantidad > 0) {
		//                 self.acciones.comprar(slot, inputCantidad);
		//             }
		//         }
		//     }
		// });
	}
}

export default Menu;

