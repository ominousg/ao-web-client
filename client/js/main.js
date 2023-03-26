const $ = require("jquery");
import "bootstrap";
const jQuery = require("jquery");
const jQueryUI = require("jquery-ui");

// import 'webpack-jquery-ui';
import App from "./app";
import AssetManager from "./assets/assetmanager";
import UIManager from "./ui/uimanager";
import Settings from "./storage/settings";
import stacktrace from "./lib/stacktrace";

let app, uiManager, assetManager, settings;

function setupAudio(audio, settings) {
	audio.setSoundMuted(settings.getSoundMuted());
	audio.setMusicMuted(settings.getMusicMuted());
	audio.setMusicVolume(settings.getMusicVolume());
	audio.setSoundVolume(settings.getSoundVolume());
	audio.setMusic("intro");
}

var initApp = function () {
	$(document).ready(function () {

		settings = new Settings();
		assetManager = new AssetManager();
		setupAudio(assetManager.audio, settings);

		// overlay negro inicial
		const overlay = document.getElementById("overlay");
		setTimeout(() => {
			overlay.classList.remove("initial");
		}, 100);

		uiManager = new UIManager(assetManager);
		app = new App(assetManager, uiManager, settings);
		uiManager.initDOM();

		assetManager.preload(
			() => {
				setTimeout(function () {
					app.start();
				}, 2200);
				// delay artificial antes de cambiar a la imagen background.png del login
				// bajar el valor en dev (para no perder mucho tiempo), y subirlo en prod. Idealmente traer el valor de una variable en el .env
				setTimeout(() => {
					uiManager.hideIntro();
				}, 2200);
			},
			(porcentajeCargado) => {
				uiManager.introUI.updateLoadingBar(porcentajeCargado);
			});
	});
};

initApp();


