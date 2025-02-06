/**
 * Created by horacio on 8/22/16.
 * PixiJS migrations by ominousf: v4.0.3 to v6.4.2 on 03/25/2023
 * v6.4.2 to 7.4.0 on 24/02/2024
 */
import { Enums } from '../enums';
import Transition from '../transition';
import PIXI from 'pixi.js';

const init = (character) => ({
	movementTransition: new Transition(),
	character
});

const update = (movement, delta) => {
	if (estaMoviendose(movement)) {
		movement.movementTransition.step(delta);
	}
};

const mover = (movement, dir, movimientoCallback, finMovimientoCallback) => {
	const { character } = movement;

	switch (
		dir // Se setea la pos del grid nomas porque la (x,y) la usa para la animacion el character ( y la va actualizando)
	) {
		case Enums.Heading.oeste:
			character.setGridPositionOnly(character.gridX - 1, character.gridY);
			break;
		case Enums.Heading.este:
			character.setGridPositionOnly(character.gridX + 1, character.gridY);
			break;
		case Enums.Heading.norte:
			character.setGridPositionOnly(character.gridX, character.gridY - 1);
			break;
		case Enums.Heading.sur:
			character.setGridPositionOnly(character.gridX, character.gridY + 1);
			break;
		default:
			throw new Error(' Direccion de movimiento invalida!');
	}

	resetMovement(movement);
	character.heading = dir;
	_crearMovimiento(movement, movimientoCallback, finMovimientoCallback);
};

const _crearMovimiento = (movement, callback_mov, finMovimientoCallback) => {
	const { character, movementTransition } = movement;
	const distPrimerFrame = 0;

	if (character.heading === Enums.Heading.oeste) {
		movementTransition.start(
			(x) => {
				character.setPosition(x, character.y);
				if (callback_mov) {
					callback_mov(character.x, character.y);
				}
			},
			() => {
				character.setPosition(movementTransition.endValue, character.y);
				if (callback_mov) {
					callback_mov(character.x, character.y);
				}
				if (finMovimientoCallback) {
					finMovimientoCallback();
				}
			},
			character.x - distPrimerFrame,
			character.x - 32,
			character.moveSpeed
		);
	} else if (character.heading === Enums.Heading.este) {
		movementTransition.start(
			(x) => {
				character.setPosition(x, character.y);
				if (callback_mov) {
					callback_mov(character.x, character.y);
				}
			},
			() => {
				character.setPosition(movementTransition.endValue, character.y);
				if (callback_mov) {
					callback_mov(character.x, character.y);
				}
				if (finMovimientoCallback) {
					finMovimientoCallback();
				}
			},
			character.x + distPrimerFrame,
			character.x + 32,
			character.moveSpeed
		);
	} else if (character.heading === Enums.Heading.norte) {
		movementTransition.start(
			(y) => {
				character.setPosition(character.x, y);
				if (callback_mov) {
					callback_mov(character.x, character.y);
				}
			},
			() => {
				character.setPosition(character.x, movementTransition.endValue);
				if (callback_mov) {
					callback_mov(character.x, character.y);
				}
				if (finMovimientoCallback) {
					finMovimientoCallback();
				}
			},
			character.y - distPrimerFrame,
			character.y - 32,
			character.moveSpeed
		);
	} else if (character.heading === Enums.Heading.sur) {
		movementTransition.start(
			(y) => {
				character.setPosition(character.x, y);
				if (callback_mov) {
					callback_mov(character.x, character.y);
				}
			},
			() => {
				character.setPosition(character.x, movementTransition.endValue);
				if (callback_mov) {
					callback_mov(character.x, character.y);
				}
				if (finMovimientoCallback) {
					finMovimientoCallback();
				}
			},
			character.y + distPrimerFrame,
			character.y + 32,
			character.moveSpeed
		);
	}
};

const estaMoviendose = (movement) => movement.movementTransition.inProgress;

const resetMovement = (movement) => {
	if (estaMoviendose(movement)) {
		movement.movementTransition.stop();
		if (movement.movementTransition.stopFunction) {
			movement.movementTransition.stopFunction();
		}
	}
};

export { init, update, mover, estaMoviendose, resetMovement };
