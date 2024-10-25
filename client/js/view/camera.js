import { Enums } from '../enums';

const DEFAULT_EXTRA_POSITIONS = {
	norte: 0,
	sur: 0,
	este: 0,
	oeste: 0
};

const init = (tilesize) => {
	const camera = {
		DEFAULT_EXTRA_POSITIONS: DEFAULT_EXTRA_POSITIONS,
		tilesize: tilesize,
		x: 0,
		y: 0,
		gridX: 0,
		gridY: 0,
		gridW: 17,
		gridH: 13
	};

	camera.height = camera.gridH * camera.tilesize;
	camera.width = camera.gridW * camera.tilesize;

	return camera;
};

const getCenterPosX = (camera) => {
	return camera.x + Math.floor(camera.gridW / 2) * camera.tilesize;
};

const getCenterPosY = (camera) => {
	return camera.y + Math.floor(camera.gridH / 2) * camera.tilesize;
};

const getCenterGridX = (camera) => {
	return camera.gridX + Math.floor(camera.gridW / 2);
};

const getCenterGridY = (camera) => {
	return camera.gridY + Math.floor(camera.gridH / 2);
};

const setPosition = (camera, x, y) => {
	camera.x = x;
	camera.y = y;

	camera.gridX = Math.floor(x / camera.tilesize);
	camera.gridY = Math.floor(y / camera.tilesize);
};

const setGridPosition = (camera, gridX, gridY) => {
	setPosition(camera, gridX * camera.tilesize, gridY * camera.tilesize);
};

const lookAtGridPos = (camera, gridX, gridY) => {
	setGridPosition(camera, gridX - Math.floor(camera.gridW / 2), gridY - Math.floor(camera.gridH / 2));
};

const mover = (camera, x, y) => {
	setPosition(camera, camera.x + x, camera.y + y);
};

const posFueraDeMapa = (camera, gridX, gridY) => {
	//esto deberia estar en el mapa y blabhblahblah
	if (gridX > 100 || gridX < 1 || gridY > 100 || gridY < 1) {
		return true;
	}
	return false;
};

const forEachVisiblePosition = (camera, callback, extraPositions) => {
	extraPositions = extraPositions || camera.DEFAULT_EXTRA_POSITIONS;

	let extraXEste = extraPositions.este,
		extraXOeste = extraPositions.oeste,
		extraYSur = extraPositions.sur,
		extraYNorte = extraPositions.norte;

	var gridIniY = camera.gridY - extraYNorte;
	var maxY = camera.gridY + camera.gridH + extraYSur;
	var gridiniX = camera.gridX - extraXOeste;
	var maxX = camera.gridX + camera.gridW + extraXEste;

	if (gridIniY < 1) {
		gridIniY = 1;
	}
	if (maxY > 100) {
		maxY = 100;
	}
	if (gridiniX < 1) {
		gridiniX = 1;
	}
	if (maxX > 100) {
		maxX = 100;
	}
	for (; gridIniY < maxY; gridIniY++) {
		for (var gX = gridiniX; gX < maxX; gX++) {
			callback(gX, gridIniY);
		}
	}
};

