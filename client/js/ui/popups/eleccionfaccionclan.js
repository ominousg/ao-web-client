/**
 * Created by horacio on 7/7/16.
 */

import PopUp from "./popup";
import { Enums } from "../../enums";

const htmlString = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<article id="eleccionFaccionClan">
    <div class="dialogContent">
        <div style="width:100%;height:100%;display:flex; flex-direction: column;">
            <div class="scrollFlex">
                <div class="styledDiv" style="padding:5px;margin-bottom:5px;">
                    <button id="faccionClan_alineacionReal" class="btn btn-default margenBoton horizontal_center">Alineación real</button>
                    <p>
                        En los clanes de alineación real solo se admiten miembros del ejercito real de Banderbill.
                        Lucharán contra todos los criminales de estas tierras siempre junto al rey y bajo las oredenes del consejo
                        de Banderbill.
                        Los personajes que no sean ejercito real no podrán pertenecer a un clan de esta alineación.
                    </p>
                </div>

                <div class="styledDiv" style="padding:5px;margin-bottom:5px;">
                    <button id="faccionClan_alineacionLegal" class="btn btn-default margenBoton horizontal_center">Alineación legal</button>
                    <p>
                        En los clanes con orientación legal podrán coexistir miembros de las fuerzas reales de Banderbill con
                        ciudadanos.
                        Cualquier personaje que se vuelva criminal será expulsado automaticamente del clan.
                    </p>
                </div>

                <div class="styledDiv" style="padding:5px;margin-bottom:5px;">
                    <button id="faccionClan_alineacionNeutral" class="btn btn-default margenBoton horizontal_center">Alineación neutral</button>
                    <p>
                        Los clanes neutrales son aquellos que no tienen ninguna alineación manifesta.
                        Solo se aceptarán personajes criminales o ciudadanos que no pertenezcan a ninguna facción.
                    </p>
                </div>

                <div class="styledDiv" style="padding:5px;margin-bottom:5px;">
                    <button id="faccionClan_alineacionCriminal" class="btn btn-default margenBoton horizontal_center">Alineación criminal</button>
                    <p>
                        Los clanes criminales no se guian por las leyes, coexisten criminales junto con miembros de la Legión
                        Oscura.
                        Cualquier personaje que se convierta en ciudadano, será expulsado del clan inmediatamente.
                </div>

                <div class="styledDiv" style="padding:5px;margin-bottom:5px;">
                    <button id="faccionClan_alineacionCaos" class="btn btn-default margenBoton horizontal_center">Alineación del mal</button>
                    <p>
                        Estos clanes estan formados únicamente por miembros de la Legión Oscura y bajo las ordenes del demonio y sus
                        subditos.
                        Los clanes que le juren lealtad al demonio no podrán tener miembros que no pertenezcan a su ejército.
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <div class="btn-toolbar">
                <button id="faccionClanBotonCancelar" class="btn btn-default pull-right">Cancelar</button>
            </div>
        </div>
    </div>
</article>

</body>
</html>
`;

class EleccionFaccionClan extends PopUp {
	constructor(game) {

		var options = {
			title: "FACCIÓN CLAN",
			width: 550,
			height: 500,
			minWidth: 50,
			minHeight: 200
		};
		var $element = $(`<div>${htmlString}</div>`);
		super($element, options, true);

		this.game = game;
		this.initCallbacks();
	}

	_seleccionarAlineacion(alineacion) {
		this.game.client.sendGuildFundation(alineacion);
		this.hide();
	}

	initCallbacks() {
		var self = this;

		$("#faccionClan_alineacionReal").click(function () {
			self._seleccionarAlineacion(Enums.ClanType.ROYAL_ARMY);
		});
		$("#faccionClan_alineacionLegal").click(function () {
			self._seleccionarAlineacion(Enums.ClanType.LEGAL);
		});
		$("#faccionClan_alineacionNeutral").click(function () {
			self._seleccionarAlineacion(Enums.ClanType.NEUTRAL);
		});
		$("#faccionClan_alineacionCriminal").click(function () {
			self._seleccionarAlineacion(Enums.ClanType.CRIMINAL);
		});
		$("#faccionClan_alineacionCaos").click(function () {
			self._seleccionarAlineacion(Enums.ClanType.EVIL);
		});
		$("#faccionClanBotonCancelar").click(function () {
			self.hide();
		});
	}
}

export default EleccionFaccionClan;