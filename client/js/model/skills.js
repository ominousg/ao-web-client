/**
 * Created by horacio on 4/23/16.
 */

import { Enums } from '../enums';
import { usePlayerStatsStore } from '../stores';

const MAX_PUNTOS_SKILL = 100;

const initNombresSkills = (nombres) => {
	// TODO: sacar esto de aca
	nombres[Enums.Skill.magia] = 'Magia';
	nombres[Enums.Skill.robar] = 'Robar';
	nombres[Enums.Skill.tacticas] = 'Evasión en combate';
	nombres[Enums.Skill.armas] = 'Combate cuerpo a cuerpo';
	nombres[Enums.Skill.meditar] = 'Meditar';
	nombres[Enums.Skill.apunalar] = 'Apuñalar';
	nombres[Enums.Skill.ocultarse] = 'Ocultarse';
	nombres[Enums.Skill.supervivencia] = 'Supervivencia';
	nombres[Enums.Skill.talar] = 'Talar árboles';
	nombres[Enums.Skill.comerciar] = 'Comercio';
	nombres[Enums.Skill.defensa] = 'Defensa con escudos';
	nombres[Enums.Skill.pesca] = 'Pesca';
	nombres[Enums.Skill.mineria] = 'Minería';
	nombres[Enums.Skill.carpinteria] = 'Carpintería';
	nombres[Enums.Skill.herreria] = 'Herrería';
	nombres[Enums.Skill.liderazgo] = 'Liderazgo';
	nombres[Enums.Skill.domar] = 'Domar animales';
	nombres[Enums.Skill.proyectiles] = 'Combate a distancia';
	nombres[Enums.Skill.wrestling] = 'Combate sin armas';
	nombres[Enums.Skill.navegacion] = 'Navegación';
	nombres[Enums.Skill.fundirmetal] = '????';
};

const init = () => {
	const state = {
		_nombres: [],
		_skills: [],
		puntosLibres: 0
	};
	initNombresSkills(state._nombres);
	return state;
};

const setSkillsLibres = (state, cant) => {
	state.puntosLibres = cant;
};

const agregarSkillsLibres = (state, cant) => {
	state.puntosLibres += cant;
};

const setSkills = (state, skillsArray) => {
	// llegan cant puntos de skill i, porcentaje de skill i
	state._skills = [];
	for (let i = 0; i < skillsArray.length; i += 2) {
		const skill = {
			numSkill: i / 2 + 1,
			puntos: skillsArray[i],
			porcentaje: skillsArray[i + 1],
			nombre: getNombreSkill(state, i / 2 + 1)
		};
		state._skills[skill.numSkill] = skill;
	}

	usePlayerStatsStore.getState().setPlayerSkills(state._skills.filter((skill) => skill));
};

const asignarSkill = (state, numSkill) => {
	const skill = state._skills[numSkill];
	if (state.puntosLibres < 1 || skill.puntos >= MAX_PUNTOS_SKILL) {
		return false;
	}
	state.puntosLibres--;
	state._skills[numSkill].puntos++;
	return true;
};

const desAsignarSkill = (state, numSkill) => {
	const skill = state._skills[numSkill];
	if (skill.puntos < 0) {
		return false;
	}
	state.puntosLibres++;
	state._skills[numSkill].puntos--;
};

const getPuntosSkill = (state, numSkill) => state._skills[numSkill].puntos;

const forEachSkill = (state, callback) => {
	// callback(numSkill,puntos,porcentaje,nombre)
	state._skills.forEach(function (skill) {
		if (skill) {
			callback(skill.numSkill, skill.puntos, skill.porcentaje, skill.nombre);
		}
	});
};

const getNombreSkill = (state, numSkill) => state._nombres[numSkill];

export {
	init,
	setSkillsLibres,
	agregarSkillsLibres,
	setSkills,
	asignarSkill,
	desAsignarSkill,
	getPuntosSkill,
	forEachSkill,
	getNombreSkill
};
