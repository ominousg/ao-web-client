/**
 * Created by horacio on 3/24/16.
 */
import PopUp from "./popup";
import ItemGrid from "../game/itemgrid";
const htmlString = `
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="../css/main.css" type="text/css">
</head>

<style>
    // body {
    //     background: green;
    // }
</style>

<body>

<article id="boveda">
    <div class="dialogContent">
        <div class="styledDiv">
            <div class="horizontal_center" style="margin:8px 0;">
                <div>
                    <span id="bovedaOroDisponibleLabel" class="secondaryColor">ORO DISPONIBLE</span>
                    <span id="bovedaOroDisponibleVal" class="everywhereBoldFont activeColor">834</span>
                </div>
            </div>

            <div class="justifiedContainer" style="margin-bottom: 15px;">
                <button id="bovedaBotonRetirarOro" class="btn btn-default">Retirar oro</button>
                <input id="bovedaInputCantidadOro" class="form-control" type="number" value="1">
                <button id="bovedaBotonDepositarOro" class="btn btn-default">Depositar oro</button>
            </div>
        </div>


        <div style="text-align:center; margin: 5px 0;">
            <span id="bovedaNombreLabel" class="secondaryColor">NOMBRE: </span>
            <span id="bovedaNombreVal" class="activeColor">Pollo</span>
        </div>
        <div class="justifiedContainer">
            <div>
                <span id="bovedaMinLabel" class="secondaryColor">MIN</span>
                <span id="bovedaMinVal" class="everywhereBoldFont activeColor">1</span>
            </div>
            <div>
                <span id="bovedaMaxVal" class="everywhereBoldFont activeColor">3</span>
                <span id="bovedaMaxLabel" class="secondaryColor">MAX</span>
            </div>
        </div>

        <div style="margin:10px auto; width:100%; display:flex; flex:1; overflow-y:scroll;max-height:210px">
            <ul id="bovedaGridComprar" class="itemgrid"></ul>
            <ul id="bovedaGridVender" class="itemgrid"></ul>
        </div>

        <div class="modal-footer justifiedContainer">
            <button id="bovedaBotonRetirarItem" class="btn btn-default noClickSound">Retirar</button>
            <input id="bovedaInputCantidadItem" class="form-control" type="number" value="1">
            <button id="bovedaBotonDepositarItem" class="btn btn-default noClickSound">Depositar</button>
        </div>
    </div>
</article>

</body>
</html>
`;

    class Boveda extends PopUp {
        constructor(game, acciones) {
            var options = {
                title: "BOVEDA",
                width: 630,
                height: 510,
                minWidth: 250,
                minHeight: 200
            };
            var $element = $(`<div>${htmlString}</div>`);
            super($element, options);
            this.game = game;
            this.acciones = acciones;

            this.shopGrid = new ItemGrid("bovedaGridComprar",40);
            this.userGrid = new ItemGrid("bovedaGridVender",40);
            this.initCallbacks();
            this.completarLabels("","","","","","");
        }

        show() {
            super.show();
            var self = this;
            this.userGrid.clear();

            this.game.inventario.forEachSlot(
                function (slot) {
                    var numGraf = self.game.assetManager.getNumCssGraficoFromGrh(slot.grh);
                    self.userGrid.modificarSlot(slot.numero, slot.cantidad, numGraf);
                });

            this.shopGrid.deselect();
            this.userGrid.deselect();
        }

        hide(incomingFromServer) {
            super.hide();
            if (!incomingFromServer) {
                this.acciones.cerrarBoveda();
            }
        }

        cambiarSlotRetirar(Slot, Amount, numGrafico) {
            this.shopGrid.modificarSlot(Slot, Amount, numGrafico);
        }

        cambiarSlotDepositar(Slot, Amount, numGrafico) {
            this.userGrid.modificarSlot(Slot, Amount, numGrafico);
        }

        borrarSlotRetirar(slot) {
            this.shopGrid.borrarItem(slot);
        }

        borrarSlotDepositar(slot) {
            this.userGrid.borrarItem(slot);
        }

        setOroDisponible(oro) {
            $("#bovedaOroDisponibleLabel").text("ORO DISPONIBLE");
            $("#bovedaOroDisponibleVal").text(oro);
        }

        initCallbacks() {
            var self = this;

            $("#bovedaBotonRetirarOro").click(function () {
                var inputCantidad = $("#bovedaInputCantidadOro").val();
                if (!isNaN(inputCantidad)) {
                    if (inputCantidad > 0) {
                        self.acciones.retirarOro(inputCantidad);
                    }
                }
            });

            $("#bovedaBotonDepositarOro").click(function () {
                var inputCantidad = $("#bovedaInputCantidadOro").val();
                if (!isNaN(inputCantidad)) {
                    if (inputCantidad > 0) {
                        self.acciones.depositarOro(inputCantidad);
                    }
                }
            });

            $("#bovedaBotonRetirarItem").click(function () {
                var slot = self.shopGrid.getSelectedSlot();
                if (slot) {
                    var inputCantidad = $("#bovedaInputCantidadItem").val();
                    if (isNaN(inputCantidad) || (inputCantidad < 0) || !inputCantidad) {
                        inputCantidad = 1;
                    }
                    self.acciones.retirarItem(slot, inputCantidad);
                }
            });

            $("#bovedaBotonDepositarItem").click(function () {
                var slot = self.userGrid.getSelectedSlot();
                if (slot) {
                    var inputCantidad = $("#bovedaInputCantidadItem").val();
                    if (isNaN(inputCantidad) || (inputCantidad < 0) || !inputCantidad) {
                        inputCantidad = 1;
                    }
                    self.acciones.depositarItem(slot, inputCantidad);
                }
            });

            this.shopGrid.setSelectionCallback(
                function (slot) {
                    var item = self.game.inventarioShop.getSlot(slot);
                    self.displayItemData(item);
                });

            this.userGrid.setSelectionCallback(
                function (slot) {
                    var item = self.game.inventario.getSlot(slot);
                    self.displayItemData(item);
                });
        }

        displayItemData(item) {
            var minLabel = "";
            var maxLabel = "";

            if (item.minDef) {
                minLabel = "MIN DEFENSA";
            }
            if (item.minHit) {
                minLabel = "MIN GOLPE";
            }

            if (item.maxDef) {
                maxLabel = "MAX DEFENSA";
            }
            if (item.maxHit) {
                maxLabel = "MAX GOLPE";
            }

            var minVal = item.minDef || item.minHit;
            var maxVal = item.maxDef || item.maxHit;

            this.completarLabels(item.objName.toUpperCase(), minLabel, minVal, maxLabel, maxVal);
        }

        completarLabels(nombreVal, minLabel, minVal, maxLabel, maxVal) {
            if (!minLabel) {
                minVal = "";
            }
            if (!maxLabel) {
                maxVal = "";
            }
            
            $('#bovedaNombreVal').text(nombreVal);
            $('#bovedaMinLabel').text(minLabel);
            $('#bovedaMinVal').text(minVal);
            $('#bovedaMaxLabel').text(maxLabel);
            $('#bovedaMaxVal').text(maxVal);
        }
    }

    export default Boveda;
