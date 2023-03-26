/**
 * Created by horacio on 4/19/16.
 */

import PopUp from "./popup";

const htmlString = `
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="../css/main.css" type="text/css">
</head>
<body>

<article id="inGameMensaje">
    <div class="dialogContent">
        <div id="inGameMensajeContenido" class="activeColor everywhereFont">
        </div>
        <button id="inGameMensajeBotonOk" class="btn btn-default btn-block">OK</button>
    </div>
</article>

</body>
</html>
`;

class InGameMensaje extends PopUp {
	constructor() {
		var options = {
			title: "MENSAJE",
			width: 300,
			height: 280,
			minWidth: 200,
			minHeight: 150
		};
		var $element = $(`<div>${htmlString}</div>`);
		super($element, options);
		this.initCallbacks();
	}

	show(mensaje) {
		super.show();
		$("#inGameMensajeContenido").text(mensaje);
		$("#inGameMensajeBotonOk").focus();
	}

	initCallbacks() {
		var self = this;
		$("#inGameMensajeBotonOk").click(function () {
			self.hide();
		});
	}
}

export default InGameMensaje;