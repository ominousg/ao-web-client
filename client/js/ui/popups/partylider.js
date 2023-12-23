/**
 * Created by horacio on 7/11/16.
 */

import PopUp from './popup';

const htmlString = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<article id="partyLider">
    <div class="dialogContent">
        <label for="partyLiderMensaje">Mensaje</label><input id="partyLiderMensaje">
        <label for="partyLiderMembersList">Miembros</label><select id="partyLiderMembersList" class="form-control" size="4"></select>
        Experiencia Total:<span id="partyLiderExperienciaTotal"></span>
        <button id="partyLiderBotonExpulsar" class="btn btn-primary">Expulsar</button>
        <button id="partyLiderBotonHacerLider" class="btn btn-primary">Transferir liderazgo</button>
        <label for="partyLiderAgregarInput">Agregar personaje</label><input id="partyLiderAgregarInput">
        <button id="partyLiderBotonAgregar" class="btn btn-primary">Agregar</button>
        <button id="partyLiderBotonCerrar" class="btn btn-default">Cerrar</button>
        <button id="partyLiderBotonDisolver" class="btn btn-primary">Disolver</button>
    </div>
</article>

</body>
</html>
`;

class PartyLider extends PopUp {
	constructor(game, showMensajeCb) {
		var options = {
			title: 'PARTY',
			width: 500,
			height: 400,
			minWidth: 250,
			minHeight: 300
		};
		var $element = $(`<div>${htmlString}</div>`);
		super($element, options);

		this.game = game;
		this.showMensajeCb = showMensajeCb;

		this.$inputMensaje = $('#partyLiderMensaje');
		this.$miembrosList = $('#partyLiderMembersList');
		this.$experienciaTotal = $('#partyLiderExperienciaTotal');
		this.$botonExpulsar = $('#partyLiderBotonExpulsar');
		this.$botonHacerLider = $('#partyLiderBotonHacerLider');
		this.$inputAgregarPersonaje = $('#partyLiderAgregarInput');
		this.$botonAgregarMiembro = $('#partyLiderBotonAgregar');
		this.$botonDisolver = $('#partyLiderBotonDisolver');
		this.$botonCerrar = $('#partyLiderBotonCerrar');
		this.initCallbacks();
	}

	show(miembros, exp) {
		super.show();

		this.$miembrosList.empty();
		for (var nombre of miembros) {
			var $nuevoMiembro = $('<option>').text(nombre);
			this.$miembrosList.append($nuevoMiembro);
		}
		this.$experienciaTotal.text(exp);
	}

	_getMiembroSeleccionado() {
		return this.$miembrosList.find('option:selected').text().split(' ')[0];
	}

	_ejecutarConMiembro(cbFunc) {
		let pj = this._getMiembroSeleccionado();
		if (pj) {
			cbFunc(pj);
		} else {
			this.showMensajeCb('Debes seleccionar un miembro de la party');
		}
	}

	initCallbacks() {
		this.$botonExpulsar.click(() => {
			this._ejecutarConMiembro(
				function (pj) {
					this.game.client.sendPartyKick(pj);
				}.bind(this)
			);
		});

		this.$botonHacerLider.click(() => {
			this._ejecutarConMiembro(
				function (pj) {
					this.game.client.sendPartySetLeader(pj);
				}.bind(this)
			);
		});

		this.$botonAgregarMiembro.click(() => {
			let pj = this.$inputAgregarPersonaje.val();
			if (pj) {
				this.game.client.sendPartyAcceptMember(pj);
				this.$inputAgregarPersonaje.val('');
			}
		});

		this.$botonDisolver.click(() => {
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
				this.$inputMensaje.val('');
				event.preventDefault();
			}
		});
	}
}

export default PartyLider;
