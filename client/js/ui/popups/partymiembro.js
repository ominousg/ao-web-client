/**
 * Created by horacio on 7/11/16.
 */

import PopUp from "./popup";

const htmlString = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<article id="partyMiembro">
    <div class="dialogContent">
        <label for="partyMiembroMensaje">Mensaje</label><input id="partyMiembroMensaje">
        <label for="partyMiembroMembersList">Miembros</label><select id="partyMiembroMembersList" class="form-control" size="4"></select>
        Experiencia Total:<span id="partyMiembroExperienciaTotal"></span>
        <button id="partyMiembroBotonCerrar" class="btn btn-default">Cerrar</button>
        <button id="partyMiembroBotonAbandonar" class="btn btn-primary">Abandonar party</button>
    </div>
</article>

</body>
</html>
`;

class PartyMiembro extends PopUp {
	constructor(game, showMensajeCb) {

		var options = {
			title: "PARTY",
			width: 500,
			height: 400,
			minWidth: 250,
			minHeight: 300
		};
		var $element = $(`<div>${htmlString}</div>`);
		super($element, options);

		this.game = game;
		this.showMensajeCb = showMensajeCb;

		this.$inputMensaje = $("#partyMiembroMensaje");
		this.$miembrosList = $("#partyMiembroMembersList");
		this.$experienciaTotal = $("#partyMiembroExperienciaTotal");
		this.$botonAbandonar = $("#partyMiembroBotonAbandonar");
		this.$botonCerrar = $("#partyMiembroBotonCerrar");

		this.initCallbacks();
	}

	show(miembros, exp) {
		super.show();

		this.$miembrosList.empty();
		for (var nombre of miembros) {
			var $nuevoMiembro = $("<option>").text(nombre);
			this.$miembrosList.append($nuevoMiembro);
		}
		this.$experienciaTotal.text(exp);
	}

	initCallbacks() {

		this.$botonAbandonar.click(() => {
			this.game.client.sendPartyLeave();
			this.hide();
		});

		this.$botonCerrar.click(() => {
			this.game.client.sendPartyLeave();
			this.hide();
		});

		this.$inputMensaje.keypress((event) => {
			if (event.keyCode == 13 || event.which == 13) {
				this.game.client.sendPartyMessage(this.$inputMensaje.val());
				this.$inputMensaje.val("");
				event.preventDefault();
			}
		});
	}

}

export default PartyMiembro;
