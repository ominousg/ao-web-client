/**
 * Created by horacio on 3/9/16.
 * PixiJS migrations by ominousf: v4.0.3 to v6.4.2 on 03/25/2023
 * v6.4.2 to 7.4.0 on 24/02/2024
 */

import Font from '../font';
import { Container, Text } from 'pixi.js';
import GameTextStyle from './gametextstyle';

const initCharacterText = (escala) => {
	const container = new Container();
	const estiloChat = new GameTextStyle(Font.TALK_BASE_FONT, escala);
	container.estiloChat = estiloChat;
	container.infos = [];
	container._chat = null;
	container._escala = escala || 1;
	setEscala(container, escala);
	container.MAXIMO_LARGO_LINEA_CHAT = 18;
	container.DURACION_CHAT = 15000;
	container.DURACION_INFO = 2000;
	return container;
};

const setEscala = (container, escala) => {
	container.estiloChat.setEscala(escala);

	if (container._chat) {
		container._chat.x = Math.round(container._chat.x * (escala / container._escala));
		container._chat.y = Math.round(container._chat.y * (escala / container._escala));
	}
	container.x = Math.round(container.x * (escala / container._escala));
	container.y = Math.round(container.y * (escala / container._escala));

	container._escala = escala;
};

const setPosition = (container, x, y) => {
	container.x = Math.round(x * container._escala);
	container.y = Math.round(y * container._escala);
};

const setChat = (container, chat, color) => {
	removerChat(container);
	chat = formatearChat(container, chat);
	container.estiloChat.fill = color;
	container._chat = new Text(chat.join('\n'), container.estiloChat);

	container._chat.tiempoPasado = 0;

	container.addChild(container._chat);
	container._chat.x = Math.round((32 * container._escala) / 2 - container._chat.width / 2);
	container._chat.y = Math.round(-19 * container._escala - container._chat.height);
};

const addHoveringInfo = (container, value, font) => {
	var estilo = new GameTextStyle(Font.HOVERING_BASE_FONT, container._escala, font);
	var info = new Text(value, estilo);

	info.tiempoPasado = 0;
	container.addChild(info);
	container.infos.push(info);

	info.y = -16 * container._escala - info.height;
	info.x = (32 * container._escala) / 2 - info.width / 2;
};

const update = (container, delta) => {
	updateChat(container, delta);
	updateInfos(container, delta);
};

const formatearChat = (container, str) => {
	var resultado = [];
	str = str.trim();
	while (str.length > container.MAXIMO_LARGO_LINEA_CHAT && str.indexOf(' ') > -1) {
		var idx = str.indexOf(' ');
		var posUltimoEspacioPrimerBloque = idx;
		while (idx != -1 && idx < container.MAXIMO_LARGO_LINEA_CHAT - 1) {
			idx = str.indexOf(' ', idx + 1);
			if (idx > 0) {
				posUltimoEspacioPrimerBloque = idx;
			}
		}
		if (posUltimoEspacioPrimerBloque > 0) {
			resultado.push(str.slice(0, posUltimoEspacioPrimerBloque));
		}
		str = str.slice(posUltimoEspacioPrimerBloque + 1, str.length);
	}
	resultado.push(str);
	return resultado;
};

const removerChat = (container) => {
	if (container._chat) {
		container.removeChild(container._chat);
		container._chat.destroy();
	}
	container._chat = null;
};

const removerInfo = (container, info) => {
	let index = container.infos.indexOf(info);
	if (index > -1) {
		container.infos.splice(index, 1);
		container.removeChild(info);
		info.destroy();
	}
};

const updateChat = (container, delta) => {
	if (!container._chat) return;

	container._chat.tiempoPasado += delta;
	const limit = Math.round(-24 * container._escala - container._chat.height);
	const speed = delta / 10;
	container._chat.y = Math.max(limit, container._chat.y - speed);

	if (container._chat.tiempoPasado > container.DURACION_CHAT) {
		removerChat(container);
	}
};

const updateInfos = (container, delta) => {
	let i;
	for (i = container.infos.length - 1; i >= 0; i--) {
		let info = container.infos[i];
		info.tiempoPasado += delta;
		info.y -= delta / 50;
		var alpha = (container.DURACION_INFO - info.tiempoPasado) / container.DURACION_INFO;
		if (alpha >= 0) {
			info.alpha = alpha;
		}
		if (info.tiempoPasado > container.DURACION_INFO) {
			removerInfo(info);
		}
	}
};

export { initCharacterText, setEscala, setPosition, removerChat, setChat, addHoveringInfo, update };
