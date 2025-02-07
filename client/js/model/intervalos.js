/**
 * Created by horacio on 2/9/16.
 */

import { Enums } from '../enums';

const createTimes = (time = 0) => ({
	ataque: time,
	ataqueConArco: time,
	hechizo: time,
	ataqueHechizo: time,
	hechizoAtaque: time,
	usarItemConU: time,
	usarItemConDobleClick: time,
	requestPostionUpdate: time,
	macroTrabajo: time,
	macroHechizo: time,
	domar: time,
	robar: time
});

const getTime = () => Date.now();

const init = (time) => {
	const state = {
		times: createTimes(time),
		INTERVALO_MACRO_TRABAJO: Math.floor(Enums.Intervalo.usarItemConU / 2) + 75, // dividido 2 porque la mitad en usar u la otra en clickear
		INTERVALO_MACRO_HECHIZO: Math.floor(Enums.Intervalo.hechizo / 2) + 75
	};
	return state;
};

const requestMacroTrabajo = (state) => {
	const time = getTime();
	if (time > state.times.macroTrabajo + state.INTERVALO_MACRO_TRABAJO) {
		state.times.macroTrabajo = time;
		return true;
	}
	return false;
};

const requestMacroHechizo = (state) => {
	const time = getTime();
	if (time > state.times.macroHechizo + state.INTERVALO_MACRO_HECHIZO) {
		state.times.macroHechizo = time;
		return true;
	}
	return false;
};

const requestPosUpdate = (state) => {
	const time = getTime();
	if (time > state.times.requestPostionUpdate + Enums.Intervalo.requestPostionUpdate) {
		state.times.requestPostionUpdate = time;
		return true;
	}
	return false;
};

const requestAtacar = (state) => {
	const time = getTime();
	if (time > state.times.ataqueConArco + Enums.Intervalo.ataqueConArco) {
		if (time > state.times.hechizoAtaque + Enums.Intervalo.hechizoAtaque) {
			if (time > state.times.ataque + Enums.Intervalo.ataque) {
				state.times.ataque = time;
				state.times.ataqueHechizo = time;
				return true;
			}
		}
	}
	return false;
};

const requestLanzarHechizo = (state) => {
	const time = getTime();
	if (time > state.times.ataqueConArco + Enums.Intervalo.ataqueConArco) {
		if (time > state.times.ataqueHechizo + Enums.Intervalo.ataqueHechizo) {
			if (time > state.times.hechizo + Enums.Intervalo.hechizo) {
				state.times.hechizo = time;
				state.times.hechizoAtaque = time;
				return true;
			}
		}
	}
	return false;
};

const requestAtacarConArco = (state) => {
	const time = getTime();
	if (time > state.times.ataqueConArco + Enums.Intervalo.ataqueConArco) {
		state.times.ataqueConArco = time;
		return true;
	}
	return false;
};

const requestUsarConU = (state) => {
	const time = getTime();
	if (time > state.times.usarItemConU + Enums.Intervalo.usarItemConU) {
		state.times.usarItemConU = time;
		return true;
	}
	return false;
};

const requestUsarConDobleClick = (state) => {
	const time = getTime();
	if (time > state.times.usarItemConDobleClick + Enums.Intervalo.usarItemConDobleClick) {
		state.times.usarItemConDobleClick = time;
		return true;
	}
	return false;
};

const requestDomar = (state) => {
	const time = getTime();
	if (time > state.times.domar + Enums.Intervalo.domar) {
		state.times.domar = time;
		return true;
	}
	return false;
};

const requestRobar = (state) => {
	const time = getTime();
	if (time > state.times.robar + Enums.Intervalo.robar) {
		state.times.robar = time;
		return true;
	}
	return false;
};

export {
	init,
	requestMacroTrabajo,
	requestMacroHechizo,
	requestPosUpdate,
	requestAtacar,
	requestLanzarHechizo,
	requestAtacarConArco,
	requestUsarConU,
	requestUsarConDobleClick,
	requestDomar,
	requestRobar
};
