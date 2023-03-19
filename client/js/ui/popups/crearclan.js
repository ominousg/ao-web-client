/**
 * Created by horacio on 7/8/16.
 */

import PopUp from "./popup";
import Utils from "../../utils/util";

const htmlString = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<article id="crearClan">
    <div class="dialogContent">
        <div class="scrollFlex">
            <label for="crearClanNombre">Nombre clan:</label><input id="crearClanNombre" class="form-control">
            <label for="crearClanWebsite">Website:</label><input id="crearClanWebsite" class="form-control">
            <label for="crearClanDescripcion">Descripcion:</label><input id="crearClanDescripcion" class="form-control">
            <h1>Codex</h1>
            El codex de un clan define el código de conducta al cual deben someterse sus integrantes.
            Todo miembro de un clan debe defender los principios del mismo, los cuales quedan establecidos en el codex del clan.
            Al definir el código de conducta del clan se deberá dar al menos 4 sentencias a modo de mandamientos
            <input id="crearClanCodex_0" class="form-control">
            <input id="crearClanCodex_1" class="form-control">
            <input id="crearClanCodex_2" class="form-control">
            <input id="crearClanCodex_3" class="form-control">
            <input id="crearClanCodex_4" class="form-control">
            <input id="crearClanCodex_5" class="form-control">
            <input id="crearClanCodex_6" class="form-control">
            <input id="crearClanCodex_7" class="form-control">
            <div class="button-toolbar margenBoton">
            <button id="crearClanBotonCancelar" class="btn btn-default pull-right">Cancelar</button>
            <button id="crearClanBotonCrear" class="btn btn-primary pull-right">Crear</button>
            </div>
        </div>
    </div>
</article>

</body>
</html>
`;

    class CrearClan extends PopUp {
        constructor(game, showMensajeCb) {

            var options = {
                title: "CLANES",
                width: 500,
                height: 400,
                minWidth: 250,
                minHeight: 300
            };
            var $element = $(`<div>${htmlString}</div>`);
            super($element, options);

            this.game = game;
            this.showMensajeCb = showMensajeCb;
            
            this.$botonCrear = $("#crearClanBotonCrear");
            this.$botonCancelar = $("#crearClanBotonCancelar");

            this.$inputNombre = $("#crearClanNombre");
            this.$inputWebsite = $("#crearClanWebsite");
            this.$inputDescripcion = $("#crearClanDescripcion");
            this.prefixCodex = "crearClanCodex_";

            this.initCallbacks();
        }

        _getCodexText() {
            let NUMBER_OF_LINES = 8;
            let MINIMUM_LINES = 4;
            let result = [];
            let completedLines = 0;
            for (let i = 0; i < NUMBER_OF_LINES; i++) {
                let $inputLine = $('#' + this.prefixCodex + i);
                let text = $inputLine.val();
                if (text) {
                    completedLines++;
                    result.push(text);
                }
            }
            if (completedLines < 4) {
                return false;
            }
            return Utils.joinNullArray(result);
        }

        _verificarCampos() {
            return !(!this.$inputNombre.val() || !this.$inputWebsite.val() || !this.$inputDescripcion.val() || !this._getCodexText());
        }

        initCallbacks() {
            var self = this;

            this.$botonCancelar.click(function () {
                self.hide();
            });

            this.$botonCrear.click(function () {
                if (!self._verificarCampos()){
                    self.showMensajeCb("Debes completar todos los campos");
                    return;
                }
                self.game.client.sendCreateNewGuild(self.$inputDescripcion.val(), self.$inputNombre.val(),
                    self.$inputWebsite.val(), self._getCodexText());
                self.hide();
            });
        }

    }

    export default CrearClan;