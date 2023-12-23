/**
 * Created by horacio on 7/6/16.
 */

import PopUp from './popup';

const htmlString = `
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="../css/main.css" type="text/css">
</head>
<body>

<article id="solicitudClan">
    <div class="dialogContent">
        <div class="form-group">
            <label for="comment">Comment:</label>
            <textarea class="form-control" rows="5" id="comment"></textarea>
        </div>
        <button id="solicitudClanBotonCancelar" class="btn btn-default">Cancelar</button>
        <button id="solicitudClanBotonEnviar" class="btn btn-primary">Enviar</button>
    </div>
</article>

</body>
</html>
`;

class SolictudClan extends PopUp {
	constructor(game) {
		var options = {
			title: 'CLANES',
			width: 500,
			height: 400,
			minWidth: 250,
			minHeight: 300
		};
		var $element = $(`<div>${htmlString}</div>`);
		super($element, options);

		this.game = game;
		this.clan = '';

		this.$botonCancelar = $('#solicitudClanBotonCancelar');
		this.$botonEnviar = $('#solicitudClanBotonEnviar');

		this.initCallbacks();
	}

	show(targetClan) {
		super.show();
		this.clan = targetClan;
	}

	initCallbacks() {
		var self = this;

		this.$botonCancelar.click(function () {
			self.hide();
		});

		this.$botonEnviar.click(function () {
			var textoSolicitud = $('#detallesClanInputSolicitud').val();
			self.game.client.sendGuildRequestMembership(self.clan, textoSolicitud);
			self.hide();
		});
	}
}

export default SolictudClan;
