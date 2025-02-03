/**
 * Created by horacio on 9/1/16.
 */

import { Enums } from '../enums';
import * as Renderer from '../view/renderer';

const init = (renderer, audio) => ({
	renderer,
	audio,
	_lloviendo: null,
	_bajoTecho: null,
	_outdoor: null
});

const setLloviendo = (state, lloviendo) => {
	if (state._lloviendo === lloviendo) {
		return;
	}

	state._lloviendo = lloviendo;

	if (!state._outdoor) {
		return;
	}

	if (lloviendo) {
		state.audio.clima.iniciarLluvia(state._bajoTecho);
		Renderer.createLluvia(state.renderer);
	} else {
		state.audio.clima.finalizarLluvia(state._bajoTecho);
		Renderer.removeLluvia(state.renderer);
	}
};

const setOutdoor = (state, outdoor) => {
	if (state._outdoor === outdoor) {
		return;
	}

	state._outdoor = outdoor;

	if (state._outdoor) {
		if (state._lloviendo) {
			state.audio.clima.playLoopLluvia(state._bajoTecho);
			Renderer.createLluvia(state.renderer);
		}
	} else {
		if (state._lloviendo) {
			state.audio.clima.finalizarLluvia(state._bajoTecho);
			Renderer.removeLluvia(state.renderer);
		}
	}
};

const setBajoTecho = (state, bajoTecho) => {
	if (state._bajoTecho === bajoTecho) {
		return;
	}

	state._bajoTecho = bajoTecho;
	Renderer.setBajoTecho(state.renderer, bajoTecho);

	if (state._lloviendo && state._outdoor) {
		state.audio.clima.playLoopLluvia(bajoTecho);
	}
};

const getLloviendo = (state) => state._lloviendo;
const getBajoTecho = (state) => state._bajoTecho;
const getOutdoor = (state) => state._outdoor;

export { init, setLloviendo, setOutdoor, setBajoTecho, getLloviendo, getBajoTecho, getOutdoor };
