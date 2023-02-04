/**
 * Created by horacio on 7/9/16.
 */

import PopUp from "./popup";

const htmlString = `
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="../css/main.css" type="text/css">
</head>
<body>

<article id="noticiasClan" title="NOTICIAS CLAN">
    <div class="dialogContent">
        <div style="width:100%;height:100%;display:flex; flex-direction: column;">
            <h1>Noticias</h1>
            <div id="noticiasClanNoticias"></div>
            <h1>Clanes enemigos</h1>
            <div id="noticiasClanEnemigos"></div>
            <h1>Clanes aliados</h1>
            <div id="noticiasClanAliados"></div>
        </div>
        <div class="modal-footer">
            <button id="noticiasClanBotonAceptar" class="btn btn-default">Cerrar</button>
        </div>
    </div>
</article>

</body>
</html>
`;

    class NoticiasClan extends PopUp {
        constructor() {

            var options = {
                width: 500,
                height: 400,
                minWidth: 250,
                minHeight: 300
            };
            var $element = $(`<div>${htmlString}</div>`);
            super($element, options);

            this.$noticias = $("#noticiasClanNoticias");
            this.$enemigos = $("#noticiasClanEnemigos");
            this.$aliados = $("#noticiasClanAliados");
            this.$botonAceptar = $("#noticiasClanBotonAceptar");

            this.initCallbacks();
        }

        show(noticias, enemigos, aliados) {
            super.show();
            this.$noticias.text(noticias);
            this.$enemigos.text(enemigos.join('\n'));
            this.$aliados.text(aliados.join('\n'));
        }

        initCallbacks() {
            var self = this;

            this.$botonAceptar.click(function () {
                self.hide();
            });
        }

    }

    export default NoticiasClan;