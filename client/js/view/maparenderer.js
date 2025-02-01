/**
 * Created by horacio on 8/21/16.
 * PixiJS migrations by ominousf: v4.0.3 to v6.4.2 on 03/25/2023
 * v6.4.2 to 7.4.0 on 24/02/2024
 */

import { Enums } from '../enums';
import Utils from '../utils/util';
import { Graphics } from 'pixi.js';
import SpriteGrh from './spritegrh';
import { posicionarRectEnTile, removePixiChild } from './rendererutils';
import * as Camera from './camera';
import * as Mapa from '../model/mapa';

// posiciones extra que se analizan para ver si lo que hay en ellas es visible o no
// (si es algo visible pero tan grande que cuando esta lejos no entra en estas posiciones no se ve)
const POSICIONES_EXTRA_RENDER = {
	norte: 1,
	sur: 7,
	este: 4,
	oeste: 4
};

// posiciones extras que se renderizan del terreno (no deberia ser necesaria mas de 1 por el movimiento)
const POSICIONES_EXTRA_TERRENO = 1;

const initMapaRenderer = (
	camera,
	assetManager,
	layer1Container,
	layer2Container,
	layer3Container,
	layer4Container
) => {
	const tilesize = 32;
	const terreno = [];
	const _spritesLayer2 = [];
	const _spritesLayer3 = [];
	const _spritesLayer4 = [];

	for (let i = 0; i < camera.gridW + POSICIONES_EXTRA_TERRENO * 2; i++) {
		terreno[i] = [];
		for (let j = 0; j < camera.gridH + POSICIONES_EXTRA_TERRENO * 2; j++) {
			terreno[i][j] = new SpriteGrh(assetManager.getTerrenoGrh(1)); // grh null
			layer1Container.addChild(terreno[i][j]);
		}
	}

	return {
		camera,
		assetManager,
		layer1: layer1Container,
		layer2: layer2Container,
		layer3: layer3Container,
		layer4: layer4Container,
		tilesize,
		mapa: null,
		terreno,
		_lowestRowTerreno: null,
		_lowestColTerreno: null,
		_spritesLayer2,
		_spritesLayer3,
		_spritesLayer4
	};
};

const cambiarMapa = (mapaRendererState, mapa) => {
	mapaRendererState.mapa = mapa;
};

const drawMapaIni = (mapaRendererState, gridX, gridY) => {
	// SOLO USARLO EN CAMBIO DE MAPA, SINO USAR RESETPOS. Limpia vectores, dibuja el terreno del mapa, almacena los tiles animados
	if (!mapaRendererState.mapa.isLoaded) {
		throw new Error('DRAW MAPA INI SIN QUE ESTE CARGADO');
		return;
	}
	_drawSpritesIni(mapaRendererState);
	_drawTerrenoIni(mapaRendererState);
};

const updateTilesMov = (mapaRendererState, dir) => {
	if (!mapaRendererState.mapa.isLoaded) {
		return;
	}
	_updateTerrenoMov(mapaRendererState, dir);
	_updateLayersMov(mapaRendererState, dir);
};

const _drawTerrenoIni = (mapaRendererState) => {
	const gridXIni = mapaRendererState.camera.gridX - POSICIONES_EXTRA_TERRENO;
	const gridYIni = mapaRendererState.camera.gridY - POSICIONES_EXTRA_TERRENO;
	mapaRendererState._lowestRowTerreno = 0; // variable que indica que indice tiene los sprites de pos mas baja, para que al caminar estos sean movidos a las mas altas
	mapaRendererState._lowestColTerreno = 0;

	for (let i = 0; i < mapaRendererState.camera.gridW + POSICIONES_EXTRA_TERRENO * 2; i++) {
		for (let j = 0; j < mapaRendererState.camera.gridH + POSICIONES_EXTRA_TERRENO * 2; j++) {
			const screenX = (gridXIni + i) * mapaRendererState.tilesize;
			const screenY = (gridYIni + j) * mapaRendererState.tilesize;
			mapaRendererState.terreno[i][j].setPosition(screenX, screenY);

			const grh = Mapa.getGrh1(mapaRendererState.mapa, gridXIni + i, gridYIni + j);
			if (grh) {
				mapaRendererState.terreno[i][j].cambiarGrh(mapaRendererState.assetManager.getTerrenoGrh(grh));
			}
		}
	}
};

