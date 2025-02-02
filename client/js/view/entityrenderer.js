/**
 * Created by horacio on 8/20/16.
 * PixiJS migrations by ominousf: v4.0.3 to v6.4.2 on 03/25/2023
 * v6.4.2 to 7.4.0 on 24/02/2024
 */

import { Enums } from '../enums';
import Utils from '../utils/util';
import Font from '../font';
import * as CharacterSprites from './charactersprites';
import * as CharacterName from './charactername';
import * as CharacterText from './charactertext';
import * as SpriteGrh from './spritegrh';
import { posicionarRectEnTile, removePixiChild } from './rendererutils';
import * as Camera from '../view/camera';

const CLIPPING_EXTRA_POSITIONS = {
	norte: 0,
	sur: 2,
	este: 1,
	oeste: 1
};

const init = (escala, entityContainer, entityNamesContainer, entityChatContainer, camera, assetManager) => ({
	escala,
	entityContainer,
	entityNamesContainer,
	entityChatContainer,
	camera,
	assetManager,
	tilesize: 32,
	grhs: assetManager.grhs,
	indices: assetManager.getIndices(),
	armas: assetManager.getArmas(),
	cabezas: assetManager.getCabezas(),
	cascos: assetManager.getCascos(),
	cuerpos: assetManager.getCuerpos(),
	escudos: assetManager.getEscudos(),
	fxs: assetManager.getFxs()
});

const getHeadingsGrhs = (assetManager, varIndice, num) => {
	if (!num || !varIndice[num] || !varIndice[num].down) {
		return null;
	}
	const res = [];
	res[Enums.Heading.norte] = assetManager.getGrh(varIndice[num].up);
	res[Enums.Heading.este] = assetManager.getGrh(varIndice[num].right);
	res[Enums.Heading.sur] = assetManager.getGrh(varIndice[num].down);
	res[Enums.Heading.oeste] = assetManager.getGrh(varIndice[num].left);
	return res;
};

const crearSprite = (state, parentLayer, grh, x, y, zIndex) => {
	const nuevoSprite = SpriteGrh.init(state.assetManager.getGrh(grh));
	nuevoSprite.zOffset = zIndex || 0;
	parentLayer.addChild(nuevoSprite); // ojo tiene que estar en este orden sino no anda el z-index(TODO)
	SpriteGrh.setPosition(nuevoSprite, x, y);
	setSpriteClipping(state, nuevoSprite);
	return nuevoSprite;
};

const crearCharacterSprites = (state, parentLayer, x, y, zIndex) => {
	const sprite = CharacterSprites.init();
	CharacterSprites.setSombraSprite(sprite, state.assetManager.getGrh(23651));
	parentLayer.addChild(sprite);
	CharacterSprites.setPosition(sprite, x, y);
	setSpriteClipping(state, sprite);
	sprite.zOffset = zIndex;
	return sprite;
};

const spriteVisiblePorCamara = (state, sprite, extraPositions) => {
	const entityRect = {
		x: sprite.x,
		y: sprite.y,
		width: sprite.width,
		height: sprite.height
	};

	posicionarRectEnTile(entityRect);
	return Camera.rectVisible(state.camera, entityRect, extraPositions);
};

const setSpriteClipping = (state, sprite) => {
	sprite.visible = spriteVisiblePorCamara(state, sprite, CLIPPING_EXTRA_POSITIONS);
};

const entityVisiblePorCamara = (state, entity, extraPositions) => {
	if (!entity.sprite) {
		return false;
	}
	let finalExtraPositions;
	if (extraPositions) {
		finalExtraPositions = {
			norte: extraPositions.norte + CLIPPING_EXTRA_POSITIONS.norte,
			sur: extraPositions.sur + CLIPPING_EXTRA_POSITIONS.sur,
			este: extraPositions.este + CLIPPING_EXTRA_POSITIONS.este,
			oeste: extraPositions.oeste + CLIPPING_EXTRA_POSITIONS.oeste
		};
	} else {
		finalExtraPositions = CLIPPING_EXTRA_POSITIONS;
	}
	return spriteVisiblePorCamara(state, entity.sprite, finalExtraPositions);
};

const agregarItem = (state, item, numGrh) => {
	if (!state.assetManager.getGrh(numGrh)) {
		console.error('grh de item invalido: ' + numGrh.toString());
		return;
	}
	item.sprite = crearSprite(
		state,
		state.entityContainer,
		numGrh,
		Math.round(item.x),
		Math.round(item.y),
		-50
	);
};

const sacarItem = (state, item) => {
	if (!item.sprite) {
		return;
	}
	removePixiChild(state.entityContainer, item.sprite);
	item.sprite = null;
};

