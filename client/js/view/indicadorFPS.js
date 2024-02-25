import { BitmapText } from 'pixi.js';

const createBitmapText = () =>
	new BitmapText(' ', {
		fontName: 'Roboto Mono',
		fontSize: 18,
		tint: 0xffff00
	});

const initIndicadorFPS = (escala) => createBitmapText(escala);

const actualizar = (indicadorFPS, fps) => {
	indicadorFPS.text = `FPS: ${fps}`;
};

export { initIndicadorFPS, actualizar };