const _updateTerrenoMov = (mapaRendererState, dir) => {
	// al moverse mueve la columna/fila que queda atras al frente de todo
	const gridXIni = mapaRendererState.camera.gridX - POSICIONES_EXTRA_TERRENO;
	const gridYIni = mapaRendererState.camera.gridY - POSICIONES_EXTRA_TERRENO;
	const cols = mapaRendererState.camera.gridW + POSICIONES_EXTRA_TERRENO * 2;
	const rows = mapaRendererState.camera.gridH + POSICIONES_EXTRA_TERRENO * 2;

	switch (dir) {
		case Enums.Heading.norte:
			const updateNorte = () => {
				const j = Utils.modulo(mapaRendererState._lowestRowTerreno - 1, rows);
				for (let i = 0; i < mapaRendererState.terreno.length; i++) {
					mapaRendererState.terreno[i][j].setPosition(
						mapaRendererState.terreno[i][j].x,
						mapaRendererState.terreno[i][j].y - rows * mapaRendererState.tilesize
					);
					const grh = Mapa.getGrh1(
						mapaRendererState.mapa,
						gridXIni + Utils.modulo(i - mapaRendererState._lowestColTerreno, cols),
						gridYIni - 1
					);
					if (grh) {
						mapaRendererState.terreno[i][j].cambiarGrh(mapaRendererState.assetManager.getTerrenoGrh(grh));
					}
				}
				mapaRendererState._lowestRowTerreno = Utils.modulo(mapaRendererState._lowestRowTerreno - 1, rows);
			};
			updateNorte();
			break;

		case Enums.Heading.oeste:
			const updateOeste = () => {
				const i = Utils.modulo(mapaRendererState._lowestColTerreno - 1, cols);
				for (let j = 0; j < mapaRendererState.terreno[i].length; j++) {
					mapaRendererState.terreno[i][j].setPosition(
						mapaRendererState.terreno[i][j].x - cols * mapaRendererState.tilesize,
						mapaRendererState.terreno[i][j].y
					);
					const grh = Mapa.getGrh1(
						mapaRendererState.mapa,
						gridXIni - 1,
						gridYIni + Utils.modulo(j - mapaRendererState._lowestRowTerreno, rows)
					);
					if (grh) {
						mapaRendererState.terreno[i][j].cambiarGrh(mapaRendererState.assetManager.getTerrenoGrh(grh));
					}
				}
				mapaRendererState._lowestColTerreno = Utils.modulo(mapaRendererState._lowestColTerreno - 1, cols);
			};
			updateOeste();
			break;

		case Enums.Heading.sur:
			const updateSur = () => {
				const j = mapaRendererState._lowestRowTerreno;
				for (let i = 0; i < mapaRendererState.terreno.length; i++) {
					mapaRendererState.terreno[i][j].setPosition(
						mapaRendererState.terreno[i][j].x,
						mapaRendererState.terreno[i][j].y + rows * mapaRendererState.tilesize
					);
					const grh = Mapa.getGrh1(
						mapaRendererState.mapa,
						gridXIni + Utils.modulo(i - mapaRendererState._lowestColTerreno, cols),
						gridYIni + rows
					);
					if (grh) {
						mapaRendererState.terreno[i][j].cambiarGrh(mapaRendererState.assetManager.getTerrenoGrh(grh));
					}
				}
				mapaRendererState._lowestRowTerreno = Utils.modulo(mapaRendererState._lowestRowTerreno + 1, rows);
			};
			updateSur();
			break;

		case Enums.Heading.este:
			const updateEste = () => {
				const i = mapaRendererState._lowestColTerreno;
				for (let j = 0; j < mapaRendererState.terreno[i].length; j++) {
					mapaRendererState.terreno[i][j].setPosition(
						mapaRendererState.terreno[i][j].x + cols * mapaRendererState.tilesize,
						mapaRendererState.terreno[i][j].y
					);
					const grh = Mapa.getGrh1(
						mapaRendererState.mapa,
						gridXIni + cols,
						gridYIni + Utils.modulo(j - mapaRendererState._lowestRowTerreno, rows)
					);
					if (grh) {
						mapaRendererState.terreno[i][j].cambiarGrh(mapaRendererState.assetManager.getTerrenoGrh(grh));
					}
				}
				mapaRendererState._lowestColTerreno = Utils.modulo(mapaRendererState._lowestColTerreno + 1, cols);
			};
			updateEste();
			break;

		default:
			console.log('character heading invalido');
			break;
	}
};

