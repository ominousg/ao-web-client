/**
 * Created by horacio on 6/20/16.
 */

import PopUp from "./popup";

const htmlString = `
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="../css/main.css" type="text/css">
</head>
<body>


<article id="herreria">
    <div class="dialogContent">
        <h4>Construccion</h4>
        <p>Items disponibles para construir:</p>

        <div class="scrollFlex" style="overflow-y:scroll;max-height:310px">
            <table id="herreriaContenedorItems" class="table table-striped">
                <!-- Ejemplo de llenado
                <tr>
                    <td>[imagen] objeto</td>
                    <td>requerimientos</td>
                    <td>botons construir</td>
                </tr>
    -->
            </table>
        </div>

        <div class="form-inline modal-footer">
            <label for="herreriaCantidadAConstruir">Cantidad:</label>
            <div class="form-group">
                <input id="herreriaCantidadAConstruir" type="number" class="form-control" min="1">
            </div>
        </div>
    </div>
</article>

</body>
</html>
`;

    class Herreria extends PopUp {
        constructor(game) {

            var options = {
                title: "HERRERIA",
                width: 500,
                height: 500,
                minWidth: 250,
                minHeight: 400
            };
            var $element = $(`<div>${htmlString}</div>`);
            super($element, options);

            this.items = new Set();
            this.game = game;
            //this.initCallbacks();
            this.$itemsContainer = $("#herreriaContenedorItems");
        }

        /*Item contiene:
         Name: Name,
         GrhIndex: GrhIndex,
         LingH: LingH,
         LingP: LingP,
         LingO: LingO,
         ArmasHerreroIndex: ArmasHerreroIndex,
         ObjUpgrade: ObjUpgrade,
         */
        setItems(items) {
            //TODO objUpgrade

            var self = this;
            for (var item of items) {
                const isItemUnique = self.items.has(item.Name);
                self.items.add(item.Name);
    
                if (isItemUnique) continue;

                var $row = $('<tr></tr>');

                var numGraf = this.game.assetManager.getNumCssGraficoFromGrh(item.GrhIndex);
                var url = "url(graficos/css/" + numGraf + ".png)";

                var $cell = $('<td></td>');
                var $imagenItem = $('<div class="divImagen" style="width: 50px; height:50px;"></div>');
                $imagenItem.css('background-image', url);
                $cell.append($imagenItem);

                $row.append($cell);

                var $cellRequerimientos = $('<td></td>');
                $cellRequerimientos.text('Require lingote hierro: ' + item.LingH + " , lingote plata " + item.LingP + " y lingote de oro: " + item.LingO);
                // TODO: graficos madera y madera elfica
                $row.append($cellRequerimientos);

                var $cellConstruir = $('<td></td>');
                var $botonConstruir = $('<button class="btn btn-default" >Construir</button>');

                $botonConstruir.data("itemIndex", item.ArmasHerreroIndex);
                $botonConstruir.click(function () {
                    var cantidadAConstruir = $('#herreriaCantidadAConstruir').val();
                    self.game.client.sendInitCrafting(cantidadAConstruir, cantidadAConstruir);//TODO: horrible esto, que se haga de 1 (cambiar sv)
                    var itemIndex = $(this).data("itemIndex");
                    self.game.client.sendCraftBlacksmith(itemIndex);
                });
                $cellConstruir.append($botonConstruir);
                $row.append($cellConstruir);
                this.$itemsContainer.append($row);
            }
        }

        setWeapons(items) {
            /*Item contiene:
             Name: Name,
             GrhIndex: GrhIndex,
             LingH: LingH,
             LingP: LingP,
             LingO: LingO,
             ArmasHerreroIndex: ArmasHerreroIndex,
             ObjUpgrade: ObjUpgrade,
             */
            this.setItems(items);
        }

        setArmors(items) {
            /* Item contiene
             Name: Name,
             GrhIndex: GrhIndex,
             LingH: LingH,
             LingP: LingP,
             LingO: LingO,
             ArmasHerreroIndex: ArmasHerreroIndex,
             ObjUpgrade: ObjUpgrade,
             */
            this.setItems(items);
        }
    }

    export default Herreria;
