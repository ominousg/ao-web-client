/**
 * Created by horacio on 7/26/16.
 */
import { Enums } from '../enums';
import * as Renderer from '../view/renderer';

const init = (renderer) => ({
	renderer,
	characters: [],
	items: []
});

const getCharacter = (world, CharIndex) => world.characters.find((char) => char.id === CharIndex);

const getCharacterInGridPos = (world, gridX, gridY) =>
	world.characters.find((char) => char.gridX === gridX && char.gridY === gridY);

const addCharacter = (world, char) => {
	world.characters.push(char);
	Renderer.agregarCharacter(world.renderer, char);
};

const sacarCharacter = (world, c) => {
	const index = world.characters.indexOf(c);
	if (index > -1) {
		Renderer.sacarCharacter(world.renderer, c);
		world.characters.splice(index, 1);
	}
};

const addItem = (world, item, grhIndex) => {
	world.items.push(item);
	Renderer.agregarItem(world.renderer, item, grhIndex);
};

const sacarItem = (world, item) => {
	const index = world.items.indexOf(item);
	if (index > -1) {
		world.items.splice(index, 1);
		Renderer.sacarItem(world.renderer, item);
	}
};

const getItemInGridPos = (world, gridX, gridY) =>
	world.items.find((item) => item.gridX === gridX && item.gridY === gridY);

const forEachCharacter = (world, callback) => {
	// loopeo al revez asi permite remover items en callback
	let i;
	for (i = world.characters.length - 1; i >= 0; i--) {
		callback(world.characters[i], i);
	}
};

const forEachItem = (world, callback) => {
	let i;
	for (i = world.items.length - 1; i >= 0; i--) {
		callback(world.items[i], i);
	}
};

const forEachEntity = (world, callback) => {
	forEachCharacter(world, callback);
	forEachItem(world, callback);
};

const getEntities = (world) => world.characters.concat(world.items);

export {
	init,
	getCharacter,
	getCharacterInGridPos,
	addCharacter,
	sacarCharacter,
	addItem,
	sacarItem,
	getItemInGridPos,
	forEachCharacter,
	forEachItem,
	forEachEntity,
	getEntities
};
