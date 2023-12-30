/**
 * Created by horacio on 3/22/16.
 * Migration from PixiJS v4.0.3 to v6.4.2 by ominousf on 03/25/2023
 */

import { Loader } from 'pixi.js';
import PreloadSounds from '../../preload_config/preload_sounds.json';
import PreloadGraficos from '../../preload_config/preload_graficos.json';
import PreloadMapas from '../../preload_config/preload_mapas.json';

class Preloader {
	constructor(assetManager) {
		this.assetManager = assetManager;
		this.loader = new Loader();
	}

	_preloadSoundsAsync() {
		for (let sound of PreloadSounds) {
			this.assetManager.audio.cargarSonido(sound);
		}
	}

	preload(terminar_callback, progress_callback) {
		// fonts:
		// WebFont.load({
		// 	custom: {
		// 		families: ["Myriad Pro:n4,n7,i4,i7"]
		// 	}
		// });

		// bitmap fonts
		this.loader.add('Roboto Mono', 'fonts/bitmaps/Roboto Mono.fnt');
		this.loader.add('Ubuntu Mono', 'fonts/bitmaps/Ubuntu Mono.fnt');

		//sounds:
		this._preloadSoundsAsync();

		// graficos:
		let self = this;
		let loader = this.loader;

		loader.add('indices', 'indices/graficos.json');

		for (let mapa of PreloadMapas) {
			loader.add(mapa, 'mapas/mapa' + mapa + '.json');
		}

		for (let grafico of PreloadGraficos) {
			loader.add(grafico, 'graficos/' + grafico + '.png');
		}

		loader.onLoad.add((loader, resource) => {
			progress_callback(loader.progress);
		});

		loader.onComplete.add(() => {
			console.log('All resources loaded');
		});

		loader.load((loader, resources) => {
			for (let grafico of PreloadGraficos) {
				self.assetManager._setBaseTexture(grafico, loader.resources[grafico].texture.baseTexture);
			}
			self.assetManager.indices = resources.indices.data;
			terminar_callback();
		});
	}
}

export default Preloader;
