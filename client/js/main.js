const $ = require("jquery");
import "bootstrap";
const jQuery = require("jquery");
const jQueryUI = require("jquery-ui");
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import GuiaMapa from "./ui/popups/migration/guiamapa/GuiaMapa.jsx";
import Ajustes from "./ui/popups/migration/ajustes/Ajustes.jsx";
import Estadisticas from "./ui/popups/migration/estadisticas/Estadisticas.jsx";
import App from "./app";
import AssetManager from "./assets/assetmanager";
import UIManager from "./ui/uimanager";
import Settings from "./storage/settings";
import eventEmitter from "./ui/utils/eventEmitter.js";
import useStore from "./store.js";
import { PopupNames } from "./ui/popups/popupNames.js";

let app, uiManager, assetManager, settings;

const rootElement = document.getElementById("react-root");
const root = ReactDOM.createRoot(rootElement);

const GameApp = () => {

	useEffect(() => {
		const handleOpen = (popupName) => () => useStore.getState().openPopup(popupName);

		Object.values(PopupNames).forEach(popupName => {
			eventEmitter.on(popupName, handleOpen(popupName));
		});

		return () => {
			Object.values(PopupNames).forEach(popupName => {
				eventEmitter.off(popupName, handleOpen(popupName));
			});
		};
	}, []);

	return (
		<>
			{/* <Ajustes />
      <Estadisticas /> */}
			<GuiaMapa />
		</>
	);
};

root.render(
	<GameApp />
);

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
