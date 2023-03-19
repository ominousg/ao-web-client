/**
 * Created by horacio on 5/2/16.
 */

import PopUp from "./popup";
import ConfigurarTeclasTab from "./tabs/configurarteclas";
import AudioTab from "./tabs/audiotab";
import Screenfull from "../../lib/screenfull";

const htmlString = `
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="../css/main.css" type="text/css">
</head>
<body>

<article id="popUpOpciones">

    <div style="height:100%; display: flex;  flex-direction: row;">

        <div class="tabsContainer" style="display: flex; flex-direction: column;">
            <ul class="nav nav-pills nav-stacked">
                <li class="icon-menu active" id="opcionesIconoMenuWrench" href="#popUpOpcionesOpcionesGenerales"
                    data-toggle="tab"></li>
                <li class="icon-menu" id="opcionesIconoMenuAudio" href="#popUpOpcionesTabsAudio" data-toggle="tab"></li>
                <li class="icon-menu" id="opcionesIconoMenuTeclado" href="#configurarTeclas" data-toggle="tab"></li>
            </ul>
            <div class="tabsFiller"></div>
        </div>


        <div class="tab-content dialogContent" style="flex: 1;">

            <div id="popUpOpcionesOpcionesGenerales" class="tab-pane active">
                <div class="form-horizontal">
                    <p class="bg-warning">Los controles de esta pestaña no andan todabia, los de audio y teclas si.</p>
                    <h4>Pantalla</h4>
                    <div class="form-group">
                        <label for="opcionesSliderPantalla" class="col-sm-6 control-label">Tamaño pantalla:</label>
                        <div class="col-sm-6">
                            <div id="opcionesSliderPantalla"></div>
                        </div>
                    </div>


                    <div class="checkbox">
                        <label><input id="opcionesCheckboxFullscreen" type="checkbox" value="">Pantalla completa</label>
                    </div>
                    <div class="checkbox">
                        <label><input type="checkbox" value="">Graficar lluvia</label>
                    </div>
                    <div class="checkbox">
                        <label><input type="checkbox" value="">Mostrar FPS</label>
                    </div>
                    <div class="checkbox">
                        <label><input type="checkbox" value="">Mostrar ping</label>
                    </div>
                    <h4>Interfaz</h4>

                    <div class="form-group">
                        <label for="opcionesSelectIdioma" class="col-sm-6 control-label">Lenguaje:</label>
                        <div class="col-sm-6">
                            <select class="form-control" id="opcionesSelectIdioma">
                                <option>Español</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="opcionesSelectTamañoInterfaz" class="col-sm-6 control-label">Tamaño
                            interfaz:</label>
                        <div class="col-sm-6">
                            <select class="form-control" id="opcionesSelectTamañoInterfaz">
                                <option>Normal</option>
                            </select>
                        </div>
                    </div>


                    <div class="checkbox">
                        <label><input type="checkbox" value="">Desabilitar cerrar ventana con ESC</label>
                    </div>

                    <button class="btn btn-default">Restaurar defaults</button>
                </div>
            </div>

            <div id="popUpOpcionesTabsAudio" class="tab-pane">
                <div class="form-horizontal">
                    <div class="checkbox">
                        <label><input id="checkboxMusica" type="checkbox" value="">Musica activada</label>
                    </div>
                    <div class="checkbox">
                        <label><input id="checkboxSonido" type="checkbox" value="">Sonido activado</label>
                    </div>
                    <div class="checkbox">
                        <label><input id="checkboxSonidoLluvia" type="checkbox" value="">Sonido lluvia activado</label>
                    </div>
                    <div class="checkbox">
                        <label><input type="checkbox" value="">Silenciar cuando la ventana esta oculta</label>
                    </div>

                    <div class="form-group">
                        <label for="sliderMusica" class="col-sm-6 control-label">Volumen Musica:</label>
                        <div class="col-sm-6">
                            <div id="sliderMusica"></div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="sliderSonido" class="col-sm-6 control-label">Volumen Sonido:</label>
                        <div class="col-sm-6">
                            <div id="sliderSonido"></div>
                        </div>
                    </div>

                    <!-- TODO!
                    <div>
                        Volumen UI:
                        <div style="display:inline-block; width:40%; float:right; padding-right:15px;">
                            <div id="sliderVolumenUI"></div>
                        </div>
                    </div> -->
                    <button class="btn btn-default">Restaurar defaults</button>
                </div>
            </div>

            <div id="configurarTeclas" class="tab-pane" style="width:100%;height:100%;">
                <div style="width:100%;height:100%;display:flex; flex-direction: column;">
                    <div class="scrollFlex">
                        <div class="panel-group">
                            <div class="panel panel-default">
                                <div class="panel-heading-collapse" data-toggle="collapse"
                                     href="#opcinesTeclasPanelMovimiento">
                                    <h4 class="panel-title">
                                        Movimiento
                                    </h4>
                                </div>
                                <div id="opcinesTeclasPanelMovimiento" class="panel-collapse collapse">
                                    <table class="table">
                                        <tr>
                                            <td>Caminar norte</td>
                                            <td><input id="configurarTecla_caminarNorte" class="form-control"></td>
                                        </tr>
                                        <tr>
                                            <td>Caminar sur</td>
                                            <td><input id="configurarTecla_caminarSur" class="form-control"></td>
                                        </tr>
                                        <tr>
                                            <td>Caminar oeste</td>
                                            <td><input id="configurarTecla_caminarOeste" class="form-control"></td>
                                        </tr>
                                        <tr>
                                            <td>Caminar este</td>
                                            <td><input id="configurarTecla_caminarEste" class="form-control"></td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading-collapse" data-toggle="collapse"
                                     href="#opcinesTeclasPanelAcciones">
                                    <h4 class="panel-title">
                                        Acciones
                                    </h4>
                                </div>
                                <div id="opcinesTeclasPanelAcciones" class="panel-collapse collapse">
                                    <table class="table">
                                        <tr>
                                            <td>Atacar</td>
                                            <td><input id="configurarTecla_atacar" class="form-control"></td>
                                        </tr>
                                        <tr>
                                            <td>Agarrar</td>
                                            <td><input id="configurarTecla_agarrar" class="form-control"></td>
                                        </tr>
                                        <tr>
                                            <td>Equipar</td>
                                            <td><input id="configurarTecla_equipar" class="form-control"></td>
                                        </tr>
                                        <tr>
                                            <td>Tirar</td>
                                            <td><input id="configurarTecla_tirar" class="form-control"></td>
                                        </tr>
                                        <tr>
                                            <td>Usar</td>
                                            <td><input id="configurarTecla_usar" class="form-control"></td>
                                        </tr>
                                        <tr>
                                            <td>Ocultarse</td>
                                            <td><input id="configurarTecla_ocultarse" class="form-control"></td>
                                        </tr>
                                        <tr>
                                            <td>Corregir posicion</td>
                                            <td><input id="configurarTecla_deslagear" class="form-control"></td>
                                        </tr>

                                        <tr>
                                            <td>Meditar</td>
                                            <td><input id="configurarTecla_meditar" class="form-control"></td>
                                        </tr>

                                        <tr>
                                            <td>Domar</td>
                                            <td><input id="configurarTecla_domar" class="form-control"></td>
                                        </tr>

                                        <tr>
                                            <td>Robar</td>
                                            <td><input id="configurarTecla_robar" class="form-control"></td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading-collapse" data-toggle="collapse"
                                     href="#opcinesTeclasPanelMacros">
                                    <h4 class="panel-title">
                                        Macros
                                    </h4>
                                </div>
                                <div id="opcinesTeclasPanelMacros" class="panel-collapse collapse">
                                    <table class="table">
                                        <tr>
                                            <td>Macro hechizos</td>
                                            <td><input id="configurarTecla_macroHechizos" class="form-control"></td>
                                        </tr>
                                        <tr>
                                            <td>Macro trabajo</td>
                                            <td><input id="configurarTecla_macroTrabajo" class="form-control"></td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading-collapse" data-toggle="collapse"
                                     href="#opcinesTeclasPanelChat">
                                    <h4 class="panel-title">
                                        Chat
                                    </h4>
                                </div>
                                <div id="opcinesTeclasPanelChat" class="panel-collapse collapse">
                                    <table class="table">
                                        <tr>
                                            <td>Chat</td>
                                            <td><input id="configurarTecla_chat" class="form-control"></td>
                                        </tr>

                                        <tr>
                                            <td>Chat clan</td>
                                            <td><input id="configurarTecla_chatClan" class="form-control"></td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="btn-toolbar">
                            <button id="configurarTeclasRestaurarDefault" class="btn btn-default pull-left">Restaurar
                                Default
                            </button>
                            <button id="configurarTeclasGuardarYSalir" class="btn btn-primary pull-right">Guardar y
                                salir
                            </button>
                            <button id="configurarTeclasCancelar" class="btn btn-default pull-right">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</article>

</body>
</html>
`;

    class Opciones extends PopUp {
        constructor(game, storage, updateKeysCallback, showMensajeCallback) {
            var options = {
                title: "AJUSTES",
                width: 500,
                height: 600,
                minWidth: 250,
                minHeight: 400
            };
            var $element = $(`<div>${htmlString}</div>`);
            super($element, options);
            this.configurarTeclasTab = new ConfigurarTeclasTab(storage, updateKeysCallback, showMensajeCallback);
            this.audioTab = new AudioTab(game, storage);
            this.initCallbacks();
            this._initFullScreenListener();
            var self = this;
            this.configurarTeclasTab.setCerrarCallback(function () {
                self.hide();
            });
        }

        show() {
            super.show();
            this.audioTab.onShow();
            this.configurarTeclasTab.onShow();
        }

        hide() {
            super.hide();
            this.audioTab.onHide();
            this.configurarTeclasTab.onHide();
        }

        _initFullScreenListener(){
            if (Screenfull.enabled) {
                document.addEventListener(Screenfull.raw.fullscreenchange, () => {
                    $("#opcionesCheckboxFullscreen").prop('checked', Screenfull.isFullscreen);
                });
            }
        }

        initCallbacks() {
            var self = this;

            $("#opcionesCheckboxFullscreen").change(function () {
                if (!Screenfull.enabled) {
                    alert("No es posible jugar en pantalla completa");
                    this.checked = false;
                    return;
                }
                if (this.checked) {
                    Screenfull.request();
                } else {
                    Screenfull.exit();
                }
            });

            $('#opcionesSliderPantalla').slider({
                range: "min",
            });
        }

    }

    export default Opciones;
