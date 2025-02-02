import {
	BaseTexture,
	Container,
	autoDetectRenderer,
	SCALE_MODES,
	GC_MODES,
	MIPMAP_MODES,
	TextureGCSystem
} from 'pixi.js-legacy';
import * as Camera from './camera';
import * as Consola from './consola';
import * as ContainerOrdenado from './containerordenado';
import * as IndicadorMapa from './indicadormapa';
import * as IndicadorFPS from './indicadorFPS';
import * as EntityRenderer from './entityrenderer';
import * as ClimaRenderer from './climarenderer';
import * as MapaRenderer from './maparenderer';
import * as CharacterText from './charactertext';
import * as CharacterName from './charactername';
import { removePixiChild } from './rendererutils';

const createState = (assetManager, escala) => {
	const state = {
		MAPA_WIDTH: 100, // todo: usarlo desde mapa
		assetManager,
		grhs: assetManager.grhs,
		indices: assetManager.getIndices(),
		armas: assetManager.getArmas(),
		cabezas: assetManager.getCabezas(),
		cascos: assetManager.getCascos(),
		cuerpos: assetManager.getCuerpos(),
		escudos: assetManager.getEscudos(),
		fxs: assetManager.getFxs(),
		tilesize: 32,
		camera: Camera.init(32),
		entityRenderer: null,
		mapaRendererState: null,
		climaRendererState: null,
		fadeInterval: null,
		escala
	};

	return state;
};

const inicializarPixi = (state) => {
	BaseTexture.defaultOptions.scaleMode = SCALE_MODES.NEAREST;
	BaseTexture.defaultOptions.mipmap = MIPMAP_MODES.OFF;
	TextureGCSystem.defaultMode = GC_MODES.MANUAL;

	const pixiRenderer = new autoDetectRenderer(
		state.camera.gridW * state.tilesize,
		state.camera.gridH * state.tilesize
	);

	$(pixiRenderer.view).css('position', 'relative');
	$(pixiRenderer.view).css('display', 'block');
	$('#gamecanvas').append(pixiRenderer.view);

	return pixiRenderer;
};

const initStage = (state, pixiRenderer) => {
	const stage = new Container();
	const gameStage = new Container();
	const climaContainer = new Container();
	const layer1 = new Container();
	const layer2 = new Container();
	const gameNames = new Container();
	const layer3 = ContainerOrdenado.initContainerOrdenado(state.MAPA_WIDTH);
	layer3.ordenado = true;
	const layer4 = new Container();
	const gameChat = new Container();
	const consola = Consola.initConsola(state.escala);
	const indicadorMapa = IndicadorMapa.initIndicadorMapa(state.escala);
	const indicadorFPS = IndicadorFPS.initIndicadorFPS(state.escala);

	stage.addChild(gameStage);
	stage.addChild(climaContainer);
	stage.addChild(consola);
	stage.addChild(indicadorMapa);
	stage.addChild(indicadorFPS);
	gameStage.addChild(layer1);
	gameStage.addChild(layer2);
	gameStage.addChild(gameNames);
	gameStage.addChild(layer3);
	gameStage.addChild(layer4);
	gameStage.addChild(gameChat);

	const entityRendererState = EntityRenderer.init(
		state.escala,
		layer3,
		gameNames,
		gameChat,
		state.camera,
		state.assetManager,
		gameStage
	);

	const climaRendererState = ClimaRenderer.initClimaRenderer(
		state.escala,
		climaContainer,
		state.assetManager,
		pixiRenderer
	);

	const mapaRendererState = MapaRenderer.initMapaRenderer(
		state.camera,
		state.assetManager,
		layer1,
		layer2,
		layer3,
		layer4
	);

	return {
		stage,
		gameStage,
		climaContainer,
		layer1,
		layer2,
		gameNames,
		layer3,
		layer4,
		gameChat,
		consola,
		indicadorMapa,
		indicadorFPS,
		entityRendererState,
		climaRendererState,
		mapaRendererState
	};
};

const init = (assetManager, escala) => {
	const state = createState(assetManager, escala);
	const pixiRenderer = inicializarPixi(state);
	const stageState = initStage(state, pixiRenderer);
	const fullState = {
		...state,
		...stageState,
		pixiRenderer
	};

	rescale(fullState, escala);

	return fullState;
};

