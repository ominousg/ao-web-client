/**
 * Created by horacio on 8/20/16.
 * PixiJS migrations by ominousf: v4.0.3 to v6.4.2 on 03/25/2023
 * v6.4.2 to 7.4.0 on 24/02/2024
 */

import { ParticleContainer } from 'pixi.js';
import SpriteGrh from './spritegrh';

const createParticleContainer = () => new ParticleContainer();

const initClimaRenderer = (escala, parentContainer, assetManager, pixiRenderer) => {
	return {
		escala,
		pixiRenderer,
		assetManager,
		parentContainer,
		containerLluvia: null,
		gotas: []
	};
};

const removeLluvia = (climaRenderer) => {
	if (!climaRenderer.containerLluvia) return;

	climaRenderer.parentContainer.removeChild(climaRenderer.containerLluvia);
	climaRenderer.gotas = [];
	climaRenderer.containerLluvia = null;
};

const createLluvia = (climaRenderer) => {
	if (climaRenderer.containerLluvia) return;

	climaRenderer.gotas = [];
	climaRenderer.containerLluvia = createParticleContainer();
	climaRenderer.parentContainer.addChild(climaRenderer.containerLluvia);

	let anguloBase = Math.random() * (Math.PI / 12) + Math.PI / 12;
	let velocidad = 0.5 + Math.pow(anguloBase, 2) * 1.2;
	let cantidadGotas = Math.floor((100 + anguloBase * 250) * climaRenderer.escala);
	if (Math.random() < 0.5) {
		anguloBase = -anguloBase;
	}

	for (let i = 0; i < cantidadGotas; ++i) {
		let gota = new SpriteGrh(climaRenderer.assetManager.getGrh(23652), climaRenderer.escala);

		gota.x = Math.random() * climaRenderer.pixiRenderer.width;
		gota.y = Math.random() * climaRenderer.pixiRenderer.height;
		gota.rotation = anguloBase + (Math.random() * Math.PI) / 16;
		gota.velocidad = velocidad;

		gota.height = (4 + 6 * Math.random()) * climaRenderer.escala;
		gota.alpha = 0.4;
		climaRenderer.gotas.push(gota);
		climaRenderer.containerLluvia.addChild(gota);
	}
};

const update = (climaRenderer, delta) => {
	if (!climaRenderer.containerLluvia) return;

	climaRenderer.gotas.forEach((gota) => {
		gota.position.x -= Math.sin(gota.rotation) * gota.velocidad * delta;
		gota.position.y += Math.cos(gota.rotation) * gota.velocidad * delta;

		if (gota.position.x > climaRenderer.pixiRenderer.width + 20) {
			gota.position.x = -20;
			gota.y = Math.random() * climaRenderer.pixiRenderer.height;
		} else if (gota.position.x < -20) {
			gota.position.x = climaRenderer.pixiRenderer.width + 20;
			gota.y = Math.random() * climaRenderer.pixiRenderer.height;
		}
		if (gota.position.y > climaRenderer.pixiRenderer.height) {
			gota.position.y = -20;
			gota.x = Math.random() * climaRenderer.pixiRenderer.width;
		}
	});
};

export { initClimaRenderer, removeLluvia, createLluvia, update };
