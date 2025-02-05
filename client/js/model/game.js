import * as Mapa from './mapa';
import Updater from '../updater';
import Item from './item';
import Character from './character';
import * as Atributos from './atributos';
import Inventario from './inventario';
import PlayerState from './playerstate';
import PlayerMovement from './playermovement';
import { Enums } from '../enums';
import * as World from './world';
import * as WorldState from '../model/worldstate';
import * as GameText from './gametext';
import { Ticker } from 'pixi.js';
import * as Camera from '../view/camera';
import * as CharacterSprites from '../view/charactersprites';
import * as Renderer from '../view/renderer';
import * as Skills from './skills';

class Game {
	constructor(assetManager) {
		this.POSICIONES_EXTRA_SONIDO = { norte: 0, sur: 0, este: 3, oeste: 3 };
		this.init(assetManager);
		this._fps = 0;
		this._fpsCounter = 0;
		this._fpsTime = 0;
		this._lastTick = performance.now();
	}

	init(assetManager) {
		// temporal
		this.playerMovement = new PlayerMovement(this);
		this.initPlayerMovementCallbacks();
		this.playerState = new PlayerState();
		this.atributos = Atributos.init(this);
		this.map = Mapa.init();
		this.assetManager = assetManager;

		this.ready = false;
		this.started = false;
		this.isPaused = false;

		this.updater = null;

		this.username = null;
		// Player
		this.player = null;
		this.logeado = false; // NOTA: se pone logeado cuando llega el mensaje de logged, este es el ultimo de los mensajes al conectarse, asi que antes llega los mensajes de hechizos inventarios, etc. Deberia primero llegar esto y listo.. tambien deberia llegar el chardinex de tu pj al principio con este mensaje
		this.inventario = new Inventario();
		this.inventarioShop = new Inventario();
		this.bankShop = new Inventario();
		this.skills = Skills.init();
		this.hechizos = [];

		this.mouse = { x: 0, y: 0 };

		this.seguroResucitacionActivado = null;
		this.seguroAtacarActivado = null;

		this.ignorarProximoSonidoPaso = false;
	}

	setup(client, gameUI, renderer, audio) {
		this.client = client;
		this.gameUI = gameUI;
		this.renderer = renderer;
		this.world = World.init(renderer);
		this.worldState = WorldState.init(renderer, audio);
		this.gameText = GameText.init(this.renderer);
	}

	setUpdater(updater) {
		this.updater = updater;
	}

	recibirDanioCriatura(parteCuerpo, danio) {
		GameText.playerHitByMob(this.gameText, this.player, parteCuerpo, danio);
	}

	recibirDanioUser(parteCuerpo, danio, attackerIndex) {
		let attackerName = World.getCharacter(this.world, attackerIndex).nombre;
		GameText.playerHitByUser(this.gameText, this.player, parteCuerpo, danio, attackerName);
	}

	realizarDanioCriatura(danio) {
		let char = this.playerState.lastAttackedTarget;
		GameText.playerHitMob(this.gameText, char, danio);
	}

	realizarDanioPlayer(danio, parteCuerpo, victimIndex) {
		let victim = World.getCharacter(this.world, victimIndex);
		GameText.playerHitUser(this.gameText, victim, parteCuerpo, danio);
	}

	escribirMsgConsola(texto, font) {
		GameText.consoleMsg(this.gameText, texto, font);
	}

	escribirChat(chat, charIndex, r, g, b) {
		let c = World.getCharacter(this.world, charIndex);
		GameText.chat(this.gameText, c, chat, r, g, b);
	}

	sacarChatCharacterByID(charID) {
		let char = World.getCharacter(this.world, charID);
		if (char) {
			GameText.removeCharacterChat(this.gameText, char);
		}
	}

	sacarAllCharacterChats() {
		World.forEachCharacter(this.world, (char) => {
			GameText.removeCharacterChat(this.gameText, char);
		});
	}

	actualizarBajoTecho() {
		Mapa.onceLoaded(this.map, (mapa) => {
			WorldState.setBajoTecho(this.worldState, Mapa.isBajoTecho(mapa, this.player.gridX, this.player.gridY));
		});
	}

	_removeAllEntities() {
		var self = this;
		World.forEachEntity(this.world, function (entity) {
			if (entity.id !== self.player.id) {
				self.sacarEntity(entity);
			}
		});
	}

	sacarEntity(entity) {
		if (entity instanceof Character) {
			if (entity === this.player) {
				return;
			}
			World.sacarCharacter(this.world, entity);
		} else if (entity instanceof Item) {
			World.sacarItem(this.world, entity);
		} else {
			console.log('Error: Tipo de entity desconocido!');
		}
	}

