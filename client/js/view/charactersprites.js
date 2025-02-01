/**
 * Created by horacio on 3/2/16.
 * PixiJS migrations by ominousf: v4.0.3 to v6.4.2 on 03/25/2023
 * v6.4.2 to 7.4.0 on 24/02/2024
 */
import { Enums } from '../enums';
import { Container } from 'pixi.js';
import * as SpriteGrh from './spritegrh';

const init = () => {
	/*
    	Body, Head,Weapon,Shield,Helmet: vector con los grhs de los 4 headings.
		Cada uno de los headings puede contener un solo numero de grh frames de grhs + vel
	*/
	const container = new Container();
	// charVisible solo incluye al personaje, la clase esta ademas incluye a los fxs, etc
	container._charVisible = true;
	container.OFFSET_HEAD = -34;
	container._fxsInfinitos = [];

	return container;
};

const getWidth = (container) => {
	// ignoro tamaño de la cabeza, ver si hace diferencia
	if (container.bodySprite) {
		return container.bodySprite.width;
	}
	return 0;
};

const getHeight = (container) => {
	if (container.bodySprite) {
		return container.bodySprite.height;
	}
	return 0;
};

const setFX = (container, grh, offX, offY, loops) => {
	const nuevoSprite = SpriteGrh.init(grh, loops);
	container.addChild(nuevoSprite);
	SpriteGrh.setPosition(nuevoSprite, offX, offY);
	nuevoSprite.zIndex = 7;

	if (loops > 0) {
		SpriteGrh.play(nuevoSprite);
		SpriteGrh.setOnComplete(nuevoSprite, () => {
			container.removeChild(nuevoSprite);
		});
	} else {
		nuevoSprite.zIndex--; // asi los fxs salen arriba de los infinitos (como meditar)
		container._fxsInfinitos.push(nuevoSprite);
	}
};

const setSombraSprite = (container, grh) => {
	if (container._sombraSprite) {
		return;
	}
	container._sombraSprite = SpriteGrh.init(grh);
	container.addChild(container._sombraSprite);
	container._sombraSprite.zIndex = -1;
	_updateOrdenHijos(container);
	_updateSombraSpriteSize(container);
};

const _updateSombraSpriteSize = (container) => {
	if (container._sombraSprite) {
		let w;
		if (container.bodySprite) {
			w = container.bodySprite.width < 32 ? 32 : container.bodySprite.width;
		} else {
			w = 32;
		}
		if (w !== container._sombraSprite.width) {
			SpriteGrh.setSize(container._sombraSprite, w, w);
		}
	}
};

const removerFxsInfinitos = (container) => {
	for (let i = 0; i < container._fxsInfinitos.length; i++) {
		container.removeChild(container._fxsInfinitos[i]);
	}
	container._fxsInfinitos = [];
};

const setGridPositionChangeCallback = (container, callback) => {
	container._onGridPositionChange = callback;
};

const setPosition = (container, x, y) => {
	container.x = Math.round(x);
	container.y = Math.round(y);
	const gridX = Math.round(x / 32);
	const gridY = Math.round(y / 32);
	if (gridX !== container._gridX || gridY !== container._gridY) {
		container._gridX = gridX;
		container._gridY = gridY;
		if (container._onGridPositionChange) {
			container._onGridPositionChange();
		}
	}
};

const setSpeed = (container, vel) => {
	container._velocidad = vel;
	_forEachHeadingSprite(container, (sprite) => {
		SpriteGrh.setSpeed(sprite, vel);
	});
};

const play = (container) => {
	_forEachHeadingSprite(container, (sprite) => {
		sprite.play();
	});
};

const loop = (container, loopVal) => {
	_forEachHeadingSprite(container, (sprite) => {
		sprite.loop = loopVal;
	});
};

const cambiarHeading = (container, heading) => {
	if (container.heading === heading) {
		return;
	}

	container.heading = heading;
	setBodys(container, container.bodys, container.headOffX, container.headOffY, true);
	setHeads(container, container.heads);
	setWeapons(container, container.weapons);
	setShields(container, container.shields);
	setHelmets(container, container.helmets);

	_updateOrdenHijos(container);
	_updateSombraSpriteSize(container);
};

const setBodys = (container, bodys, headOffX, headOffY) => {
	container.bodys = bodys;
	_setHeadOffset(container, headOffX, headOffY);

	container.bodySprite = _setHeadingSprite(container, container.bodySprite, bodys);

	if (container.bodySprite) {
		switch (container.heading) {
			case Enums.Heading.norte:
				container.bodySprite.zIndex = 3;
				break;
			case Enums.Heading.sur:
				container.bodySprite.zIndex = 1;
				break;
			case Enums.Heading.este:
				container.bodySprite.zIndex = 2;
				break;
			case Enums.Heading.oeste:
				container.bodySprite.zIndex = 1;
				break;
			default:
				console.log('character heading invalido');
				break;
		}
		_updateSombraSpriteSize(container);
	}
};

