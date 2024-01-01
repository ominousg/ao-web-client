const $ = require('jquery');
import 'bootstrap';
const jQuery = require('jquery');
const jQueryUI = require('jquery-ui');
import React, { useEffect, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import Ajustes from './ui/popups/migration/ajustes/Ajustes.jsx';
const Estadisticas = React.lazy(() => import('./ui/popups/migration/estadisticas/Estadisticas.jsx'));
const GuiaMapa = React.lazy(() => import('./ui/popups/migration/guiamapa/GuiaMapa.jsx'));
const ConsolaCompleta = React.lazy(() => import('./ui/popups/migration/consola/ConsolaCompleta.jsx'));
import App from './app';
import AssetManager from './assets/assetmanager';
import UIManager from './ui/uimanager';
import Settings from './storage/settings';
import eventEmitter from './ui/utils/eventEmitter.js';
import { useUIStore } from './stores/';
import { PopupNames } from './ui/popups/popupNames.js';

let app, uiManager, assetManager, settings;

const rootElement = document.getElementById('react-root');
const root = ReactDOM.createRoot(rootElement);

const GameApp = () => {
	const { popups } = useUIStore();

	useEffect(() => {
		const handleOpen = (popupName) => () => useUIStore.getState().openPopup(popupName);

		Object.values(PopupNames).forEach((popupName) => {
			eventEmitter.on(popupName, handleOpen(popupName));
		});

		return () => {
			Object.values(PopupNames).forEach((popupName) => {
				eventEmitter.off(popupName, handleOpen(popupName));
			});
		};
	}, []);

	return (
		<>
			<Suspense fallback={null}>
				{/* <Ajustes /> */}
				{popups[PopupNames.ESTADISTICAS] && <Estadisticas />}
				{popups[PopupNames.GUIA_MAPA] && <GuiaMapa />}
				{popups[PopupNames.CONSOLA_COMPLETA] && <ConsolaCompleta />}
			</Suspense>
		</>
	);
};

root.render(<GameApp />);

function setupAudio(audio, settings) {
	audio.setSoundMuted(settings.getSoundMuted());
	audio.setMusicMuted(settings.getMusicMuted());
	audio.setMusicVolume(settings.getMusicVolume());
	audio.setSoundVolume(settings.getSoundVolume());
	audio.setMusic('intro');
}

var initApp = function () {
	$(document).ready(function () {
		settings = new Settings();
		assetManager = new AssetManager();
		setupAudio(assetManager.audio, settings);

		// overlay negro inicial
		const overlay = document.getElementById('overlay');
		setTimeout(() => {
			overlay.classList.remove('initial');
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
				setTimeout(() => {
					uiManager.hideIntro();
				}, 2200);
			},
			(porcentajeCargado) => {
				uiManager.introUI.updateLoadingBar(porcentajeCargado);
			}
		);
	});
};

initApp();