	moverCharacter(CharIndex, gridX, gridY) {
		if (CharIndex === this.player.id) {
			if (X !== this.player.gridX || Y !== this.player.gridY) {
				this.resetPosCharacter(CharIndex, X, Y);
			}
		} else {
			var c = World.getCharacter(this.world, CharIndex);
			if (!c) {
				// console.log("mover character inexistente: " + CharIndex);
				return;
			}
			var dir = c.esPosAdyacente(gridX, gridY);
			if (dir && Renderer.entityVisiblePorCamara(this.renderer, c)) {
				c.mover(dir);
			} else {
				// posicion no adyacente o fuera de camara, entonces resetear la posicion directamente (no hacerlo caminar)
				this.resetPosCharacter(CharIndex, gridX, gridY);
			}
			if (dir && Renderer.entityVisiblePorCamara(this.renderer, c, this.POSICIONES_EXTRA_SONIDO)) {
				this.playSonidoPaso(c);
			}

			// si esta el jugador en la pos destino, lo  vuelvo una atras
			// esto pasa cuando uno trata de caminar y llega un msj
			// del server para mover el char a donde ibas a caminar
			if (this.player.gridX === gridX && this.player.gridY === gridY && this.playerMovement.prevGridPosX) {
				let prevX = this.playerMovement.prevGridPosX;
				let prevY = this.playerMovement.prevGridPosY;
				this.resetPosCharacter(this.player.id, prevX, prevY);
			}
		}
	}

	playSonidoPaso(char) {
		if (char.muerto) {
			return;
		}
		if (this.playerState.navegando) {
			//todo: que sea dependiendo si el char navega, no el player
			this.assetManager.audio.playSound(Enums.SONIDOS.pasoNavegando);
		} else {
			char.pasoDerecho = !char.pasoDerecho;
			if (char.pasoDerecho) {
				this.assetManager.audio.playSound(Enums.SONIDOS.paso1);
			} else {
				this.assetManager.audio.playSound(Enums.SONIDOS.paso2);
			}
		}
	}

	cambiarCharacter(CharIndex, Body, Head, Heading, Weapon, Shield, Helmet, FX, FXLoops) {
		var c = World.getCharacter(this.world, CharIndex);

		if (!c) {
			console.log('cambiar character inexistente');
			return;
		}
		if (c !== this.player || (c === this.player && !c.estaMoviendose())) {
			c.heading = Heading;
		}
		c.body = Body;
		c.head = Head;
		c.weapon = Weapon;
		c.shield = Shield;
		c.helmet = Helmet;
		c.fx = FX;
		c.fxLoops = FXLoops;
	}

	agregarCharacter(
		CharIndex,
		Body,
		Head,
		Heading,
		X,
		Y,
		Weapon,
		Shield,
		Helmet,
		FX,
		FXLoops,
		Name,
		NickColor,
		Privileges
	) {
		let nombre, clan;
		if (Name.indexOf('<') > 0) {
			nombre = Name.slice(Name, Name.indexOf('<') - 1);
			clan = Name.slice(Name.indexOf('<'), Name.length);
		} else {
			nombre = Name;
			clan = null;
		}

		if (World.getCharacter(this.world, CharIndex)) {
			if (CharIndex === this.player.id) {
				//"cambio de mapa", TODO: ver bien esto
				// setear cosas que pueden cambiar al cambiar mapa (color nombre, sacar chat,pos)
				this.player.setName(nombre, clan, NickColor);
				GameText.removeCharacterChat(this.gameText, this.player);
				this.resetPosCharacter(this.player.id, X, Y, true);
				return;
			}
			return;
		}

		var c = new Character(
			CharIndex,
			X,
			Y,
			Heading,
			nombre,
			clan,
			Body,
			Head,
			Weapon,
			Shield,
			Helmet,
			FX,
			FXLoops,
			NickColor
		);
		World.addCharacter(this.world, c);
		this.setCharacterFX(CharIndex, FX, FXLoops);

		if (!this.player && this.username.toUpperCase() === nombre.toUpperCase()) {
			// mal esto, se deberia hacer comparando el charindex pero no se puede porque el server manda el char index del pj despues de crear los chars
			this.player = c;
			this.actualizarIndicadorPosMapa();
		}
	}

	agregarItem(grhIndex, gridX, gridY) {
		let viejoItem = World.getItemInGridPos(this.world, gridX, gridY);
		if (viejoItem) {
			this.sacarEntity(viejoItem);
		}
		var item = new Item(gridX, gridY);
		World.addItem(this.world, item, grhIndex);
	}

