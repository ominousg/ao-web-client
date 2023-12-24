/**
 * Created by horacio on 3/14/16.
 * Migration from PixiJS v4.0.3 to v6.4.2 by ominousf on 03/25/2023
 */
import { Container } from 'pixi.js';

export default class ContainerOrdenado extends Container {
	constructor(mapWidth) {
		super();
		this._mapWidth = mapWidth;
	}

	addChild(spriteGrh) {
		spriteGrh.setGridPositionChangeCallback(() => {
			this._ordenarChild(spriteGrh);
		});
		super.addChild(spriteGrh);
	}

	_ordenarChild(hijo) {
		const gridX = Math.round(hijo.x / 32);
		const gridY = Math.round(hijo.y / 32);
		hijo.zIndex = gridY * (this._mapWidth + 1) + (this._mapWidth + 1 - gridX) + (hijo.zOffset || 0);
		this._reordenarTodo();
	}

	_reordenarTodo() {
		// TODO: no ordenar cada vez, sino insertar con una busqueda binaria
		this.children.sort((a, b) => {
			a.zIndex = a.zIndex || 0;
			b.zIndex = b.zIndex || 0;
			return a.zIndex - b.zIndex;
		});
	}
}
