const init = (numMap) => ({
	numero: numMap,
	height: 100,
	width: 100,
	tempBlockData: [],
	data: null,
	isLoaded: false,
	loadedCallbacks: []
});

const mapaOutdoor = (mapa) => mapa.data.outdoor;

const removeCallbacks = (mapa) => {
	mapa.loadedCallbacks = [];
};

const onceLoaded = (mapa, f) => {
	if (mapa.isLoaded) {
		f(mapa);
	} else {
		mapa.loadedCallbacks.push(f);
	}
};

const setData = (mapa, data) => {
	mapa.data = data;
	mapa.isLoaded = true;

	for (const block of mapa.tempBlockData) {
		setBlockPosition(mapa, block.gridX, block.gridY, block.blocked);
	}
	mapa.tempBlockData = null;

	for (const f of mapa.loadedCallbacks) {
		f(mapa);
	}
	mapa.loadedCallbacks = null;
};

const isBlocked = (mapa, gridX, gridY) => mapa.data.layers[gridX - 1][gridY - 1][0];

const hayAgua = (mapa, gridX, gridY) => {
	const grh1 = getGrh1(mapa, gridX, gridY);
	const grh2 = getGrh2(mapa, gridX, gridY);

	if (grh2) {
		return false;
	}
	if (grh1 >= 1505 && grh1 <= 1520) {
		return true;
	}
	if (grh1 >= 5665 && grh1 <= 5680) {
		return true;
	}
	if (grh1 >= 13547 && grh1 <= 13562) {
		return true;
	}
	return false;
};

const setBlockPosition = (mapa, gridX, gridY, blocked) => {
	if (!mapa.isLoaded) {
		mapa.tempBlockData.push({ gridX, gridY, blocked });
		return false;
	}
	blocked = blocked ? true : false;
	mapa.data.layers[gridX - 1][gridY - 1][0] = blocked;
};

const getGrh = (mapa, numGrh, gridX, gridY) => {
	if (
		mapa.data.layers[gridX - 1] &&
		mapa.data.layers[gridX - 1][gridY - 1] &&
		mapa.data.layers[gridX - 1][gridY - 1][numGrh]
	) {
		return mapa.data.layers[gridX - 1][gridY - 1][numGrh];
	}
	return 0;
};

const getGrh1 = (mapa, gridX, gridY) => getGrh(mapa, 1, gridX, gridY); // devuelve indice de grafico de la primer capa/layer
const getGrh2 = (mapa, gridX, gridY) => getGrh(mapa, 2, gridX, gridY);
const getGrh3 = (mapa, gridX, gridY) => getGrh(mapa, 3, gridX, gridY);
const getGrh4 = (mapa, gridX, gridY) => getGrh(mapa, 4, gridX, gridY);

const isBajoTecho = (mapa, gridX, gridY) => !!mapa.data.layers[gridX - 1][gridY - 1][5];

const isOutOfBounds = (mapa, gridX, gridY) =>
	gridX < 0 || gridX >= mapa.width || gridY < 0 || gridY >= mapa.height;

export {
	init,
	mapaOutdoor,
	removeCallbacks,
	onceLoaded,
	setData,
	isBlocked,
	hayAgua,
	setBlockPosition,
	getGrh,
	getGrh1,
	getGrh2,
	getGrh3,
	getGrh4,
	isBajoTecho,
	isOutOfBounds
};
