/**
 * Created by horacio on 6/16/16.
 */
import PopUp from './popup';
import ClanesSearchTab from './tabs/clanesSearch';
import MiembrosClanTab from './tabs/miembrosclan';
import SolicitudesClanTab from './tabs/solicitudesclan';
import SettingsClanTab from './tabs/settingsclan';

const htmlString = `
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="../css/main.css" type="text/css">
</head>
<body>

<article id="clanes">
    <div style="height:100%; display: flex;  flex-direction: row;">

        <div class="tabsContainer" style="display: flex; flex-direction: column;">
            <ul class="nav nav-pills nav-stacked">
                <li id="clanesMainTabButton" class="icon-menu active" href="#clanesSearchTab" data-toggle="tab"></li>
                <li id="clanesMiembrosTabButton" class="icon-menu disabled" href="#clanesMiembrosTab" data-toggle="tab"></li>
                <li id="clanesSolicitudesTabButton" class="icon-menu disabled" href="#clanesSolicitudesTab" data-toggle="tab"></li>
                <li id="clanesSettingsTabButton" class="icon-menu disabled" href="#clanesSettingsTab" data-toggle="tab"></li>
            </ul>
            <div class="tabsFiller"></div>
        </div>


        <div class="tab-content dialogContent" style="flex: 1;">
            <div id="clanesSearchTab" class="tab-pane active">
                <h4>Clanes</h4>
                <div class="form-group">
                    <div class="input-group">
                        <input type="Search" placeholder="Nombre" class="form-control" id="clanesSearchTabInputNombre" aria-describedby="clanesSearchTabClanSearchIcon"/>
                    <span class="input-group-addon glyphicon glyphicon-search"
                          id="clanesSearchTabClanSearchIcon"></span>
                    </div>
                </div>
                <select multiple id="clanesSearchListaClanes" class="form-control">
                    <!-- <option>CLAN UNO</option> -->
                </select>
                <div class="btn-toolbar margenBoton">
                    <button id="clanesSearchBotonCrear" class="btn btn-primary">Crear</button>
                    <button id="clanesSearchBotonDetalles" class="btn btn-default">Detalles</button>
                    <button id="clanesSearchBotonIngresar" class="btn btn-primary">Aplicarse</button>
                </div>

            </div>

            <div id="clanesMiembrosTab" class="tab-pane">
                <h4>Noticias</h4>
                <button id="clanesMiembrosBotonNoticias" class="btn btn-default">Ver noticias</button>
                <h4>Miembros</h4>
                <div class="form-group">
                    <div class="input-group">
                        <input type="Search" placeholder="Nombre" class="form-control" id="clanesMiembrosTabInputNombre"/>
                        <span class="input-group-addon glyphicon glyphicon-search"></span>
                    </div>
                </div>

                <select multiple id="clanesMembersList" class="form-control">
                </select>

                <div class="btn-toolbar margenBoton">
                    <button id="clanesMiembrosBotonDetalles" class="btn btn-default">Detalles</button>
                    <button id="clanesMiembrosBotonHechar" class="btn btn-primary">Hechar</button>
                </div>
            </div>

            <div id="clanesSolicitudesTab" class="tab-pane">
                <h4>Solicitudes de ingreso</h4>
                <select id="clanesMembershipRequestList" class="form-control" size="4"></select>

                <div class="btn-toolbar margenBoton">
                    <button id="clanesLiderBotonVerPeticion" class="btn btn-default pull-left">Ver mensaje</button>
                    <button id="clanesLiderBotonDetalles" class="btn btn-default pull-left">Mas detalles</button>
                    <button id="clanesLiderBotonAceptar" class="btn btn-primary pull-right">Aceptar</button>
                    <button id="clanesLiderBotonRechazar" class="btn btn-primary pull-right">Rechazar</button>
                </div>
            </div>

            <div id="clanesSettingsTab" class="tab-pane">
                <p>NO IMPLEMENTADO!</p>
                TODO: hacerlo igual al menu que se muestra al crear y que lo edites directamente de ahi, no con botones
                <button id="TBD_1" class="btn btn-default">Editar codex</button>
                <button id="TBD_2" class="btn btn-default">Editar noticias</button>
                <button id="TBD_3" class="btn btn-default">Editar descripcion</button>
                <button id="TBD_4" class="btn btn-default">Editar website</button>
                <button id="TBD_5" class="btn btn-default">Propuestas de paz</button>
            </div>
        </div>

    </div>
</article>

</body>
</html>
`;

class Clanes extends PopUp {
	constructor(game, detallesClan, showMensajeCb, solicitudClanCb) {
		var options = {
			title: 'CLANES',
			width: 550,
			height: 500,
			minWidth: 250,
			minHeight: 150
		};
		var $element = $(`<div>${htmlString}</div>`);
		super($element, options);

		this.game = game;
		this.detallesClan = detallesClan;
		this.showMensajeCb = showMensajeCb;

		this.searchTab = new ClanesSearchTab(game, detallesClan, showMensajeCb, solicitudClanCb);
		this.miembrosTab = new MiembrosClanTab(game, showMensajeCb);
		this.solicitudesTab = new SolicitudesClanTab(game, showMensajeCb);
		this.settingsTab = new SettingsClanTab();

		this.$miembrosTabButton = $('#clanesMiembrosTabButton');
		this.$solicitudesTabButton = $('#clanesSolicitudesTabButton');
		this.$settingsTabButton = $('#clanesSettingsTabButton');

		this._initTabs();
		this.initCallbacks();
	}

	show() {
		super.show();
		this.game.client.sendRequestGuildLeaderInfo();
	}

	setNombresClanes(nombresClanes) {
		this.searchTab.setNombresClanes(nombresClanes);
	}

	setNombresMiembros(nombresMiembros) {
		this._activarTab(this.$miembrosTabButton);
		this.miembrosTab.setNombresMiembros(nombresMiembros);
	}

	setNombresSolicitantes(nombresSolicitantes) {
		this._activarTab(this.$solicitudesTabButton);
		this._activarTab(this.$settingsTabButton);
		this.solicitudesTab.setNombresSolicitantes(nombresSolicitantes);
	}

	hide(incomingFromServer) {
		super.hide();
		this._desactivarTab(this.$solicitudesTabButton);
		this._desactivarTab(this.$miembrosTabButton);
		this._desactivarTab(this.$settingsTabButton);
	}

	initCallbacks() {
		var self = this;
	}

	_initTabs() {
		this._inicializarTabDesactivable(this.$solicitudesTabButton);
		this._inicializarTabDesactivable(this.$miembrosTabButton);
		this._inicializarTabDesactivable(this.$settingsTabButton);
	}

	clearDom() {
		super.clearDom();
	}
}

export default Clanes;