const update = (state, delta) => {
	//this.entityRenderer.update(delta);
	ClimaRenderer.update(state.climaRendererState, delta);
	//this.mapaRenderer.update(delta);
	Consola.update(state.consola, delta);
};

const agregarTextoConsola = (state, texto, font) => {
	Consola.agregarTexto(state.consola, texto, font);
};

const actualizarIndicadorMapa = (state, numMap, x, y) => {
	IndicadorMapa.actualizar(state.indicadorMapa, numMap, x, y);
};

const actualizarIndicadorFPS = (state, fps) => {
	IndicadorFPS.actualizar(state.indicadorFPS, fps);
};

const syncGamePosition = (state) => {
	state.gameStage.x = -Math.round(state.camera.x * state.escala);
	state.gameStage.y = -Math.round(state.camera.y * state.escala);
};

const rescale = (state, escala) => {
	// calcular escala que no haga quedar a los tiles en posiciones no enteras:
	let newTilesize = Math.floor(escala * state.tilesize);
	escala = newTilesize / state.tilesize;

	state.escala = escala;

	state.pixiRenderer.resize(
		Math.round(state.camera.gridW * state.tilesize * escala),
		Math.round(state.camera.gridH * state.tilesize * escala)
	);

	state.gameStage.scale.x = escala;
	state.gameStage.scale.y = escala;

	state.gameChat.scale.x = 1 / escala;
	state.gameChat.scale.y = 1 / escala;

	state.gameNames.scale.x = 1 / escala;
	state.gameNames.scale.y = 1 / escala;

	syncGamePosition(state);

	for (let i = 0; i < state.gameChat.children.length; i++) {
		CharacterText.setEscala(state.gameChat.children[i], escala);
	}

	for (var name of state.gameNames.children) {
		CharacterName.setEscala(name, escala);
	}

	Consola.setEscala(state.consola, escala);

	state.indicadorMapa.x = Math.round(518 * escala - 120);
	state.indicadorMapa.y = Math.floor((13 * 32 - 10) * escala);

	state.indicadorFPS.x = Math.round(539 * escala - 63);
	state.indicadorFPS.y = Math.floor((1 * 32 - 32) * escala);

	/* TEMPORAL */
	if (state.entityRendererState) {
		EntityRenderer.rescale(state.entityRendererState, escala);
	}
	if (state.climaRendererState) {
		state.climaRendererState.escala = escala;
	}
	/* TEMPORAL */
};

const clean = (state, escala) => {
	while (state.stage.children.length > 0) {
		var child = state.stage.getChildAt(0);
		removePixiChild(state.stage, child);
	}

	const newStageState = initStage(state, state.pixiRenderer);
	Object.assign(state, newStageState);
	rescale(state, escala);
};

const setBajoTecho = (state, bajoT) => {
	if (state.fadeInterval) clearInterval(state.fadeInterval);
	state.layer4.visible = true;
	let targetAlpha = bajoT ? 0 : 1;
	let currentAlpha = state.layer4.alpha;
	let alphaDelta = (targetAlpha - currentAlpha) / 10;
	let count = 0;
	state.fadeInterval = setInterval(() => {
		if (state.layer4.alpha !== targetAlpha) {
			state.layer4.alpha += alphaDelta;
			if (count === 10) {
				state.layer4.alpha = targetAlpha;
				state.layer4.visible = true;
				clearInterval(state.fadeInterval);
			}
			count++;
		}
	}, 50);
};

const shieldBlockAnimation = (state) => {
	const duration = 200;
	const magnitude = 2.5;
	const originalPosition = { x: state.stage.x, y: state.stage.y };
	const startTime = Date.now();

	const shake = () => {
		const elapsed = Date.now() - startTime;
		const remaining = duration - elapsed;

		if (remaining > 0) {
			state.stage.x = originalPosition.x + (Math.random() - 0.5) * magnitude;
			state.stage.y = originalPosition.y + (Math.random() - 0.5) * magnitude;
			requestAnimationFrame(shake);
		} else {
			state.stage.x = originalPosition.x;
			state.stage.y = originalPosition.y;
		}
	};

	shake();
};