	sacarItem(gridX, gridY) {
		let item = World.getItemInGridPos(this.world, gridX, gridY);
		if (item) {
			this.sacarEntity(item);
		}
	}

	changePlayerIndex(CharIndex) {
		if (this.player.id !== CharIndex) {
			var prevPlayerCharacter = this.player;
			this.player = World.getCharacter(this.world, CharIndex);
			this.sacarEntity(prevPlayerCharacter);
		}
		this.inicializarPlayerEnMapa();
	}

	inicializarPlayerEnMapa() {
		var X = this.player.gridX;
		var Y = this.player.gridY;
		// --- esto para que se setee al player una pos "anterior" a la del cambio de mapa para que de la ilusion que avanza un tile (sino se deberia quedar quieto esperando el intervalo o traeria problemas en mapas donde entras mirando la salida (ademas de que pasarias siempre en la 2da pos)) ---
		let f = () => {
			if (this.playerMovement.estaCaminando()) {
				var dir;
				switch (this.playerMovement.getDirMov()) {
					case Enums.Heading.sur:
						Y = Y - 1;
						dir = Enums.Heading.sur;
						break;
					case Enums.Heading.norte:
						Y = Y + 1;
						dir = Enums.Heading.norte;
						break;
					case Enums.Heading.este:
						X = X - 1;
						dir = Enums.Heading.este;
						break;
					case Enums.Heading.oeste:
						X = X + 1;
						dir = Enums.Heading.oeste;
						break;
					default:
						break;
				}
				this.playerMovement.forceCaminar(dir);
				this.ignorarProximoSonidoPaso = true; // que no haga sonido este paso forzado
			}

			this.resetPosCharacter(this.player.id, X, Y, true);
			Renderer.drawMapaIni(
				this.renderer,
				this.player.gridX,
				this.player.gridY,
				World.getEntities(this.world)
			);
		};
		Mapa.onceLoaded(this.map, (mapa) => {
			f();
		});
	}

	toggleSeguroResucitar() {
		this.seguroResucitacionActivado = !this.seguroResucitacionActivado;
		this.gameUI.interfaz.setSeguroResucitacion(this.seguroResucitacionActivado);
		this.client.sendResuscitationSafeToggle();
	}

	toggleSeguroAtacar() {
		this.seguroAtacarActivado = !this.seguroAtacarActivado;
		this.gameUI.interfaz.setSeguroAtacar(this.seguroAtacarActivado);
		this.client.sendSafeToggle();
	}

	cambiarSlotInventario(
		numSlot,
		ObjIndex,
		ObjName,
		Amount,
		Equiped,
		GrhIndex,
		ObjType,
		MaxHit,
		MinHit,
		MaxDef,
		MinDef,
		ObjSalePrice
	) {
		this.inventario.cambiarSlot(
			numSlot,
			ObjName,
			Amount,
			ObjSalePrice,
			GrhIndex,
			ObjIndex,
			ObjType,
			MaxHit,
			MinHit,
			MaxDef,
			MinDef,
			Equiped
		);
		this.gameUI.updateSlotUser(numSlot, this.inventario.getSlot(numSlot));
	}

	cambiarSlotHechizos(slot, spellID, nombre) {
		this.hechizos[slot] = { id: spellID, nombre: nombre };
		this.gameUI.interfaz.modificarSlotHechizo(slot, nombre);
		/*if (this.logeado)
                 this.uiRenderer.modificarSlotHechizos(slot, nombre);*/
	}

	swapSlotHechizos(slot1, slot2) {
		let auxSpellID = this.hechizos[slot1].id;
		let auxNombre = this.hechizos[slot1].nombre;
		this.cambiarSlotHechizos(slot1, this.hechizos[slot2].id, this.hechizos[slot2].nombre);
		this.cambiarSlotHechizos(slot2, auxSpellID, auxNombre);
	}

	resetPosCharacter(charIndex, gridX, gridY, noReDraw) {
		let c = World.getCharacter(this.world, charIndex);
		if (!c) {
			return;
		}

		c.resetMovement();
		c.setGridPosition(gridX, gridY);

		if (c === this.player) {
			if (!noReDraw) {
				Renderer.resetPos(this.renderer, gridX, gridY, World.getEntities(this.world));
			}
			this.actualizarBajoTecho();
			this.actualizarIndicadorPosMapa();
		}
	}

