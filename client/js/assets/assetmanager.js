import jsonArmas from "../../indices/armas.json";
import jsonCabezas from "../../indices/cabezas.json";
import jsonCascos from "../../indices/cascos.json";
import jsonCuerpos from "../../indices/cuerpos.json";
import jsonEscudos from "../../indices/escudos.json";
import jsonFxs from "../../indices/fxs.json";
import { settings, BaseTexture, Texture, Rectangle,SCALE_MODES, GC_MODES } from "pixi.js";
import Preloader from "./preloader";
import Audio from "./audio";

class AssetManager {
	constructor() {
		this.audio = new Audio();

		this.indices = null; // cargados por el preloader
		this.armas = jsonArmas;
		this.cabezas = jsonCabezas;
		this.cascos = jsonCascos;
		this.cuerpos = jsonCuerpos;
		this.escudos = jsonEscudos;
		this.fxs = jsonFxs;
		this._baseTextures = [];

		this.grhs = [];
		this.dataMapas = [];
		this.preloader = new Preloader(this);

		settings.SCALE_MODE = SCALE_MODES.NEAREST;
		settings.MIPMAP_TEXTURES = false;
		settings.GC_MODE = GC_MODES.MANUAL;
	}

	getNumCssGraficoFromGrh(grh) {
		if (!this.indices[grh]) {
			return null;
		}
		if (this.indices[grh].css) {
			return this.indices[grh].css;
		}
		// animacion, devuelvo grafico del primer frame
		return this.getNumCssGraficoFromGrh(this.indices[grh].frames[0]);
	}

	getFaceGrafFromNum(numHead) {
		if (!this.cabezas[numHead]) {
			return;
		}
		var grh = this.cabezas[numHead].down;
		return this.getNumCssGraficoFromGrh(grh);
	}

	getBodyGrafFromNum(numCuerpo) {
		if (!this.cuerpos[numCuerpo]) {
			return;
		}
		var grh = this.cuerpos[numCuerpo].down;
		return this.getNumCssGraficoFromGrh(grh);
	}

	getGrh(grh) {
		if (!this.grhs[grh]) {
			this.loadGrh(grh);
		}
		return this.grhs[grh];
	}

	getTerrenoGrh(grh) {
		if (!this.grhs[grh]) {
			this.loadGrh(grh);
		}
		var res = this.grhs[grh];

		return res;
	}

	loadGrh(grh) {
		if (!this.indices[grh] || this.grhs[grh]) {
			return;
		}
		if (this.indices[grh].frames) {// animacion
			var frameNumbers = this.indices[grh].frames;
			var vecgrhs = [];
			for (var j = 0; j < frameNumbers.length; j++) {
				if (!this.grhs[frameNumbers[j]]) {
					this._loadGrhGrafico(frameNumbers[j]);
				}
				vecgrhs.push(this.grhs[frameNumbers[j]]);
			}
			this.grhs[grh] = {frames: vecgrhs, velocidad: this.indices[grh].velocidad};
		}
		else { // no animacion
			this._loadGrhGrafico(grh);
		}
	}

	_loadGrhGrafico(grh) {
		var nombreGrafico = this.indices[grh].grafico;
		if (!this._baseTextures[nombreGrafico]) { // cargar basetexture
			this._setBaseTexture(nombreGrafico, new BaseTexture.from("graficos/" + nombreGrafico + ".png"));
		}
		this.grhs[grh] = new Texture(this._baseTextures[nombreGrafico], new Rectangle(this.indices[grh].offX, this.indices[grh].offY, this.indices[grh].width, this.indices[grh].height));
	}

	_setBaseTexture(nombreGrafico, baseTexture) {
		this._baseTextures[nombreGrafico] = baseTexture;
	}


	getMapaASync(numMapa, completeCallback) {
    if (!this.dataMapas[numMapa]) {
      fetch(`mapas/mapa${numMapa}.json`)
        .then(response => {
          if (!response.ok) throw new Error(`Error cargando mapa ${numMapa}`);
          return response.json();
        })
        .then(data => {
          this.dataMapas[numMapa] = data;
          completeCallback(this.dataMapas[numMapa]);
        })
        .catch(error => {
          alert(error.message);
          this.getMapaASync(numMapa, completeCallback);
        });
    } else {
      completeCallback(this.dataMapas[numMapa]);
    }
  }

	preload(terminar_callback, progress_callback) {
		this.preloader.preload(terminar_callback, progress_callback);
	}

	getIndices() {
		return this.indices;
	}

	getArmas() {
		return this.armas;
	}

	getCabezas() {
		return this.cabezas;
	}

	getCascos() {
		return this.cascos;
	}

	getCuerpos() {
		return this.cuerpos;
	}

	getEscudos() {
		return this.escudos;
	}

	getFxs() {
		return this.fxs;
	}
}

export default AssetManager;