const agregarCharacter = (state, char) => {
	const nameChangedHandler = function () {
		const nombre = char.nombre;
		const clan = char.clan;
		const color = char.nickColor;
		if (char.spriteNombre) {
			removePixiChild(state.entityNamesContainer, char.spriteNombre);
			char.spriteNombre = null;
		}
		if (!nombre.trim()) {
			return;
		}
		const fontColor = color ? Font.NickColor[Font.NickColorIndex[color]] : Font.NickColor.CIUDADANO;
		const font = Font.NOMBRE_BASE_FONT;
		font.fill = fontColor;
		const nuevoNombre = CharacterName.init(nombre, clan, font, state.escala);
		state.entityNamesContainer.addChild(nuevoNombre);
		char.spriteNombre = nuevoNombre;
	};

	char.on('nameChanged', nameChangedHandler);
	char.emit('nameChanged');

	const sprite = crearCharacterSprites(state, state.entityContainer, char.x, char.y, -30);
	CharacterSprites.setSpeed(sprite, char.moveSpeed); // ANIMACIONES char se setean a misma velocidad que su movimiento !!

	char.sprite = sprite;
	// TODO! nombre clippping y textos de chat clipping !
	char.texto = CharacterText.initCharacterText(state.escala);
	state.entityChatContainer.addChild(char.texto);

	char.on('positionChanged', function () {
		const spriteX = this.x;
		const spriteY = this.y;

		CharacterSprites.setPosition(sprite, spriteX, spriteY);
		if (this.spriteNombre) {
			CharacterName.setPosition(this.spriteNombre, spriteX, spriteY);
		}
		if (this.texto) {
			CharacterText.setPosition(char.texto, spriteX, spriteY);
		}
	});

	char.on('gridPositionChanged', function () {
		setSpriteClipping(state, this.sprite);
	});

	char.emit('positionChanged');

	char.on('headingChanged', function () {
		CharacterSprites.cambiarHeading(char.sprite, char.heading);
	});

	char.emit('headingChanged');

	char.on('bodyChanged', function () {
		const Body = char.body;
		const bodys = getHeadingsGrhs(state.assetManager, state.cuerpos, Body);
		let headOffX = 0;
		let headOffY = 0;
		if (state.cuerpos[Body]) {
			headOffX = state.cuerpos[Body].offHeadX;
			headOffY = state.cuerpos[Body].offHeadY;
		}
		CharacterSprites.setBodys(char.sprite, bodys, headOffX, headOffY);
	});

	char.emit('bodyChanged');

	char.on('headChanged', function () {
		const Head = char.head;
		const heads = getHeadingsGrhs(state.assetManager, state.cabezas, Head);
		CharacterSprites.setHeads(char.sprite, heads);
	});

	char.emit('headChanged');

	char.on('weaponChanged', function () {
		const Weapon = char.weapon;
		const weapons = getHeadingsGrhs(state.assetManager, state.armas, Weapon);
		CharacterSprites.setWeapons(char.sprite, weapons);
	});

	char.emit('weaponChanged');

	char.on('shieldChanged', function () {
		const Shield = char.shield;
		const shields = getHeadingsGrhs(state.assetManager, state.escudos, Shield);
		CharacterSprites.setShields(char.sprite, shields);
	});

	char.emit('shieldChanged');

	char.on('helmetChanged', function () {
		const Helmet = char.helmet;
		const helmets = getHeadingsGrhs(state.assetManager, state.cascos, Helmet);
		CharacterSprites.setHelmets(char.sprite, helmets);
	});

	char.emit('helmetChanged');
};

const sacarCharacter = (state, char) => {
	removePixiChild(state.entityContainer, char.sprite);
	char.sprite = null;
	removePixiChild(state.entityChatContainer, char.texto);
	char.texto = null;

	if (char.spriteNombre) {
		removePixiChild(state.entityNamesContainer, char.spriteNombre);
		char.spriteNombre = null;
	}
};

const updateEntitiesMov = (state, direccion, entities) => {
	updateEntitiesClipping(state, entities);
};

const updateEntitiesClipping = (state, entities) => {
	for (let i = 0; i < entities.length; i++) {
		setSpriteClipping(state, entities[i].sprite);
	}
};

const setCharacterChat = (state, char, chat, r, g, b) => {
	const color = `rgb(${r},${g},${b})`;
	CharacterText.setChat(char.texto, chat, color);
};

const removerChat = (state, char) => {
	CharacterText.removerChat(char.texto);
};

const setCharVisible = (state, char, visible) => {
	CharacterSprites.setCharVisible(char.sprite, visible);
	if (char.spriteNombre) {
		char.spriteNombre.visible = visible;
	}
};

const agregarCharacterHoveringInfo = (state, char, valor, font) => {
	if (char.texto) {
		CharacterText.addHoveringInfo(char.texto, valor, font);
	}
};

const setCharacterFX = (state, char, FX, FXLoops) => {
	const grh = state.assetManager.getGrh(state.fxs[FX].animacion);
	CharacterSprites.setFX(char.sprite, grh, state.fxs[FX].offX, state.fxs[FX].offY, FXLoops);
};

const entityEnTileVisible = (state, entity) => {
	return state.camera.isVisiblePosition(entity.gridX, entity.gridY);
};

// TEMPORAL
const rescale = (state, escala) => {
	state.escala = escala;
};

export {
	init,
	agregarItem,
	sacarItem,
	agregarCharacter,
	sacarCharacter,
	updateEntitiesMov,
	updateEntitiesClipping,
	setCharacterChat,
	removerChat,
	setCharVisible,
	agregarCharacterHoveringInfo,
	setCharacterFX,
	entityVisiblePorCamara,
	entityEnTileVisible,
	rescale
};
