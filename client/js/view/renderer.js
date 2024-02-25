import {
	BaseTexture,
	Container,
	autoDetectRenderer,
	SCALE_MODES,
	GC_MODES,
	MIPMAP_MODES,
	TextureGCSystem
} from 'pixi.js-legacy';
import Camera from './camera';
import * as Consola from './consola';
import ContainerOrdenado from './containerordenado';
import * as IndicadorMapa from './indicadormapa';
import * as IndicadorFPS from './indicadorFPS';
import EntityRenderer from './entityrenderer';
import * as ClimaRenderer from './climarenderer';
import MapaRenderer from './maparenderer';
import { removePixiChild } from './rendererutils';

class Renderer {
	constructor(assetManager, escala) {
		this.MAPA_WIDTH = 100; // todo: usarlo desde mapa
		this.assetManager = assetManager;
		this.grhs = assetManager.grhs;
		this.indices = assetManager.getIndices();
		this.armas = assetManager.getArmas();
		this.cabezas = assetManager.getCabezas();
		this.cascos = assetManager.getCascos();
		this.cuerpos = assetManager.getCuerpos();
		this.escudos = assetManager.getEscudos();
		this.fxs = assetManager.getFxs();

		this.tilesize = 32;
		this.camera = new Camera(this.tilesize);

		this.entityRenderer = null;
		this.mapaRenderer = null;
		this.climaRendererState = null;
		this.fadeInterval = null;

		this.escala = escala;
		this._inicializarPixi();
		this.rescale(escala);
	}

	_inicializarPixi() {
		BaseTexture.defaultOptions.scaleMode = SCALE_MODES.NEAREST;
		BaseTexture.defaultOptions.mipmap = MIPMAP_MODES.OFF;
		TextureGCSystem.defaultMode = GC_MODES.MANUAL;

		this.pixiRenderer = new autoDetectRenderer(
			this.camera.gridW * this.tilesize,
			this.camera.gridH * this.tilesize
		);
		$(this.pixiRenderer.view).css('position', 'relative');
		$(this.pixiRenderer.view).css('display', 'block');
		$('#gamecanvas').append(this.pixiRenderer.view);
		this._initStage();
	}

	_initStage() {
		this.stage = new Container();
		this.gameStage = new Container();
		this.climaContainer = new Container();
		this.layer1 = new Container();
		this.layer2 = new Container();
		this.gameNames = new Container();
		this.layer3 = new ContainerOrdenado(this.MAPA_WIDTH);
		this.layer3.ordenado = true;
		this.layer4 = new Container();
		this.gameChat = new Container();
		this.consola = Consola.initConsola(this.escala);
		this.indicadorMapa = IndicadorMapa.initIndicadorMapa(this.escala);
		this.indicadorFPS = IndicadorFPS.initIndicadorFPS(this.escala);
		this.stage.addChild(this.gameStage);
		this.stage.addChild(this.climaContainer);
		this.stage.addChild(this.consola);
		this.stage.addChild(this.indicadorMapa);
		this.stage.addChild(this.indicadorFPS);
		this.gameStage.addChild(this.layer1);
		this.gameStage.addChild(this.layer2);
		this.gameStage.addChild(this.gameNames);
		this.gameStage.addChild(this.layer3);
		this.gameStage.addChild(this.layer4);
		this.gameStage.addChild(this.gameChat);

		this.entityRenderer = new EntityRenderer(
			this.escala,
			this.layer3,
			this.gameNames,
			this.gameChat,
			this.camera,
			this.assetManager,
			this.gameStage
		);
		this.climaRendererState = ClimaRenderer.initClimaRenderer(
			this.escala,
			this.climaContainer,
			this.assetManager,
			this.pixiRenderer
		);
		this.mapaRenderer = new MapaRenderer(
			this.camera,
			this.assetManager,
			this.layer1,
			this.layer2,
			this.layer3,
			this.layer4
		);
	}

	update(delta) {
		//this.entityRenderer.update(delta);
		ClimaRenderer.update(this.climaRendererState, delta);
		//this.mapaRenderer.update(delta);
		Consola.update(this.consola, delta);
	}

	agregarTextoConsola(texto, font) {
		Consola.agregarTexto(this.consola, texto, font);
	}

	actualizarIndicadorMapa(numMap, x, y) {
		IndicadorMapa.actualizar(this.indicadorMapa, numMap, x, y);
	}

	actualizarIndicadorFPS(fps) {
		IndicadorFPS.actualizar(this.indicadorFPS, fps);
	}

	agregarItem(item, numGrh) {
		this.entityRenderer.agregarItem(item, numGrh);
	}

	sacarItem(item) {
		this.entityRenderer.sacarItem(item);
	}

	agregarCharacter(char) {
		this.entityRenderer.agregarCharacter(char);
	}

	sacarCharacter(char) {
		this.entityRenderer.sacarCharacter(char);
	}

	setCharacterChat(char, chat, r, g, b) {
		this.entityRenderer.setCharacterChat(char, chat, r, g, b);
	}

	removerChat(char) {
		this.entityRenderer.removerChat(char);
	}

	setCharVisible(char, visible) {
		this.entityRenderer.setCharVisible(char, visible);
	}

