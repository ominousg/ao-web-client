/**
 * Created by horacio on 3/21/16.
 */

import PopUp from './popup';

const htmlString = `
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="../css/main.css" type="text/css">
</head>
<body>

<article id="tirar">
    <div class="dialogContent">
        <div style="text-align: center; margin:11px auto">
            <input id="tirarInputCantidad" class="form-control" type="number" max="10000">
        </div>
        <div>
            <button id="tirarBotonTirar" class="btn btn-default">Tirar</button>
            <button id="tirarBotonTirarTodo" class="btn btn-primary">Tirar todo</button>
        </div>
    </div>
</article>

</body>
</html>
`;

class Tirar extends PopUp {
	constructor(game, acciones) {
		var options = {
			title: 'TIRAR',
			width: 250,
			height: 160,
			minWidth: 100,
			minHeight: 200
		};
		var $element = $(`<div>${htmlString}</div>`);
		super($element, options);
		this.game = game;
		this.acciones = acciones;
		this.initCallbacks();
	}

	show(tirandoOro) {
		super.show();
		this.tirandoOro = tirandoOro;
	}

	initCallbacks() {
		var self = this;
		$('#tirarBotonTirar').click(function () {
			var cantidad = $('#tirarInputCantidad').val();
			if (!isNaN(cantidad)) {
				if (cantidad > 0) {
					if (self.tirandoOro) {
						self.acciones.tirarOro(cantidad);
					} else {
						self.acciones.tirarSelectedItem(cantidad);
					}
				}
			}
			self.hide();
		});

		$('#tirarBotonTirarTodo').click(function () {
			if (self.tirandoOro) {
				self.acciones.tirarTodoOro();
			} else {
				self.acciones.tirarTodoSelectedItem();
			}
			self.hide();
		});
	}
}

export default Tirar;
