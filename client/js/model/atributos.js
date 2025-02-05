/**
 * Created by horacio on 4/9/16.
 */

const init = (game) => ({
	game,
	hp: -1,
	maxHp: -1,
	mana: -1,
	maxMana: -1,
	stamina: -1,
	maxStamina: -1,
	oro: -1,
	nivel: -1,
	maxExp: -1,
	exp: -1,
	maxAgua: -1,
	agua: -1,
	hambre: -1,
	maxHambre: -1
});

const setVida = (atributos, min, max) => {
	if (!max) {
		max = atributos.maxHp;
	}
	if (atributos.hp !== min || atributos.maxHp !== max) {
		atributos.hp = min;
		atributos.maxHp = max;
		atributos.game.gameUI.interfaz.updateBarraVida(min, max);
	}
};

const setMana = (atributos, MinMan, MaxMan) => {
	if (!MaxMan && MaxMan !== 0) {
		MaxMan = atributos.maxMana;
	}

	if (atributos.mana !== MinMan || atributos.maxMana !== MaxMan) {
		atributos.mana = MinMan;
		atributos.maxMana = MaxMan;
		atributos.game.gameUI.interfaz.updateBarraMana(MinMan, MaxMan);
	}
};

const setStamina = (atributos, MinSta, MaxSta) => {
	if (!MaxSta) {
		MaxSta = atributos.maxStamina;
	}
	if (atributos.stamina !== MinSta || atributos.maxStamina !== MaxSta) {
		atributos.stamina = MinSta;
		atributos.maxStamina = MaxSta;
		atributos.game.gameUI.interfaz.updateBarraEnergia(MinSta, MaxSta);
	}
};

const setAgua = (atributos, MinAgu, MaxAgu) => {
	if (!MaxAgu) {
		MaxAgu = atributos.maxAgua;
	}
	if (atributos.agua !== MinAgu || atributos.maxAgua !== MaxAgu) {
		atributos.maxAgua = MaxAgu;
		atributos.agua = MinAgu;
		atributos.game.gameUI.interfaz.updateBarraSed(MinAgu, MaxAgu);
	}
};

const setHambre = (atributos, MinHam, MaxHam) => {
	if (!MaxHam) {
		MaxHam = atributos.maxHambre;
	}
	if (atributos.hambre !== MinHam || atributos.maxHambre !== MaxHam) {
		atributos.hambre = MinHam;
		atributos.maxHambre = MaxHam;
		atributos.game.gameUI.interfaz.updateBarraHambre(MinHam, MaxHam);
	}
};

const setExp = (atributos, minExp, maxExp) => {
	if (!maxExp) {
		maxExp = atributos.maxExp;
	}
	if (atributos.exp !== minExp || atributos.maxExp !== maxExp) {
		atributos.exp = minExp;
		atributos.maxExp = maxExp;
		atributos.game.gameUI.interfaz.updateBarraExp(minExp, maxExp);
	}
};

const setNivel = (atributos, nivel) => {
	if (nivel !== atributos.nivel) {
		atributos.nivel = nivel;
		atributos.game.gameUI.interfaz.updateNivel(nivel);
	}
};

const setOro = (atributos, oro) => {
	if (atributos.oro !== oro) {
		atributos.oro = oro;
		atributos.game.gameUI.interfaz.updateOro(oro);
	}
};

export { init, setVida, setMana, setStamina, setAgua, setHambre, setExp, setNivel, setOro };