	cambiarMapa(numeroMapa) {
		if (!this.map.isLoaded) {
			Mapa.removeCallbacks(this.map);
		}
		this.map = Mapa.init(numeroMapa);
		Renderer.cambiarMapa(this.renderer, this.map);

		this.assetManager.getMapaASync(numeroMapa, (mapData) => {
			if (this.map.numero === numeroMapa) {
				Mapa.setData(this.map, mapData);
			}
		});

		this.playerMovement.disable();
		Mapa.onceLoaded(this.map, (mapa) => {
			this.playerMovement.enable();
			WorldState.setOutdoor(this.worldState, Mapa.mapaOutdoor(mapa));
		});
		this._removeAllEntities();
	}

	actualizarIndicadorPosMapa() {
		Renderer.actualizarIndicadorMapa(this.renderer, this.map.numero, this.player.gridX, this.player.gridY);
	}

	actualizarIndicadorFPS() {
		Renderer.actualizarIndicadorFPS(this.renderer, this._fps);
	}

	cambiarArea(gridX, gridY) {
		var MinLimiteX = Math.floor(gridX / 9 - 1) * 9;
		var MaxLimiteX = MinLimiteX + 26;

		var MinLimiteY = Math.floor(gridY / 9 - 1) * 9;
		var MaxLimiteY = MinLimiteY + 26;

		var self = this;
		World.forEachEntity(this.world, function (entity, index) {
			if (
				entity.gridY < MinLimiteY ||
				entity.gridY > MaxLimiteY ||
				entity.gridX < MinLimiteX ||
				entity.gridX > MaxLimiteX
			) {
				if (entity !== self.player) {
					self.sacarEntity(entity);
				}
			}
		});
	}

	forceCaminar(direccion) {
		this.playerMovement.forceCaminar(direccion);
	}

	initPlayerMovementCallbacks() {
		this.playerMovement.setOnCaminar(
			function (direccion, forced) {
				if (!forced) {
					this.client.sendWalk(direccion);
				}
				this.actualizarBajoTecho();
				if (this.ignorarProximoSonidoPaso) {
					this.ignorarProximoSonidoPaso = false;
				} else {
					this.playSonidoPaso(this.player);
				}

				Renderer.updateBeforeMovementBegins(this.renderer, direccion, World.getEntities(this.world));
			}.bind(this)
		);

		this.playerMovement.setOnCambioHeading(
			function (direccion) {
				this.client.sendChangeHeading(direccion);
			}.bind(this)
		);

		this.playerMovement.setOnPuedeCaminar(
			function (direccion) {
				if (this.playerState.paralizado) {
					return false;
				}
				if (this.playerState.meditando) {
					// envia solo 1 vez el mensaje de caminar para que deje de meditar, feo esto
					if (!this._waltkToCancelMeditarSent) {
						this.client.sendWalk(direccion);
					}
					this._waltkToCancelMeditarSent = true;
					return false;
				} else {
					this._waltkToCancelMeditarSent = false;
				}

				var x = this.player.gridX;
				var y = this.player.gridY;
				switch (direccion) {
					case Enums.Heading.oeste:
						x--;
						break;
					case Enums.Heading.este:
						x++;
						break;
					case Enums.Heading.norte:
						y--;
						break;
					case Enums.Heading.sur:
						y++;
						break;
					default:
						throw new Error('Direccion invalida!');
				}

				if (Mapa.isBlocked(this.map, x, y)) {
					return false;
				}

				if (Mapa.hayAgua(this.map, x, y) !== this.playerState.navegando) {
					return false;
				}

				let charInPos = World.getCharacterInGridPos(this.world, x, y);
				if (charInPos) {
					if (!charInPos.muerto) {
						return false;
					} else {
						// tienen que estar o ambos en agua o ambos en tierra (player y casper)
						if (
							Mapa.hayAgua(this.map, x, y) !== Mapa.hayAgua(this.map, this.player.gridX, this.player.gridY)
						) {
							return false;
						}
					}
				}
				return true;
			}.bind(this)
		);

		this.playerMovement.setOnMoverseUpdate(
			function (x, y) {
				const centerX = Camera.getCenterPosX(this.renderer.camera);
				const centerY = Camera.getCenterPosY(this.renderer.camera);
				Renderer.moverPosition(this.renderer, x - centerX, y - centerY);
			}.bind(this)
		);

		this.playerMovement.setOnFinMovimiento(
			// se ejecuta una vez que llega a cada tile
			function () {
				this.actualizarIndicadorPosMapa();
			}.bind(this)
		);
	}

	setTrabajoPendiente(skill) {
		this.gameUI.interfaz.setMouseCrosshair(true);
		this.trabajoPendiente = skill;
	}

