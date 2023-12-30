/**
 * Created by horacio on 3/8/16.
 * Migration from PixiJS v4.0.3 to v6.4.2 by ominousf on 03/25/2023
 */
import Font from '../font';
import { Container, Text } from 'pixi.js';
import { removePixiChild } from './rendererutils';
import GameTextStyle from './gametextstyle';

export default class Consola extends Container {
	constructor(escala) {
		super();

		this.DURACION_TEXTO = 5000;
		this.CANT_LINEAS = 7;

		escala = escala || 1;
		this._escala = escala;
		this.setEscala(escala);

		this._elapsedTime = 0;
	}

	setEscala(escala) {
		for (let i = 0; i < this.children.length; i++) {
			this.children[i].style.setEscala(escala);
			this.children[i].y = this.children[0].height * i;
		}
		this._escala = escala;
	}

	update(delta) {
		this._elapsedTime += delta;

		//solo checkeo primer item porque fue el primero en aparecer
		let texto = this.children[0];
		if (!texto) {
			return;
		}
		if (texto.tiempoInicial + this.DURACION_TEXTO < this._elapsedTime) {
			this._removerTexto(texto);
		}
	}

	_removerTexto(spriteTexto) {
		for (let i = 0; i < this.children.length; i++) {
			this.children[i].y -= spriteTexto.height;
			// aumento el tiempo restante de los que tienen poco asi no se van todos de una
			let tiempoRestante = this.children[i].tiempoInicial + this.DURACION_TEXTO - this._elapsedTime;
			if (tiempoRestante < this.DURACION_TEXTO / 5) {
				this.children[i].tiempoInicial += this.DURACION_TEXTO / 5;
			}
		}
		removePixiChild(this, spriteTexto);
	}

	insertBreaksInLongStrings(text, maxLineLength) {
		const words = text.split(' ');
		return words
			.map((word) => {
				if (word.length > maxLineLength) {
					return word.replace(new RegExp(`(.{${maxLineLength}})`, 'g'), '$1 ');
				}
				return word;
			})
			.join(' ');
	}

	insertForcedBreaks(text, maxLineWidth, fontStyle) {
		let sampleText = new Text('j', fontStyle);
		this.addChild(sampleText);
		const averageCharWidth = sampleText.width / sampleText.text.length;
		this.removeChild(sampleText);

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
	}

	agregarTexto(texto, font) {
		let estilo = new GameTextStyle(Font.CONSOLA_BASE_FONT, this._escala, font);
		estilo.wordWrap = true;
		estilo.wordWrapWidth = 700 + (1000 - 700) * ((this._escala - 1.387) / (1.968 - 1.387));

		let processedText = this.insertForcedBreaks(texto, estilo.wordWrapWidth, estilo);
		let nuevoTexto = new Text(processedText, estilo);

		this.addChild(nuevoTexto);

		if (this.children.length > this.CANT_LINEAS) {
			this._removerTexto(this.children[0]);
		}

		for (let i = 1; i < this.children.length; i++) {
			this.children[i].y = this.children[i - 1].y + this.children[i - 1].height;
		}

		nuevoTexto.tiempoInicial = this._elapsedTime;

		if (this.children.length > 0) {
			this.children[0].y = 0;
		}
	}
}
