/**
 * Created by horacio on 3/10/16.
 * PixiJS migrations by ominousf: v4.0.3 to v6.4.2 on 03/25/2023
 * v6.4.2 to 7.4.0 on 24/02/2024
 */
import { AnimatedSprite, Texture, RenderTexture } from 'pixi.js';

const createPlaceholderSprite = () => {
	const placeholderTexture = RenderTexture.create({ width: 32, height: 32 });
	let nullFrames = [];
	nullFrames[0] = { texture: placeholderTexture };
	return new AnimatedSprite(nullFrames);
};

const init = (grh, cantLoops = 0) => {
	const sprite = createPlaceholderSprite();

	sprite._velocidadSeteada = false;
	sprite._playedLoops = 0;
	sprite._cantLoops = cantLoops;
	sprite._realOnComplete = null;
	sprite.loop = cantLoops <= 0; // OJO; si loopea por default hace play apenas lo creas

	sprite.onComplete = () => {
		if (sprite._playedLoops < sprite._cantLoops) {
			sprite._playedLoops++;
			sprite.gotoAndStop(0);
			sprite.play();
		} else {
			sprite.gotoAndStop(0);
			if (sprite._realOnComplete) {
				sprite._realOnComplete();
			}
		}
	};

	cambiarGrh(sprite, grh);
	posicionarGrafico(sprite);

	return sprite;
};

const setSize = (sprite, w, h) => {
	sprite.width = w;
	sprite.height = h;
	posicionarGrafico(sprite);
};

const play = (sprite) => {
	if (sprite.textures && sprite.textures.length > 1) {
		sprite._playedLoops = 1;
		sprite.play();
	}
};

const setOnComplete = (sprite, cb) => {
	sprite._realOnComplete = cb;
};

const setSpeed = (sprite, velocidad) => {
	sprite._velocidadSeteada = velocidad;
	setSpeedInternal(sprite);
};

const setSpeedInternal = (sprite, velocidad) => {
	const duracion = sprite._velocidadSeteada || velocidad;

	if (sprite.textures && sprite.textures.length > 0) {
		const fps = (sprite.textures.length / duracion) * 1000;
		sprite.animationSpeed = fps / 60;
	} else {
		sprite.animationSpeed = 0;
	}
};

const setGridPositionChangeCallback = (sprite, callback) => {
	sprite._onGridPositionChange = callback;
};

const setPosition = (sprite, x, y) => {
	sprite.x = x;
	sprite.y = y;
	const gridX = Math.round(x / 32);
	const gridY = Math.round(y / 32);

	if (gridX !== sprite._gridX || gridY !== sprite._gridY) {
		sprite._gridX = gridX;
		sprite._gridY = gridY;
		if (sprite._onGridPositionChange) {
			sprite._onGridPositionChange();
		}
	}
};

const posicionarGrafico = (sprite) => {
	const x = (sprite.width - 32) / 2 / sprite.width;
	const y = (sprite.height - 32) / sprite.height;
	sprite.anchor.set(x, y);
};

const cambiarGrh = (sprite, grh) => {
	if (sprite._grh === grh) {
		return;
	}
	sprite._grh = grh;

	if (!grh) {
		sprite.gotoAndStop(0);
		return;
	}

	const grhAnimacion = !!grh.frames;

	if (grhAnimacion) {
		sprite.textures = grh.frames;
		setSpeedInternal(sprite, grh.velocidad);
	} else {
		sprite.textures = [grh];
	}

	if (!sprite.playing) {
		sprite.gotoAndStop(0);
	} else {
		sprite.gotoAndStop(sprite.currentFrame);
		sprite.play();
	}

	posicionarGrafico(sprite);

	if (grhAnimacion && sprite.loop) {
		play(sprite);
	}
};

export {
	init,
	setSize,
	play,
	setOnComplete,
	setSpeed,
	setGridPositionChangeCallback,
	setPosition,
	cambiarGrh
};