const _drawSpritesIni = (mapaRendererState) => {
	_removeChilds(mapaRendererState.layer2, mapaRendererState._spritesLayer2);
	_removeChilds(mapaRendererState.layer3, mapaRendererState._spritesLayer3);
	_removeChilds(mapaRendererState.layer4, mapaRendererState._spritesLayer4);

	for (let x = 0; x <= 100; x++) {
		mapaRendererState._spritesLayer2[x] = [];
		mapaRendererState._spritesLayer3[x] = [];
		mapaRendererState._spritesLayer4[x] = [];
	}

	Camera.forEachVisiblePosition(
		mapaRendererState.camera,
		(gridX, gridY) => {
			const screenX = gridX * mapaRendererState.tilesize;
			const screenY = gridY * mapaRendererState.tilesize;
			const grh2 = Mapa.getGrh2(mapaRendererState.mapa, gridX, gridY);
			const grh3 = Mapa.getGrh3(mapaRendererState.mapa, gridX, gridY);
			const grh4 = Mapa.getGrh4(mapaRendererState.mapa, gridX, gridY);
			if (grh2) {
				mapaRendererState._spritesLayer2[gridX][gridY] = _crearSprite(
					mapaRendererState.layer2,
					mapaRendererState.assetManager.getGrh(grh2),
					screenX,
					screenY,
					mapaRendererState
				);
			}
			if (grh3) {
				mapaRendererState._spritesLayer3[gridX][gridY] = _crearSprite(
					mapaRendererState.layer3,
					mapaRendererState.assetManager.getGrh(grh3),
					screenX,
					screenY,
					mapaRendererState
				);
			}
			if (grh4) {
				mapaRendererState._spritesLayer4[gridX][gridY] = _crearSprite(
					mapaRendererState.layer4,
					mapaRendererState.assetManager.getGrh(grh4),
					screenX,
					screenY,
					mapaRendererState
				);
			}
		},
		POSICIONES_EXTRA_RENDER
	);
};

