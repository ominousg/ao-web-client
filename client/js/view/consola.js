/**
 * Created by horacio on 3/8/16.
 * Migration from PixiJS v4.0.3 to v6.4.2 by ominousf on 03/25/2023
 */
import Font from "../font";
import { Container, Text } from "pixi.js";
import rendererUtils from "./rendererutils";
import GameTextStyle from "./gametextstyle";

function Consola(escala) {
	Container.call(this);

	this.DURACION_TEXTO = 5000;
	this.CANT_LINEAS = 7;

	escala = escala || 1;
	this._escala = escala;
	this.setEscala(escala);

	this._elapsedTime = 0;
}

Consola.prototype = Object.create(Container.prototype);
Consola.constructor = Consola;

Consola.prototype.setEscala = function (escala) {
	for (var i = 0; i < this.children.length; i++) {
		this.children[i].style.setEscala(escala);
		this.children[i].y = this.children[0].height * i;
	}
	this._escala = escala;
};

Consola.prototype.update = function (delta) {
	this._elapsedTime += delta;

	//solo checkeo primer item porque fue el primero en aparecer
	let texto = this.children[0];
	if (!texto) {
		return;
	}
	if (texto.tiempoInicial + this.DURACION_TEXTO < this._elapsedTime) {
		this._removerTexto(texto);
	}
};


Consola.prototype._removerTexto = function (spriteTexto) {
	for (var i = 0; i < this.children.length; i++) {
		this.children[i].y -= spriteTexto.height;
		// aumento el tiempo restante de los que tienen poco asi no se van todos de una
		let tiempoRestante = this.children[i].tiempoInicial + this.DURACION_TEXTO - this._elapsedTime;
		if (tiempoRestante < this.DURACION_TEXTO/5 ){
			this.children[i].tiempoInicial += this.DURACION_TEXTO/5;
		}
	}
	rendererUtils.removePixiChild(this,spriteTexto);
};

Consola.prototype.agregarTexto = function (texto, font) {
	let estilo = new GameTextStyle(Font.CONSOLA_BASE_FONT,this._escala,font);
	let nuevoTexto = new Text(texto, estilo);

	if (this.children.length > this.CANT_LINEAS - 1) {
		this._removerTexto(this.children[0]);
	}
	var y = 0;
	if (this.children[0]) {
		y = this.children[0].height * this.children.length;
	}
	nuevoTexto.y = y;
	nuevoTexto.tiempoInicial = this._elapsedTime;

	this.addChild(nuevoTexto);
};

export default Consola;