const setHeads = (container, heads) => {
	container.heads = heads;
	container.headSprite = _setHeadingSprite(container, container.headSprite, heads);
	if (container.headSprite) {
		container.headSprite.zIndex = 4;
		SpriteGrh.setPosition(container.headSprite, container.headOffX, container.headOffY);
	}
};

const setWeapons = (container, weapons) => {
	container.weapons = weapons;
	container.weaponSprite = _setHeadingSprite(container, container.weaponSprite, weapons);
	if (container.weaponSprite) {
		switch (container.heading) {
			case Enums.Heading.norte:
				container.weaponSprite.zIndex = 2;
				break;
			case Enums.Heading.sur:
				container.weaponSprite.zIndex = 2;
				break;
			case Enums.Heading.este:
				container.weaponSprite.zIndex = 3;
				break;
			case Enums.Heading.oeste:
				container.weaponSprite.zIndex = 2;
				break;
			default:
				console.log('character heading invalido');
				break;
		}
	}
};

const setShields = (container, shields) => {
	container.shields = shields;
	container.shieldSprite = _setHeadingSprite(container, container.shieldSprite, shields);
	if (container.shieldSprite) {
		switch (container.heading) {
			case Enums.Heading.norte:
				container.shieldSprite.zIndex = 1;
				break;
			case Enums.Heading.sur:
				container.shieldSprite.zIndex = 3;
				break;
			case Enums.Heading.este:
				container.shieldSprite.zIndex = 1;
				break;
			case Enums.Heading.oeste:
				container.shieldSprite.zIndex = 3;
				break;
			default:
				console.log('character heading invalido');
				break;
		}
	}
};

const setHelmets = (container, helmets) => {
	container.helmets = helmets;
	container.helmetSprite = _setHeadingSprite(container, container.helmetSprite, helmets);
	if (container.helmetSprite) {
		container.helmetSprite.zIndex = 5;
		SpriteGrh.setPosition(
			container.helmetSprite,
			container.headOffX,
			container.headOffY + container.OFFSET_HEAD
		);
	}
};

const setCharVisible = (container, visible) => {
	container._charVisible = visible;
	_forEachHeadingSprite(container, (sprite) => {
		sprite.visible = visible;
	});
	container._sombraSprite.visible = visible;
	if (container._nombre) {
		container._nombre.visible = visible;
	}
};

const _setHeadingSprite = (container, varSprite, grhs) => {
	if (!grhs) {
		if (varSprite) {
			container.removeChild(varSprite);
		}
		return null;
	}
	if (varSprite) {
		SpriteGrh.cambiarGrh(varSprite, grhs[container.heading]);
		return varSprite;
	}
	const nuevoSprite = SpriteGrh.init(grhs[container.heading], 1);
	container.addChild(nuevoSprite);
	if (container._velocidad) {
		SpriteGrh.setSpeed(nuevoSprite, container._velocidad);
	}
	nuevoSprite.visible = container._charVisible;
	return nuevoSprite;
};

const _setHeadOffset = (container, headOffX, headOffY) => {
	if (container.headOffX) {
		if (container.headOffX === headOffX && container.headOffY === headOffY) {
			return;
		}
	}

	container.headOffX = headOffX || 0;
	container.headOffY = headOffY || 0;
	if (container.headSprite) {
		SpriteGrh.setPosition(container.headSprite, container.headOffX, container.headOffY);
	}
	if (container.helmetSprite) {
		SpriteGrh.setPosition(
			container.helmetSprite,
			container.headOffX,
			container.headOffY + container.OFFSET_HEAD
		);
	}
};

const _updateOrdenHijos = (container) => {
	// TODO: al agregar en vez de esto hacer insercion por busqueda binaria con lso z index
	container.children.sort((a, b) => {
		a.zIndex = a.zIndex || 0;
		b.zIndex = b.zIndex || 0;
		return a.zIndex - b.zIndex;
	});
};

const _forEachHeadingSprite = (container, callback) => {
	if (container.bodySprite) {
		callback(container.bodySprite);
	}
	if (container.headSprite) {
		callback(container.headSprite);
	}
	if (container.weaponSprite) {
		callback(container.weaponSprite);
	}
	if (container.shieldSprite) {
		callback(container.shieldSprite);
	}
	if (container.helmetSprite) {
		callback(container.helmetSprite);
	}
};

const stopAnimations = (container) => {
	_forEachHeadingSprite(container, (child) => {
		child.gotoAndStop(0);
	});
};

export {
	init,
	getWidth,
	getHeight,
	setFX,
	setSombraSprite,
	removerFxsInfinitos,
	setGridPositionChangeCallback,
	setPosition,
	setSpeed,
	play,
	loop,
	cambiarHeading,
	setBodys,
	setHeads,
	setWeapons,
	setShields,
	setHelmets,
	setCharVisible,
	stopAnimations
};