const _updateLayersMov = (mapaRendererState, dir) => {
	Camera.forEachVisibleNextLinea(
		mapaRendererState.camera,
		dir,
		(gridX, gridY) => {
			const screenX = gridX * mapaRendererState.tilesize;
			const screenY = gridY * mapaRendererState.tilesize;
			const grh2 = Mapa.getGrh2(mapaRendererState.mapa, gridX, gridY);
			const grh3 = Mapa.getGrh3(mapaRendererState.mapa, gridX, gridY);
			const grh4 = Mapa.getGrh4(mapaRendererState.mapa, gridX, gridY);
			if (grh2 && !mapaRendererState._spritesLayer2[gridX][gridY]) {
				mapaRendererState._spritesLayer2[gridX][gridY] = _crearSprite(
					mapaRendererState.layer2,
					mapaRendererState.assetManager.getGrh(grh2),
					screenX,
					screenY,
					mapaRendererState
				);
			}
			if (grh3 && !mapaRendererState._spritesLayer3[gridX][gridY]) {
				mapaRendererState._spritesLayer3[gridX][gridY] = _crearSprite(
					mapaRendererState.layer3,
					mapaRendererState.assetManager.getGrh(grh3),
					screenX,
					screenY,
					mapaRendererState
				);
			}
			if (grh4 && !mapaRendererState._spritesLayer4[gridX][gridY]) {
				mapaRendererState._spritesLayer4[gridX][gridY] = _crearSprite(
					mapaRendererState.layer4,
					mapaRendererState.assetManager.getGrh(grh4),
					screenX,
					screenY,
					mapaRendererState
				);
			}
		},
		POSICIONES_EXTRA_RENDER
	);

	Camera.forEachVisibleLastLinea(
		mapaRendererState.camera,
		dir,
		(gridX, gridY) => {
			if (mapaRendererState._spritesLayer2[gridX][gridY]) {
				removePixiChild(mapaRendererState.layer2, mapaRendererState._spritesLayer2[gridX][gridY]);
				mapaRendererState._spritesLayer2[gridX][gridY] = null;
			}
			if (mapaRendererState._spritesLayer3[gridX][gridY]) {
				removePixiChild(mapaRendererState.layer3, mapaRendererState._spritesLayer3[gridX][gridY]);
				mapaRendererState._spritesLayer3[gridX][gridY] = null;
			}
			if (mapaRendererState._spritesLayer4[gridX][gridY]) {
				removePixiChild(mapaRendererState.layer4, mapaRendererState._spritesLayer4[gridX][gridY]);
				mapaRendererState._spritesLayer4[gridX][gridY] = null;
			}
		},
		POSICIONES_EXTRA_RENDER
	);

	Camera.forEachVisiblePosition(
		mapaRendererState.camera,
		(gridX, gridY) => {
			if (mapaRendererState._spritesLayer2[gridX][gridY]) {
				_setSpriteClipping(mapaRendererState, mapaRendererState._spritesLayer2[gridX][gridY]);
			}
			if (mapaRendererState._spritesLayer3[gridX][gridY]) {
				_setSpriteClipping(mapaRendererState, mapaRendererState._spritesLayer3[gridX][gridY]);
			}
			if (mapaRendererState._spritesLayer4[gridX][gridY]) {
				_setSpriteClipping(mapaRendererState, mapaRendererState._spritesLayer4[gridX][gridY]);
			}
		},
		POSICIONES_EXTRA_RENDER
	);
};

const _crearSprite = (parentLayer, grh, x, y, mapaRendererState) => {
	const nuevoSprite = new SpriteGrh(grh);
	parentLayer.addChild(nuevoSprite); // ojo tiene que estar en este orden sino no anda el z-index(TODO)
	nuevoSprite.setPosition(x, y);
	_setSpriteClipping(mapaRendererState, nuevoSprite);
	return nuevoSprite;
};

const _setSpriteClipping = (mapaRendererState, sprite) => {
	const spriteRect = {};

	spriteRect.x = sprite.x;
	spriteRect.y = sprite.y;
	spriteRect.width = sprite.width;
	spriteRect.height = sprite.height;

	posicionarRectEnTile(spriteRect);
	sprite.visible = Camera.rectVisible(mapaRendererState.camera, spriteRect);
};

const _removeChilds = (padre, gridHijos) => {
	gridHijos.forEach((fila) => {
		fila.forEach((hijo) => {
			if (hijo) {
				removePixiChild(padre, hijo);
			}
		});
	});
};

const _drawDebugTile = (mapaRendererState, x, y) => {
	const graphics = new Graphics();
	graphics.beginFill(0xffff00);
	graphics.lineStyle(5, 0xff0000);
	graphics.drawRect(x, y, mapaRendererState.tilesize, mapaRendererState.tilesize);
	mapaRendererState.layer4.addChild(graphics);
};

export { initMapaRenderer, updateTilesMov, cambiarMapa, drawMapaIni };
