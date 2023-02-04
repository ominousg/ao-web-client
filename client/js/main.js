const $ = require('jquery');
import 'bootstrap';
const jQuery = require('jquery');
const jQueryUI = require('jquery-ui');

// import 'webpack-jquery-ui';
import App from './app';
import AssetManager from './assets/assetmanager';
import UIManager from './ui/uimanager';
import Settings from './storage/settings';
import _ from './lib/lodash';
import stacktrace from './lib/stacktrace';

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

            uiManager = new UIManager(assetManager);
            app = new App(assetManager, uiManager, settings);
            uiManager.initDOM();

            assetManager.preload(
                () => {
                    setTimeout(function () {
                        app.start();
                    }, 1200);
                },
                (porcentajeCargado) => {
                    uiManager.introUI.updateLoadingBar(porcentajeCargado);
                });
        });
    };

    initApp();

;
