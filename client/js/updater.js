import * as Renderer from './view/renderer';

class Updater {
	constructor(game) {
		this.game = game;
	}

	update(delta) {
		if (this.game.logeado) {
			if (this.game.player) {
				this.updateComenzarMovimientoPlayer();
			}
			this.updateCharacters(delta);
			Renderer.update(this.game.renderer, delta);
		}
	}

	updateComenzarMovimientoPlayer() {
		this.game.playerMovement.tratarDeMover();
	}

	updateCharacters(delta) {
		this.game.world.forEachCharacter((character) => {
			character.update(delta);
		});
	}
}

export default Updater;
