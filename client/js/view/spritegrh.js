/**
 * Created by horacio on 3/10/16.
 * PixiJS migrations by ominousf: v4.0.3 to v6.4.2 on 03/25/2023
 * v6.4.2 to 7.4.0 on 24/02/2024
 */
import { AnimatedSprite, Texture, RenderTexture } from 'pixi.js';

class SpriteGrh extends AnimatedSprite {
	constructor(grh, cantLoops) {
		const placeholderTexture = RenderTexture.create({ width: 32, height: 32 });
		let nullFrames = [];
		nullFrames[0] = { texture: placeholderTexture };
		super(nullFrames);

		cantLoops = cantLoops || 0;

		this._velocidadSeteada = false;
		this._playedLoops = 0;
		this._cantLoops = cantLoops;
		this._realOnComplete = null;

		this.loop = cantLoops <= 0; // OJO; si loopea por default hace play apenas lo creas

		this.cambiarGrh(grh);

		var self = this;
		this.onComplete = function () {
			if (self._playedLoops < self._cantLoops) {
				self._playedLoops++;
				self.gotoAndStop(0);
				self.play();
			} else {
				self.gotoAndStop(0);
				if (this._realOnComplete) {
					this._realOnComplete();
				}
			}
		};

		this._posicionarGrafico();
	}

	setSize(w, h) {
		this.width = w;
		this.height = h;
		this._posicionarGrafico();
	}

	play() {
		if (this.textures && this.textures.length > 1) {
			this._playedLoops = 1;
			this._play();
		}
	}

	_play() {
		super.play();
	}

	setOnComplete(cb) {
		this._realOnComplete = cb;
	}

	_setSpeed(velocidad) {
		var duracion;
		if (this._velocidadSeteada) {
			duracion = this._velocidadSeteada;
		} else {
			duracion = velocidad;
		}
		if (this.textures && this.textures.length > 0) {
			var fps = (this.textures.length / duracion) * 1000;
			this.animationSpeed = fps / 60;
		} else {
			this.animationSpeed = 0;
		}
	}

	setSpeed(vel) {
		this._velocidadSeteada = vel;
		this._setSpeed();
	}

	setGridPositionChangeCallback(callback) {
		this._onGridPositionChange = callback;
	}

	setPosition(x, y) {
		this.x = x;
		this.y = y;
		var gridX = Math.round(x / 32);
		var gridY = Math.round(y / 32);
		if (gridX !== this._gridX || gridY !== this._gridY) {
			this._gridX = gridX;
			this._gridY = gridY;
			if (this._onGridPositionChange) {
				this._onGridPositionChange();
			}
		}
	}

	_posicionarGrafico() {
		var x = (this.width - 32) / 2 / this.width;
		var y = (this.height - 32) / this.height;
		this.anchor.set(x, y);
	}

	cambiarGrh(grh) {
		if (this._grh === grh) {
			return;
		}
		this._grh = grh;

		if (!grh) {
			this.gotoAndStop(0);
			return;
		}

		let grhAnimacion = !!grh.frames;

		if (grhAnimacion) {
			this.textures = grh.frames;
			this._setSpeed(grh.velocidad);
		} else {
			var aux = [];
			aux.push(grh);
			this.textures = aux;
		}
		if (!this.playing) {
			this.gotoAndStop(0);
		} else {
			this.gotoAndStop(this.currentFrame);
			super.play();
		}
		this._posicionarGrafico();
		if (grhAnimacion && this.loop) {
			this.play();
		}
	}
}

export default SpriteGrh;