	realizarTrabajoPendiente() {
		var gridPos = this.getMouseGridPosition();
		this.gameUI.interfaz.setMouseCrosshair(false);
		this.client.sendWorkLeftClick(gridPos.x, gridPos.y, this.trabajoPendiente);
		this.trabajoPendiente = null;
	}

	cambiarSlotCompra(
		numSlot,
		ObjName,
		Amount,
		Price,
		GrhIndex,
		ObjIndex,
		ObjType,
		MaxHit,
		MinHit,
		MaxDef,
		MinDef
	) {
		this.inventarioShop.cambiarSlot(
			numSlot,
			ObjName,
			Amount,
			Price,
			GrhIndex,
			ObjIndex,
			ObjType,
			MaxHit,
			MinHit,
			MaxDef,
			MinDef
		);
		this.gameUI.updateSlotShop(numSlot, this.inventarioShop.getSlot(numSlot));
	}

	cambiarSlotRetirar(
		numSlot,
		ObjIndex,
		ObjName,
		Amount,
		GrhIndex,
		ObjType,
		MaxHit,
		MinHit,
		MaxDef,
		MinDef,
		ObjSalePrice
	) {
		this.bankShop.cambiarSlot(
			numSlot,
			ObjName,
			Amount,
			ObjSalePrice,
			GrhIndex,
			ObjIndex,
			ObjType,
			MaxHit,
			MinHit,
			MaxDef,
			MinDef
		);
		this.gameUI.updateSlotBank(numSlot, this.bankShop.getSlot(numSlot));
	}

	togglePausa() {
		this.isPaused = !this.isPaused;
	}

	setCharacterFX(CharIndex, FX, FXLoops) {
		let c = World.getCharacter(this.world, CharIndex);
		if (!c) {
			return;
		}
		if (FX === 0) {
			if (c.sprite) {
				CharacterSprites.removerFxsInfinitos(c.sprite);
			}
			return;
		}
		FXLoops = FXLoops + 1;
		Renderer.setCharacterFX(this.renderer, c, FX, FXLoops);
	}

	inicializar(username) {
		this.username = username;
		this.setUpdater(new Updater(this));
		this.ready = true;
	}

	initGameTick() {
		Ticker.shared.remove(this._gameTick, this);
		Ticker.shared.add(this._gameTick, this);
	}

	_gameTick() {
		if (this.started && !this.isStopped) {
			Renderer.renderFrame(this.renderer);

			// calculating FPS
			this._fpsCounter++;
			const currentTime = performance.now();
			const deltaMS = currentTime - this._lastTick;
			this._fpsTime += deltaMS / 1000;
			this._lastTick = currentTime;
			if (this._fpsTime >= 3) {
				this._fps = Math.round(this._fpsCounter / this._fpsTime);
				this._fpsCounter = 0;
				this._fpsTime = 0;
				// console.log("FPS: " + this._fps);
				this.actualizarIndicadorFPS(this._fps);
			}

			if (!this.isPaused) {
				this.updater.update(deltaMS);
			}
		}
	}

	start() {
		if (this.started) {
			return;
		}

		this.logeado = true;
		this.started = true;
		this.initGameTick();
		console.log('Game loop started.');
	}

	stop() {
		console.log('Game stopped.');
		this.isStopped = true;
	}

	getMouseGridPosition() {
		var ts = this.renderer.tilesize,
			c = this.renderer.camera,
			mx = this.mouse.x / this.renderer.escala,
			my = this.mouse.y / this.renderer.escala,
			offsetX = mx % ts,
			offsetY = my % ts;

		var x = (mx - offsetX) / ts + c.gridX;
		var y = (my - offsetY) / ts + c.gridY;

		/*  Medio feo pero me parece que no hay otra, explicacion:
                 Cuando se mueve un pj, ni bien comienza la animacion ya esta en el tile siguiente. El problema con esto es que cuando estas caminando,
                 esto significa que si clickeas el centro de la pantalla, no estas clickeando el tile de tu pj porque ya esta en el siguiente.
                 Entonces: si haces click en el centro y te estas moviendo lo rederijo al tile del pj.
                 (en el eje y no hay problema porque acepta 2 posiciones distintas)
                 */
		if (this.playerMovement.estaCaminando() && offsetX) {
			if (this.player.heading === Enums.Heading.oeste) {
				x = x + 1; // fix de pos de c.gridX
				if (x === this.player.gridX + 1) {
					x--;
				}
			}
			if (this.player.heading === Enums.Heading.este) {
				if (x === this.player.gridX - 1) {
					x++;
				}
			}
		}
		return { x: x, y: y };
	}

	resize(escala) {
		Renderer.rescale(this.renderer, escala);
	}
}

export default Game;
