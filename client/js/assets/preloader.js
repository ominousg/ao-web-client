/**
 * Created by horacio on 3/22/16.
 * Migration from PixiJS v4.0.3 to v6.4.2 by ominousf on 03/25/2023
 */

import { Assets } from 'pixi.js';
import PreloadSounds from '../../preload_config/preload_sounds.json';
import PreloadGraficos from '../../preload_config/preload_graficos.json';
import PreloadMapas from '../../preload_config/preload_mapas.json';

class Preloader {
	constructor(assetManager) {
		this.assetManager = assetManager;
	}

	_preloadSoundsAsync() {
		for (let sound of PreloadSounds) {
			this.assetManager.audio.cargarSonido(sound);
		}
	}

	async preload(terminar_callback, progress_callback) {
		// fonts:
		// WebFont.load({
		// 	custom: {
		// 		families: ["Myriad Pro:n4,n7,i4,i7"]
		// 	}
		// });

		// bitmap fonts
		Assets.add({ alias: 'Roboto Mono', src: 'fonts/bitmaps/Roboto Mono.fnt' });
		Assets.add({ alias: 'Ubuntu Mono', src: 'fonts/bitmaps/Ubuntu Mono.fnt' });

		// indices
		Assets.add({ alias: 'indices', src: 'indices/graficos.json' });
		Assets.add({ alias: 'armas', src: 'indices/armas.json' });
		Assets.add({ alias: 'cuerpos', src: 'indices/cuerpos.json' });
		Assets.add({ alias: 'escudos', src: 'indices/escudos.json' });
		Assets.add({ alias: 'cabezas', src: 'indices/cabezas.json' });
		Assets.add({ alias: 'fxs', src: 'indices/fxs.json' });

		for (let mapa of PreloadMapas) {
			Assets.add({ alias: mapa, src: 'mapas/mapa' + mapa + '.json' });
		}

		for (let grafico of PreloadGraficos) {
			Assets.add({ alias: grafico, src: 'graficos/' + grafico + '.png' });
		}

		try {
			for (let key of [
				...PreloadMapas,
				...PreloadGraficos,
				'indices',
				'armas',
				'cuerpos',
				'escudos',
				'cabezas',
				'fxs',
				'Roboto Mono',
				'Ubuntu Mono'
			]) {
				await Assets.load(key, (progress) => progress_callback(progress));

				if (PreloadGraficos.includes(key)) {
					const loadedTexture = Assets.get(key);
					if (loadedTexture) {
						this.assetManager._setBaseTexture(key, loadedTexture);
					} else {
						console.error('No se pudo cargar el asset:', key);
					}
				}
			}

			const indicesData = Assets.get('indices');

			if (indicesData && indicesData.length > 1) {
				this.assetManager.indices = indicesData;
			} else {
				console.error('La data de los indices no se pudo cargar o tiene formato incorrecto.');
			}

			terminar_callback();
		} catch (error) {
			console.error('Error cargando assets:', error);
		}
	}
}

export default Preloader;
