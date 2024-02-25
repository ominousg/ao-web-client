/**
 * Created by horacio on 3/8/16.
 * PixiJS migrations by ominousf: v4.0.3 to v6.4.2 on 03/25/2023
 * v6.4.2 to 7.4.0 on 24/02/2024
 */

import Font from '../font';
import { Container, Text } from 'pixi.js';
import { removePixiChild } from './rendererutils';
import GameTextStyle from './gametextstyle';
import { useConsoleMessagesStore } from '../stores';

const initConsola = (escala = 1) => {
	const consola = new Container();
	consola.DURACION_TEXTO = 5000;
	consola.CANT_LINEAS = 7;
	consola.escala = escala;
	consola.elapsedTime = 0;
	consola.messageBatch = [];
	consola.batchInterval = 5000;
	consola.batchTimeout = null;

	setEscala(consola, escala);

	return consola;
};

const setEscala = (consola, escala) => {
	consola.children.forEach((child, i) => {
		child.style.setEscala(escala);
		child.y = consola.children[0].height * i;
	});
	consola.escala = escala;
};

const update = (consola, delta) => {
	consola.elapsedTime += delta;

	//solo checkeo primer item porque fue el primero en aparecer
	let texto = consola.children[0];
	if (texto && texto.tiempoInicial + consola.DURACION_TEXTO < consola.elapsedTime) {
		removerTexto(consola, texto);
	}
};

const flushMessageBatch = (consola) => {
	if (consola.messageBatch.length > 0) {
		useConsoleMessagesStore.getState().addMessages(consola.messageBatch);
		consola.messageBatch = [];
	}
};

const removerTexto = (consola, spriteTexto) => {
	consola.children.forEach((child, i) => {
		if (i > 0) {
			child.y -= spriteTexto.height;
		}
		// aumento el tiempo restante de los que tienen poco asi no se van todos de una
		let tiempoRestante = child.tiempoInicial + consola.DURACION_TEXTO - consola.elapsedTime;
		if (tiempoRestante < consola.DURACION_TEXTO / 5) {
			child.tiempoInicial += consola.DURACION_TEXTO / 5;
		}
	});
	removePixiChild(consola, spriteTexto);
};

const agregarTexto = (consola, texto, font) => {
	let estilo = new GameTextStyle(Font.CONSOLA_BASE_FONT, consola.escala, font);
	estilo.wordWrap = true;
	estilo.wordWrapWidth = 700 + (1000 - 700) * ((consola.escala - 1.387) / (1.968 - 1.387));

	let processedText = insertForcedBreaks(texto, estilo.wordWrapWidth, estilo);
	let nuevoTexto = new Text(processedText, estilo);

	consola.addChild(nuevoTexto);

	if (consola.children.length > consola.CANT_LINEAS) {
		removerTexto(consola, consola.children[0]);
	}

	consola.children.forEach((child, i) => {
		if (i > 0) {
			child.y = consola.children[i - 1].y + consola.children[i - 1].height;
		}
	});

	nuevoTexto.tiempoInicial = consola.elapsedTime;

	if (consola.children.length > 0) {
		consola.children[0].y = 0;
	}

	consola.messageBatch.push({ text: processedText, style: estilo });

	if (!consola.batchTimeout) {
		consola.batchTimeout = setTimeout(() => {
			flushMessageBatch(consola);
			consola.batchTimeout = null;
		}, consola.batchInterval);
	}
};

const insertForcedBreaks = (text, maxLineWidth, fontStyle) => {
	let sampleText = new Text('j', fontStyle);
	const averageCharWidth = sampleText.width / sampleText.text.length;

	const reductionFactor = 2;
	const maxCharsInLine = Math.floor((maxLineWidth / averageCharWidth) * reductionFactor);

	let result = '';
	let currentLineLength = 0;

	for (const char of text) {
		result += char;
		currentLineLength++;
		if (currentLineLength >= maxCharsInLine) {
			result += ' ';
			currentLineLength = 0;
		}
	}

	return result;
};

export { initConsola, setEscala, update, agregarTexto };
