/**
 * Created by horacio on 02/08/2016.
 */
import { Enums } from '../enums';
import Font from '../font';
import * as Renderer from '../view/renderer';

const init = (renderer) => ({
	agregarTextoConsola: (texto, font) => Renderer.agregarTextoConsola(renderer, texto, font),
	agregarCharacterHoveringInfo: (char, valor, font) =>
		Renderer.agregarCharacterHoveringInfo(renderer, char, valor, font),
	setCharacterChat: (char, chat, r, g, b) => Renderer.setCharacterChat(renderer, char, chat, r, g, b),
	removerChat: (char) => Renderer.removerChat(renderer, char)
});

const playerHitByUser = (gameText, player, parteCuerpo, danio, attackerName) => {
	let bodyPartMessage;
	switch (parteCuerpo) {
		case Enums.ParteCuerpo.cabeza:
			bodyPartMessage = Enums.MensajeConsola.RECIBE_IMPACTO_CABEZA;
			break;
		case Enums.ParteCuerpo.brazoIzquierdo:
			bodyPartMessage = Enums.MensajeConsola.RECIBE_IMPACTO_BRAZO_IZQ;
			break;
		case Enums.ParteCuerpo.brazoDerecho:
			bodyPartMessage = Enums.MensajeConsola.RECIBE_IMPACTO_BRAZO_DER;
			break;
		case Enums.ParteCuerpo.piernaIzquierda:
			bodyPartMessage = Enums.MensajeConsola.RECIBE_IMPACTO_PIERNA_IZQ;
			break;
		case Enums.ParteCuerpo.piernaDerecha:
			bodyPartMessage = Enums.MensajeConsola.RECIBE_IMPACTO_PIERNA_DER;
			break;
		case Enums.ParteCuerpo.torso:
			bodyPartMessage = Enums.MensajeConsola.RECIBE_IMPACTO_TORSO;
			break;
		default:
			throw new Error('Mensaje de parte de cuerpo invalido');
	}
	let txt =
		Enums.MensajeConsola.MENSAJE_1 + attackerName + bodyPartMessage + danio + Enums.MensajeConsola.MENSAJE_2;

	gameText.agregarCharacterHoveringInfo(player, -danio, Font.CANVAS_DANIO_RECIBIDO);
	gameText.agregarTextoConsola(txt, Font.FIGHT);
};

const playerHitByMob = (gameText, player, parteCuerpo, danio) => {
	let bodyPartMessage;
	switch (parteCuerpo) {
		case Enums.ParteCuerpo.cabeza:
			bodyPartMessage = Enums.MensajeConsola.MENSAJE_GOLPE_CABEZA;
			break;
		case Enums.ParteCuerpo.brazoIzquierdo:
			bodyPartMessage = Enums.MensajeConsola.MENSAJE_GOLPE_BRAZO_IZQ;
			break;
		case Enums.ParteCuerpo.brazoDerecho:
			bodyPartMessage = Enums.MensajeConsola.MENSAJE_GOLPE_BRAZO_DER;
			break;
		case Enums.ParteCuerpo.piernaIzquierda:
			bodyPartMessage = Enums.MensajeConsola.MENSAJE_GOLPE_PIERNA_IZQ;
			break;
		case Enums.ParteCuerpo.piernaDerecha:
			bodyPartMessage = Enums.MensajeConsola.MENSAJE_GOLPE_PIERNA_DER;
			break;
		case Enums.ParteCuerpo.torso:
			bodyPartMessage = Enums.MensajeConsola.MENSAJE_GOLPE_TORSO;
			break;
		default:
			throw new Error('Mensaje de parte de cuerpo invalido');
	}
	let txt = Enums.MensajeConsola.MENSAJE_1 + bodyPartMessage + danio + Enums.MensajeConsola.MENSAJE_2;
	gameText.agregarCharacterHoveringInfo(player, -danio, Font.CANVAS_DANIO_RECIBIDO);
	gameText.agregarTextoConsola(txt, Font.FIGHT);
};

const playerHitMob = (gameText, bicho, danio) => {
	if (bicho) {
		gameText.agregarCharacterHoveringInfo(bicho, danio, Font.CANVAS_DANIO_REALIZADO);
	}
	gameText.agregarTextoConsola(
		Enums.MensajeConsola.MENSAJE_GOLPE_CRIATURA_1 + danio + Enums.MensajeConsola.MENSAJE_2,
		Font.FIGHT
	);
};

const playerHitUser = (gameText, hittedUser, parteCuerpo, danio) => {
	gameText.agregarCharacterHoveringInfo(hittedUser, danio, Font.CANVAS_DANIO_REALIZADO);

	let bodyPartMessage;
	switch (parteCuerpo) {
		case Enums.ParteCuerpo.cabeza:
			bodyPartMessage = Enums.MensajeConsola.PRODUCE_IMPACTO_CABEZA;
			break;
		case Enums.ParteCuerpo.brazoIzquierdo:
			bodyPartMessage = Enums.MensajeConsola.PRODUCE_IMPACTO_BRAZO_IZQ;
			break;
		case Enums.ParteCuerpo.brazoDerecho:
			bodyPartMessage = Enums.MensajeConsola.PRODUCE_IMPACTO_BRAZO_DER;
			break;
		case Enums.ParteCuerpo.piernaIzquierda:
			bodyPartMessage = Enums.MensajeConsola.PRODUCE_IMPACTO_PIERNA_IZQ;
			break;
		case Enums.ParteCuerpo.piernaDerecha:
			bodyPartMessage = Enums.MensajeConsola.PRODUCE_IMPACTO_PIERNA_DER;
			break;
		case Enums.ParteCuerpo.torso:
			bodyPartMessage = Enums.MensajeConsola.PRODUCE_IMPACTO_TORSO;
			break;
		default:
			throw new Error('Mensaje de parte de cuerpo invalido');
	}
	let attackerName = hittedUser.nombre;
	let txt =
		Enums.MensajeConsola.PRODUCE_IMPACTO_1 +
		attackerName +
		bodyPartMessage +
		danio +
		Enums.MensajeConsola.MENSAJE_2;
	gameText.agregarTextoConsola(txt, Font.FIGHT);
};

const consoleMsg = (gameText, texto, font) => {
	if (!font) {
		font = Font.INFO;
	}
	gameText.agregarTextoConsola(texto, font);
};

const chat = (gameText, c, chat, r, g, b) => {
	if (c) {
		gameText.setCharacterChat(c, chat, r, g, b);
	}
};

const removeCharacterChat = (gameText, character) => {
	gameText.removerChat(character);
};

export {
	init,
	playerHitByUser,
	playerHitByMob,
	playerHitMob,
	playerHitUser,
	consoleMsg,
	chat,
	removeCharacterChat
};
