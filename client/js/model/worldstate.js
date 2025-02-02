/**
 * Created by horacio on 9/1/16.
 */

import { Enums } from '../enums';
import * as Renderer from '../view/renderer';

class WorldState {
	constructor(renderer, audio) {
		this.renderer = renderer;
		this.audio = audio;

		this._lloviendo = null;
		this._bajoTecho = null;
		this._outdoor = null;
	}

	set lloviendo(lloviendo) {
		if (this._lloviendo === lloviendo) {
			return;
		}
		this._lloviendo = lloviendo;
		if (!this.outdoor) {
			return;
		}
		if (lloviendo) {
			this.audio.clima.iniciarLluvia(this.bajoTecho);
			Renderer.createLluvia(this.renderer);
		} else {
			this.audio.clima.finalizarLluvia(this.bajoTecho);
			Renderer.removeLluvia(this.renderer);
		}
	}

	set outdoor(outdoor) {
		if (this._outdoor === outdoor) {
			return;
		}
		this._outdoor = outdoor;
		if (this._outdoor) {
			if (this._lloviendo) {
				this.audio.clima.playLoopLluvia(this.bajoTecho);
				Renderer.createLluvia(this.renderer);
			}
		} else {
			if (this._lloviendo) {
				this.audio.clima.finalizarLluvia(this.bajoTecho);
				Renderer.removeLluvia(this.renderer);
			}
		}
	}

	set bajoTecho(bajoTecho) {
		if (this._bajoTecho === bajoTecho) {
			return;
		}
		this._bajoTecho = bajoTecho;
		Renderer.setBajoTecho(this.renderer, bajoTecho);
		if (this.lloviendo && this.outdoor) {
			this.audio.clima.playLoopLluvia(bajoTecho);
		}
	}

	get lloviendo() {
		return this._lloviendo;
	}

	get bajoTecho() {
		return this._bajoTecho;
	}

	get outdoor() {
		return this._outdoor;
	}
}

export default WorldState;
