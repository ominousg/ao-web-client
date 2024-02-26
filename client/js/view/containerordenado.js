/**
 * Created by horacio on 3/14/16.
 * PixiJS migrations by ominousf: v4.0.3 to v6.4.2 on 03/25/2023
 * v6.4.2 to 7.4.0 on 24/02/2024
 */

import { Container } from 'pixi.js';

const initContainerOrdenado = (mapWidth) => {
	const container = new Container();
	container.mapWidth = mapWidth;

	container.addChild = (spriteGrh) => {
		spriteGrh.setGridPositionChangeCallback(() => {
			ordenarChild(container, spriteGrh);
		});
		Container.prototype.addChild.call(container, spriteGrh);
	};

	return container;
};

const ordenarChild = (container, hijo) => {
	const gridX = Math.round(hijo.x / 32);
	const gridY = Math.round(hijo.y / 32);
	hijo.zIndex = gridY * (container.mapWidth + 1) + (container.mapWidth + 1 - gridX) + (hijo.zOffset || 0);
	reordenarTodo(container);
};

const reordenarTodo = (container) => {
	// TODO: no ordenar cada vez, sino insertar con una busqueda binaria
	container.children.sort((a, b) => {
		a.zIndex = a.zIndex || 0;
		b.zIndex = b.zIndex || 0;
		return a.zIndex - b.zIndex;
	});
};

export { initContainerOrdenado };
