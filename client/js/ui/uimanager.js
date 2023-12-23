/**
 * Created by horacio on 4/6/16.
 */
import { Enums } from '../enums';
import LoginUI from './loginui';
import CrearPjUI from './crearpjui';
import GameUI from './game/gameui';
import Mensaje from './popups/mensaje';
import IntroUI from './introui';

class UIManager {
	constructor(assetManager) {
		this.assetManager = assetManager;
		this.mensaje = new Mensaje();
		this.introUI = new IntroUI();
		this.loginUI = new LoginUI();
		this.crearPjUI = new CrearPjUI(this.assetManager, this.mensaje);
		this.playSonidoClick = this._createPlaySonidoCallback();

		this.gameUI = null;

		//en px
		this.widthMenuJuego = 154;
		this.widthJuego = 17 * 32;
		this.heightJuego = 13 * 32;
		this.FOOTER_HEIGHT = 60;

		this.escala = null;
	}

	_createPlaySonidoCallback() {
		const self = this;
		const sonidoCb = function (element) {
			if (element && !element.classList.contains('noClickSound')) {
				self.assetManager.audio.playSound(Enums.SONIDOS.click);
			}
		};
		return sonidoCb;
	}

	center() {
		window.scrollTo(0, 1);
	}

	setLoginScreen() {
		const body = document.body;
		body.classList.remove('jugar');
		body.classList.remove('crear');
		body.classList.add('login');
		this.loginUI.setPlayButtonState(true);
		this.loginUI.setCrearButtonState(true);
		if (this.gameUI) {
			this.gameUI.hideGamePopUps();
		}
	}

	setCrearPJScreen() {
		const body = document.body;
		body.classList.remove('login');
		body.classList.remove('jugar');
		body.classList.add('crear');
	}

	setGameScreen() {
		const body = document.body;
		body.classList.remove('login');
		body.classList.remove('crear');
		body.classList.add('jugar');
	}

	initDOM() {
		this.resizeUi();

		const self = this;

		const clickables = document.querySelectorAll('.clickable');
		clickables.forEach((element) => {
			element.addEventListener('click', (event) => {
				event.stopPropagation();
			});
		});

		document.addEventListener('touchstart', function () {}, false);

		const resizeCallback = this.resizeUi.bind(this);
		window.addEventListener('resize', function (event) {
			clearTimeout(this.resizeTimeout);
			this.resizeTimeout = setTimeout(resizeCallback, 100);
		});

		const buttons = document.querySelectorAll('button');
		buttons.forEach((element) => {
			element.addEventListener('click', (event) => {
				self.playSonidoClick(element);
			});
		});
	}

	setFooterHidden(gameRatio, windowWidth, windowHeight) {
		windowHeight -= this.FOOTER_HEIGHT;
		let windowRatio = windowWidth / windowHeight;

		if (gameRatio * 0.8 > windowRatio) {
			// limita el width
			$('footer').show();
			document.querySelector('footer').style.display = 'none';
			return false;
		}
		if (windowHeight < 600) {
			document.querySelector('footer').style.display = 'none';
			return true;
		}
		document.querySelector('footer').style.display = 'none';
		return false;
	}

	resizeUi() {
		let menuBorderWidth = parseInt(
			window.getComputedStyle(document.getElementById('menuJuego')).borderLeftWidth
		); // solo borde izq, los demas valen 0
		let containerBorderWidth = parseInt(
			window.getComputedStyle(document.getElementById('container')).borderLeftWidth
		); // 4 bordes iguales pero hay que pasar alguno para el ancho
		let gameWidth = this.widthMenuJuego + this.widthJuego + menuBorderWidth + containerBorderWidth * 2;
		let gameHeight = this.heightJuego + containerBorderWidth * 2;

		let gameRatio = gameWidth / gameHeight;

		let windowWidth = parseInt(window.innerWidth) - 10;
		let windowHeight = parseInt(window.innerHeight) - 30;
		let windowRatio = windowWidth / windowHeight;

		if (!this.setFooterHidden(gameRatio, windowWidth, windowHeight)) {
			windowHeight -= this.FOOTER_HEIGHT;
		}

		if (gameRatio > windowRatio) {
			// limita el width
			this.escala = windowWidth / gameWidth;
		} else {
			this.escala = windowHeight / gameHeight;
		}

		document.getElementById('container').style.width = Math.floor(this.escala * gameWidth) + 'px';
		document.getElementById('container').style.height = Math.floor(this.escala * gameHeight) + 'px';

		document.querySelector('#chatbox input').style.fontSize =
			Math.max(14, Math.floor(12 * this.escala)) + 'px';

		if (this.gameUI) {
			this.gameUI.resize(this.escala);
		}
	}

	hideIntro() {
		const body = document.body;
		const overlay = document.getElementById('overlay');
		overlay.style.opacity = 1;

		setTimeout(() => {
			body.classList.remove('intro');
			body.classList.add('login-background');
			document.querySelector('footer').style.display = 'block';
			overlay.style.opacity = 0;
		}, 1200); // bajar el valor en dev (para no perder mucho tiempo), y subirlo en prod. Idealmente traer el valor de una variable en el .env
		this.setLoginScreen();
	}

	inicializarGameUI(gameManager, storage /*SACAME!*/) {
		this.gameUI = new GameUI(gameManager, storage, this.playSonidoClick);
		return this.gameUI;
	}

	showMensaje(mensaje) {
		this.mensaje.show(mensaje);
	}
}

export default UIManager;
