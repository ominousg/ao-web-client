/**
 * Created by horacio on 3/22/16.
 */
/*
import { Loader } from 'pixi.js';
import PreloadSounds from '../../preload_config/preload_sounds.json';
import PreloadGraficos from '../../preload_config/preload_graficos.json';
import PreloadMapas from '../../preload_config/preload_mapas.json';

class Preloader {
  constructor(assetManager) {
    this.assetManager = assetManager;
    this.loader = new Loader();
  }

  _preloadSoundsAsync(){
    for (let sound of PreloadSounds) { //preload async, no necesariamente los termina de cargar antes de empezar
      this.assetManager.audio.cargarSonido(sound);
    }
  }


  preload(terminar_callback, progress_callback) {

    // fonts: // OJO: si se usan web fonts sacar esto y el script del index
    WebFont.load({
      custom: {
        families: ['Myriad Pro:n4,n7,i4,i7']
      }
    });

    //sounds:

    this._preloadSoundsAsync();

    // graficos:

    let self = this;
    let loader = this.loader;

    loader.add("indices", "indices/graficos.json");

    for (let mapa of PreloadMapas) {
      loader.add(mapa, "mapas/mapa" + mapa + ".json");
    }

    for (let grafico of PreloadGraficos) {
      loader.add(grafico, "graficos/" + grafico + ".png");
    }

    loader.onProgress.add(function (loader, resource) {
      progress_callback(loader.progress);
    });

    loader.load(function (loader, resources) {
      for (let grafico of PreloadGraficos) {
        self.assetManager._setBaseTexture(grafico, resources[grafico].texture.baseTexture);
      }
    //   console.log(resources);
      self.assetManager.indices = resources.indices.data;
      terminar_callback();
    });
  }


}

export default Preloader;
*/

import { Loader } from "pixi.js";
import PreloadSounds from "../../preload_config/preload_sounds.json";
import PreloadGraficos from "../../preload_config/preload_graficos.json";
import PreloadMapas from "../../preload_config/preload_mapas.json";

class Preloader {
	constructor(assetManager) {
		this.assetManager = assetManager;
		this.loader = new Loader();
	}

	_preloadSoundsAsync(){
		for (let sound of PreloadSounds) {
			this.assetManager.audio.cargarSonido(sound);
		}
	}

	preload(terminar_callback, progress_callback) {

		// fonts:
		WebFont.load({
			custom: {
				families: ["Myriad Pro:n4,n7,i4,i7"]
			}
		});

		//sounds:
		this._preloadSoundsAsync();

		// graficos:
		let self = this;
		let loader = this.loader;

		loader.add("indices", "indices/graficos.json");

		for (let mapa of PreloadMapas) {
			loader.add(mapa, "mapas/mapa" + mapa + ".json");
		}

		for (let grafico of PreloadGraficos) {
			loader.add(grafico, "graficos/" + grafico + ".png");
		}

		loader.onLoad.add((loader, resource) => {
			progress_callback(loader.progress);
		});

		loader.onComplete.add(() => {
			console.log("All resources loaded");
		});

		loader.load((loader, resources) => {
			for (let grafico of PreloadGraficos){
				self.assetManager._setBaseTexture(grafico, loader.resources[grafico].texture.baseTexture);
			}
			self.assetManager.indices = resources.indices.data;
			terminar_callback();
		});
	}
}

export default Preloader;
