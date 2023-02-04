/**
 * Created by horacio on 6/17/16.
 */
import PopUp from "./popup";

const htmlString = `
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="../css/main.css" type="text/css">
</head>
<body>

<article id="carpinteria" title="CARPINTERIA">
    <div class="dialogContent">
        <h4>Construccion</h4>
        <span id="carpinteriaTexto"></span>

        <div class="scrollFlex">
            <table id="carpinteriaContenedorItems" class="table table-striped">
                <!-- Ejemplo de llenado
                <tr>
                    <td>[imagen] objeto</td>
                    <td>requerimientos</td>
                    <td>botons construir</td>
                </tr>-->
            </table>
        </div>
        <div class="form-inline modal-footer">
            <label for="carpinteriaCantidadAConstruir">Cantidad:</label>
            <div class="form-group">
                <input id="carpinteriaCantidadAConstruir" style="width:100px;" type="number" class="form-control" min="1">
            </div>
        </div>
    </div>
</article>

</body>
</html>
`;

    class Carpinteria extends PopUp {
        constructor(game) {

            var options = {
                width: 500,
                height: 400,
                minWidth: 250,
                minHeight: 300
            };
            var $element = $(`<div>${htmlString}</div>`);
            super($element, options);

            this.game = game;
            this.initCallbacks();
            this.$itemsContainer = $("#carpinteriaContenedorItems");
            this.$carpinteriaTexto = $("#carpinteriaTexto");
        }

        /* Items contiene
         Name: Name,
         GrhIndex: GrhIndex,
         Madera: Madera,
         MaderaElfica: MaderaElfica,
         ObjCarpinteroIndex: ObjCarpinteroIndex,
         ObjUpgrade: ObjUpgrade,
         */

        show(items) {
            super.show();
            this.setItems(items);
        }

        setItems(items) {
            //TODO objUpgrade
            if (items.length < 1) {
                this.$carpinteriaTexto.text("No puedes construir ningun objeto porque no tienes suficientes puntos en carpinteria");
                // TODO: decir que no peude construir items pq le falta skills
            } else{
                this.$carpinteriaTexto.text("");
            }

            var self = this;
            for (var item of items) {

                var $row = $('<tr></tr>');

                var numGraf = this.game.assetManager.getNumCssGraficoFromGrh(item.GrhIndex);
                var url = "url(graficos/" + numGraf + ".png)";

                var $cell = $('<td></td>');
                var $imagenItem = $('<div class="divImagen" style="width: 50px; height:50px;"></div>');
                $imagenItem.css('background-image', url);
                $cell.append($imagenItem);

                $row.append($cell);

                var $cellRequerimientos = $('<td></td>');
                $cellRequerimientos.text('Require madera: ' + item.Madera + " y madera elfica " + item.MaderaElfica);
                // TODO: graficos madera y madera elfica
                $row.append($cellRequerimientos);

                var $cellConstruir = $('<td></td>');
                var $botonConstruir = $('<button class="btn btn-default" >Construir</button>');

                $botonConstruir.data("itemIndex", item.ObjCarpinteroIndex);
                $botonConstruir.click(function () {
                    var cantidadAConstruir = $('#carpinteriaCantidadAConstruir').val();
                    self.game.client.sendInitCrafting(cantidadAConstruir, 1);//TODO: horrible esto, que se haga de 1 (cambiar sv)
                    var itemIndex = $(this).data("itemIndex");
                    self.game.client.sendCraftCarpenter(itemIndex);
                });
                $cellConstruir.append($botonConstruir);
                $row.append($cellConstruir);
                this.$itemsContainer.append($row);
            }
        }

        initCallbacks() {

        }
    }

    export default Carpinteria;
