/**
 * Created by horacio on 4/3/16.
 */

import PopUp from './popup';

const htmlString = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <link rel="stylesheet" href="../css/main.css" type="text/css">
  </head>
  <body>

  <article id="mensajeGlobal">
      <div class="dialogContent">
          <div id="mensajeContenido" class="activeColor everywhereFont"></div>
          <button id="mensajeBotonOk" class="btn btn-default btn-block">OK</button>
      </div>
  </article>

  </body>
  </html>
`;

class Mensaje extends PopUp {
	constructor() {
		var options = {
			title: 'MENSAJE',
			width: 300,
			height: 280,
			minWidth: 200,
			minHeight: 150
		};
		var $element = $(`<div>${htmlString}</div>`);
		super($element, options, true, true);
		this.initCallbacks();
	}

	show(mensaje) {
		super.show();
		$('#mensajeContenido').text(mensaje);
		$('#mensajeBotonOk').focus();
	}

	initCallbacks() {
		var self = this;
		$('#mensajeBotonOk').click(function () {
			self.hide();
		});
	}
}

export default Mensaje;