const updateBeforeMovementBegins = (state, dir, entities) => {
	MapaRenderer.updateTilesMov(state.mapaRendererState, dir);
	EntityRenderer.updateEntitiesMov(state.entityRendererState, dir, entities);
};

const cambiarMapa = (state, mapa) => {
	MapaRenderer.cambiarMapa(state.mapaRendererState, mapa);
};

const drawMapaIni = (state, gridX, gridY, entities) => {
	resetCameraPosition(state, gridX, gridY, entities);
	syncGamePosition(state);
	MapaRenderer.drawMapaIni(state.mapaRendererState, gridX, gridY);
};

const resetCameraPosition = (state, gridX, gridY, entities) => {
	Camera.lookAtGridPos(state.camera, gridX, gridY);
	EntityRenderer.updateEntitiesClipping(state.entityRendererState, entities);
};

const entityVisiblePorCamara = (state, entity, extraPositions = null) => {
	return EntityRenderer.entityVisiblePorCamara(state.entityRendererState, entity, extraPositions);
};

const entityEnTileVisible = (state, entity) => {
	// puede que no este en un tile visible pero si sea visible la entidad (para eso usar el de arriba)
	return EntityRenderer.entityEnTileVisible(state.entityRendererState, entity);
};

const agregarItem = (state, item, numGrh) => {
	EntityRenderer.agregarItem(state.entityRendererState, item, numGrh);
};

const sacarItem = (state, item) => {
	EntityRenderer.sacarItem(state.entityRendererState, item);
};

const agregarCharacter = (state, char) => {
	EntityRenderer.agregarCharacter(state.entityRendererState, char);
};

const sacarCharacter = (state, char) => {
	EntityRenderer.sacarCharacter(state.entityRendererState, char);
};

const setCharacterChat = (state, char, chat, r, g, b) => {
	EntityRenderer.setCharacterChat(state.entityRendererState, char, chat, r, g, b);
};

const removerChat = (state, char) => {
	EntityRenderer.removerChat(state.entityRendererState, char);
};

const setCharVisible = (state, char, visible) => {
	EntityRenderer.setCharVisible(state.entityRendererState, char, visible);
};

const agregarCharacterHoveringInfo = (state, char, valor, font) => {
	EntityRenderer.agregarCharacterHoveringInfo(state.entityRendererState, char, valor, font);
};

const setCharacterFX = (state, char, FX, FXLoops) => {
	EntityRenderer.setCharacterFX(state.entityRendererState, char, FX, FXLoops);
};

const moverPosition = (state, x, y) => {
	Camera.mover(state.camera, x, y);
	syncGamePosition(state);
};

const resetPos = (state, gridX, gridY, entities) => {
	drawMapaIni(state, gridX, gridY, entities);
};

const removeLluvia = (state) => {
	ClimaRenderer.removeLluvia(state.climaRendererState);
};

const createLluvia = (state) => {
	ClimaRenderer.createLluvia(state.climaRendererState);
};

const renderFrame = (state) => {
	state.pixiRenderer.render(state.stage);
	/*
                 let testPosEnteras = (c) => {
                 if ( (Math.round(c.x) !== c.x) || (Math.round(c.y) !== c.y) ){
                 log.error(c._grh);
                 throw new Error("ERROR!!!!!!!!!!!: X:" + c.x+ " Y:" + c.y);
                 }
                 c.children.forEach(testPosEnteras);
                 };
                 testPosEnteras(this.stage);
                 */
};

export {
	init,
	update,
	agregarTextoConsola,
	actualizarIndicadorMapa,
	actualizarIndicadorFPS,
	rescale,
	clean,
	setBajoTecho,
	shieldBlockAnimation,
	updateBeforeMovementBegins,
	cambiarMapa,
	drawMapaIni,
	resetCameraPosition,
	entityVisiblePorCamara,
	entityEnTileVisible,
	agregarItem,
	sacarItem,
	agregarCharacter,
	sacarCharacter,
	setCharacterChat,
	removerChat,
	setCharVisible,
	agregarCharacterHoveringInfo,
	setCharacterFX,
	moverPosition,
	resetPos,
	renderFrame,
	removeLluvia,
	createLluvia
};