	agregarCharacterHoveringInfo(char, valor, font) {
		this.entityRenderer.agregarCharacterHoveringInfo(char, valor, font);
	}

	setCharacterFX(char, FX, FXLoops) {
		this.entityRenderer.setCharacterFX(char, FX, FXLoops);
	}

	entityVisiblePorCamara(entity, extraPositions) {
		return this.entityRenderer.entityVisiblePorCamara(entity, extraPositions);
	}

	entityEnTileVisible(entity) {
		// puede que no este en un tile visible pero si sea visible la entidad (para eso usar el de arriba)
		return this.entityRenderer.entityEnTileVisible(entity);
	}

	rescale(escala) {
		// calcular escala que no haga quedar a los tiles en posiciones no enteras:
		let newTilesize = Math.floor(escala * this.tilesize);
		escala = newTilesize / this.tilesize;

		this.escala = escala;

		this.pixiRenderer.resize(
			Math.round(this.camera.gridW * this.tilesize * escala),
			Math.round(this.camera.gridH * this.tilesize * escala)
		);
		this.gameStage.scale.x = escala;
		this.gameStage.scale.y = escala;

		this.gameChat.scale.x = 1 / escala;
		this.gameChat.scale.y = 1 / escala;

		this.gameNames.scale.x = 1 / escala;
		this.gameNames.scale.y = 1 / escala;

		this._syncGamePosition();

		for (var i = 0; i < this.gameChat.children.length; i++) {
			this.gameChat.children[i].setEscala(escala);
		}
		for (var name of this.gameNames.children) {
			name.setEscala(escala);
		}
		Consola.setEscala(this.consola, escala);

		this.indicadorMapa.x = Math.round(518 * escala - 120);
		this.indicadorMapa.y = Math.floor((13 * 32 - 10) * escala);

		this.indicadorFPS.x = Math.round(539 * escala - 63);
		this.indicadorFPS.y = Math.floor((1 * 32 - 32) * escala);

		/* TEMPORAL */
		if (this.entityRenderer) {
			this.entityRenderer.rescale(escala);
		}
		if (this.climaRendererState) {
			this.climaRendererState.escala = escala;
		}
		/* TEMPORAL */
	}

	clean(escala) {
		while (this.stage.children.length > 0) {
			var child = this.stage.getChildAt(0);
			removePixiChild(this.stage, child);
		}

		this._initStage();
		this.rescale(escala);
	}

	setBajoTecho(bajoT) {
		if (this.fadeInterval) clearInterval(this.fadeInterval);
		this.layer4.visible = true;
		let targetAlpha = bajoT ? 0 : 1;
		let currentAlpha = this.layer4.alpha;
		let alphaDelta = (targetAlpha - currentAlpha) / 10;
		let count = 0;
		this.fadeInterval = setInterval(() => {
			if (this.layer4.alpha !== targetAlpha) {
				this.layer4.alpha += alphaDelta;
				if (count === 10) {
					this.layer4.alpha = targetAlpha;
					this.layer4.visible = true;
					clearInterval(this.fadeInterval);
				}
				count++;
			}
		}, 50);
	}

	shieldBlockAnimation() {
		const duration = 200;
		const magnitude = 2.5;
		const originalPosition = { x: this.stage.x, y: this.stage.y };
		const startTime = Date.now();

		const shake = () => {
			const elapsed = Date.now() - startTime;
			const remaining = duration - elapsed;

			if (remaining > 0) {
				this.stage.x = originalPosition.x + (Math.random() - 0.5) * magnitude;
				this.stage.y = originalPosition.y + (Math.random() - 0.5) * magnitude;
				requestAnimationFrame(shake);
			} else {
				this.stage.x = originalPosition.x;
				this.stage.y = originalPosition.y;
			}
		};

		shake();
	}

	updateBeforeMovementBegins(dir, entities) {
		this.mapaRenderer.updateTilesMov(dir);
		this.entityRenderer.updateEntitiesMov(dir, entities);
	}

	cambiarMapa(mapa) {
		this.mapaRenderer.cambiarMapa(mapa);
	}

	drawMapaIni(gridX, gridY, entities) {
		this.resetCameraPosition(gridX, gridY, entities);
		this._syncGamePosition();
		this.mapaRenderer.drawMapaIni(gridX, gridY);
	}

	resetCameraPosition(gridX, gridY, entities) {
		this.camera.lookAtGridPos(gridX, gridY);
		this.entityRenderer.updateEntitiesClipping(entities);
	}

	_syncGamePosition() {
		this.gameStage.x = -Math.round(this.camera.x * this.escala);
		this.gameStage.y = -Math.round(this.camera.y * this.escala);
	}

	moverPosition(x, y) {
		this.camera.mover(x, y);
		this._syncGamePosition();
	}

	resetPos(gridX, gridY, entities) {
		this.drawMapaIni(gridX, gridY, entities);
	}

	removeLluvia() {
		ClimaRenderer.removeLluvia(this.climaRendererState);
	}

	createLluvia() {
		ClimaRenderer.createLluvia(this.climaRendererState);
	}

	renderFrame() {
		this.pixiRenderer.render(this.stage);
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
	}
}
export default Renderer;
