import * as Renderer from './view/renderer';
import * as World from './model/world';

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
		World.forEachCharacter(this.game.world, (character) => {
			character.update(delta);
		});
	}
}

export default Updater;