const forEachVisibleNextLinea = (camera, direccion, callback, extraPositions, offsetX, offsetY) => {
	// x,y en la proxima "linea" del grid en la direccion direccion
	extraPositions = extraPositions || camera.DEFAULT_EXTRA_POSITIONS;

	let extraXEste = extraPositions.este,
		extraXOeste = extraPositions.oeste,
		extraYSur = extraPositions.sur,
		extraYNorte = extraPositions.norte;

	offsetX = offsetX || 0;
	offsetY = offsetY || 0;

	var cameraGridX = camera.gridX + offsetX;
	var cameraGridY = camera.gridY + offsetY;

	var topGridY = cameraGridY - extraYNorte;
	var botGridY = cameraGridY + camera.gridH - 1 + extraYSur;
	var izqGridX = cameraGridX - extraXOeste;
	var derGridX = cameraGridX + camera.gridW - 1 + extraXEste;

	if (topGridY < 1) {
		topGridY = 1;
	}
	if (botGridY > 100) {
		botGridY = 100;
	}
	if (izqGridX < 1) {
		izqGridX = 1;
	}
	if (derGridX > 100) {
		derGridX = 100;
	}

	switch (direccion) {
		case Enums.Heading.oeste:
			izqGridX -= 1;
			if (izqGridX < 1) {
				return;
			}
			for (var y = topGridY; y <= botGridY; y++) {
				callback(izqGridX, y);
			}
			break;
		case Enums.Heading.este:
			derGridX += 1;
			if (derGridX > 100) {
				return;
			}
			for (var y = topGridY; y <= botGridY; y++) {
				callback(derGridX, y);
			}
			break;
		case Enums.Heading.norte:
			topGridY -= 1;
			if (topGridY < 1) {
				return;
			}
			for (var x = izqGridX; x <= derGridX; x++) {
				callback(x, topGridY);
			}
			break;
		case Enums.Heading.sur:
			botGridY += 1;
			if (botGridY > 100) {
				return;
			}
			for (var x = izqGridX; x <= derGridX; x++) {
				callback(x, botGridY);
			}
			break;
		default:
			throw new Error('Heading invalido');
	}
};

const forEachVisibleLastLinea = (camera, direccion, callback, extraPositions) => {
	let dirInversa;
	let offsetY = 0;
	let offsetX = 0; //offset para dar la ultima de las visible, no la anterior ("next") a la ultima visibles
	switch (direccion) {
		case Enums.Heading.oeste:
			dirInversa = Enums.Heading.este;
			offsetX = -1;
			break;
		case Enums.Heading.este:
			dirInversa = Enums.Heading.oeste;
			offsetX = 1;
			break;
		case Enums.Heading.norte:
			dirInversa = Enums.Heading.sur;
			offsetY = -1;
			break;
		case Enums.Heading.sur:
			dirInversa = Enums.Heading.norte;
			offsetY = 1;
			break;
	}
	forEachVisibleNextLinea(camera, dirInversa, callback, extraPositions, offsetX, offsetY);
};

const isVisiblePosition = (camera, gridX, gridY, extraPositions) => {
	extraPositions = extraPositions || camera.DEFAULT_EXTRA_POSITIONS;

	let extraXEste = extraPositions.este,
		extraXOeste = extraPositions.oeste,
		extraYSur = extraPositions.sur,
		extraYNorte = extraPositions.norte;
	if (
		gridY >= camera.gridY - extraYNorte &&
		gridY < camera.gridY + camera.gridH + extraYSur &&
		gridX >= camera.gridX - extraXOeste &&
		gridX < camera.gridX + camera.gridW + extraXEste
	) {
		return true;
	} else {
		return false;
	}
};

const rectVisible = (camera, rect, extraPositions) => {
	// eje x,y en esquina izquierda superior de rect
	extraPositions = extraPositions || camera.DEFAULT_EXTRA_POSITIONS;

	return !(
		camera.x > rect.x + rect.width + extraPositions.oeste * camera.tilesize ||
		camera.x + camera.width + extraPositions.este * camera.tilesize < rect.x ||
		camera.y > rect.y + rect.height + extraPositions.oeste * camera.tilesize ||
		camera.y + camera.height + extraPositions.sur * camera.tilesize < rect.y
	);
};

const focusEntity = (camera, entity) => {
	var x = Math.round(entity.x - Math.floor(camera.gridW / 2) * camera.tilesize),
		y = Math.round(entity.y - Math.floor(camera.gridH / 2) * camera.tilesize);
	setPosition(camera, x, y);
};

export {
	init,
	getCenterPosX,
	getCenterPosY,
	getCenterGridX,
	getCenterGridY,
	setPosition,
	setGridPosition,
	lookAtGridPos,
	mover,
	posFueraDeMapa,
	forEachVisiblePosition,
	forEachVisibleNextLinea,
	forEachVisibleLastLinea,
	isVisiblePosition,
	rectVisible,
	focusEntity
};
