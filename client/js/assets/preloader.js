/**
 * Created by horacio on 3/22/16.
 * PixiJS migrations by ominousf: v4.0.3 to v6.4.2 on 03/25/2023
 * v6.4.2 to 7.4.0 on 24/02/2024
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

		const allAssets = [
			{ alias: 'Roboto Mono', src: 'fonts/bitmaps/Roboto Mono.fnt' },
			{ alias: 'Ubuntu Mono', src: 'fonts/bitmaps/Ubuntu Mono.fnt' },
			{ alias: 'indices', src: 'indices/graficos.json' },
			{ alias: 'armas', src: 'indices/armas.json' },
			{ alias: 'cuerpos', src: 'indices/cuerpos.json' },
			{ alias: 'escudos', src: 'indices/escudos.json' },
			{ alias: 'cabezas', src: 'indices/cabezas.json' },
			{ alias: 'fxs', src: 'indices/fxs.json' },
			...PreloadMapas.map((mapa) => ({ alias: mapa, src: `mapas/mapa${mapa}.json` })),
			...PreloadGraficos.map((grafico) => ({ alias: grafico, src: `graficos/${grafico}.png` }))
		];

		const totalAssets = allAssets.length;
		let loadedAssets = 0;

		allAssets.forEach((asset) => Assets.add(asset));

		// trackeando progreso para la loadingBar
		const updateProgress = () => {
			loadedAssets++;
			const progress = (loadedAssets / totalAssets) * 100;
			progress_callback(progress);

			if (loadedAssets === totalAssets) onAllAssetsLoaded();
		};

		const onAllAssetsLoaded = () => {
			PreloadGraficos.forEach((key) => {
				const loadedTexture = Assets.get(key);
				if (loadedTexture) {
					this.assetManager._setBaseTexture(key, loadedTexture);
				} else {
					console.error('No se pudo cargar el asset:', key);
				}
			});

			const indicesData = Assets.get('indices');
			if (indicesData && indicesData.length > 1) {
				this.assetManager.indices = indicesData;
			} else {
				console.error('La data de los indices no se pudo cargar o tiene formato incorrecto.');
			}

			terminar_callback();
		};

		try {
			for (let asset of allAssets) {
				await Assets.load(asset.alias).then(updateProgress);
			}
		} catch (error) {
			console.error('Error cargando assets:', error);
		}
	}
}

export default Preloader;
