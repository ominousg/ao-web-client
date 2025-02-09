/**
 * Created by horacio on 5/3/16.
 * PixiJS migrations by ominousf: v4.0.3 to v6.4.2 on 03/25/2023
 * v6.4.2 to 7.4.0 on 24/02/2024
 */
import { Enums } from '../enums';
import Font from '../font';
import { Ticker } from 'pixi.js';
import * as Intervalos from './intervalos';

const init = (game, intervalosState, acciones) => {
	const state = {
		game,
		intervalosState,
		acciones,
		trabajando: false,
		lanzandoHechizo: false,
		boundUpdateTrabajar: null,
		boundUpdateHechizos: null
	};
	return state;
};

const toggleTrabajo = (state) => {
	if (state.trabajando) {
		terminarTrabajar(state);
	} else {
		comenzarTrabajar(state);
	}
};

const toggleHechizos = (state) => {
	if (state.lanzandoHechizo) {
		terminarLanzarHechizo(state);
	} else {
		comenzarLanzarHechizo(state);
	}
};

const comenzarTrabajar = (state) => {
	if (state.trabajando) {
		return;
	}
	if (!state.game.gameUI.interfaz.getSelectedSlotInventario()) {
		state.game.escribirMsgConsola(Enums.MensajeConsola.MACRO_TABAJO_REQUIERE_EQUIPAR, Font.WARNING);
		return;
	}
	state.game.gameUI.interfaz.setMacroTrabajo(true);
	state.game.escribirMsgConsola(Enums.MensajeConsola.MACRO_TRABAJO_ACTIVADO, Font.WARNING);
	state.boundUpdateTrabajar = () => updateTrabajar(state);
	Ticker.shared.add(state.boundUpdateTrabajar, state);
	state.trabajando = true;
};

const terminarTrabajar = (state) => {
	if (!state.trabajando) {
		return;
	}
	state.game.gameUI.interfaz.setMacroTrabajo(false);
	state.game.escribirMsgConsola(Enums.MensajeConsola.MACRO_TRABAJO_DESACTIVADO, Font.WARNING);
	Ticker.shared.remove(state.boundUpdateTrabajar, state);
	state.boundUpdateTrabajar = null;
	state.trabajando = false;
};

const updateTrabajar = (state) => {
	if (!Intervalos.requestMacroTrabajo(state.intervalosState)) {
		return;
	}
	if (state.game.trabajoPendiente) {
		state.acciones.click(true);
	} else {
		state.acciones.usarConU();
	}
};

const comenzarLanzarHechizo = (state) => {
	if (state.lanzandoHechizo) {
		return;
	}
	if (!state.game.gameUI.interfaz.getSelectedSlotHechizo()) {
		state.game.escribirMsgConsola(Enums.MensajeConsola.MACRO_HECHIZOS_REQUIRE_SELECCIONAR, Font.WARNING);
		return;
	}
	state.game.gameUI.interfaz.setMacroHechizos(true);
	state.game.escribirMsgConsola(Enums.MensajeConsola.MACRO_HECHIZOS_ACTIVADO, Font.WARNING);
	state.boundUpdateHechizos = () => updateHechizos(state);
	Ticker.shared.add(state.boundUpdateHechizos, state);
	state.lanzandoHechizo = true;
};

const terminarLanzarHechizo = (state) => {
	if (!state.lanzandoHechizo) {
		return;
	}
	state.game.gameUI.interfaz.setMacroHechizos(false);
	state.game.escribirMsgConsola(Enums.MensajeConsola.MACRO_HECHIZOS_DESACTIVADO, Font.WARNING);
	Ticker.shared.remove(state.boundUpdateHechizos, state);
	state.boundUpdateHechizos = null;
	state.lanzandoHechizo = false;
};

const updateHechizos = (state) => {
	if (!Intervalos.requestMacroHechizo(state.intervalosState)) {
		return;
	}
	if (state.game.trabajoPendiente) {
		state.acciones.click(true);
	} else {
		state.acciones.lanzarHechizo();
	}
};

const desactivarMacros = (state) => {
	terminarTrabajar(state);
	terminarLanzarHechizo(state);
};

export {
	init,
	toggleTrabajo,
	toggleHechizos,
	comenzarTrabajar,
	terminarTrabajar,
	comenzarLanzarHechizo,
	terminarLanzarHechizo,
	desactivarMacros
};
