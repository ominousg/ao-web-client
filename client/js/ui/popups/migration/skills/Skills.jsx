import React, { useState } from 'react';
import Popup from '../Popup.jsx';
import Button from '../Button.jsx';
import { css } from '@emotion/react';
import { useUIStore, usePlayerStatsStore } from '../../../../stores';
import { PopupNames } from '../../popupNames.js';
import { Enums } from '../../../../enums.js';

const asignarSkillsPopup = css`
	display: flex;
	flex-direction: column;
	width: 260px;
	height: auto;
	align-items: center;
	justify-content: flex-start;

	h4 {
		padding-bottom: 10px;
	}

	hr {
		border-color: #97857730;
		margin-bottom: 5px;
	}
`;

const closeButtonContainer = css`
	button {
		margin: 0px 20px;
		padding: 5px 20px;
	}
`;

const skillRow = css`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	width: 100%;
	padding-bottom: 3px;

	// nombre del skill
	p:nth-of-type(1) {
		text-transform: uppercase;
		margin: 0 auto;
		color: #bbbdbf;
	}

	// puntos del skill
	p:nth-of-type(2) {
		font-weight: bolder;
		margin: initial;
		padding-right: 7px;
	}

	button {
		display: inline-block;
		width: 16px;
		height: 16px;
		margin: 2px;
		border: none;
		box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
		transition: box-shadow ease-in-out 0.3s;

		&:hover {
			transition: 0.3s;
			box-shadow:
				inset 0 1px 1px rgba(0, 0, 0, 0.075),
				0 0 4px rgba(151, 132, 113, 0.6);
		}

		&:active {
			transition: none;
		}
	}

	// boton de resta
	button:nth-of-type(1) {
		background: url(../imagenes/botonMenos.png);

		&:active {
			background-image: url('../imagenes/botonMenosApretado.png');
		}
	}

	// boton de suma
	button:nth-of-type(2) {
		background: url(../imagenes/botonMas.png);

		&:active {
			background-image: url('../imagenes/botonMasApretado.png');
		}
	}
`;

const SkillRow = ({ id, title, skillValue, addPoint, subtractPoint }) => {
	return (
		<div css={skillRow} key={id}>
			<p>{title}</p>
			<p>{skillValue}</p>
			<button onClick={subtractPoint}></button>
			<button onClick={addPoint}></button>
		</div>
	);
};

const Skills = () => {
	const { popups, closePopup } = useUIStore();
	const isOpen = popups[PopupNames.SKILLS] || false;
	const {
		playerStats: { skills }
	} = usePlayerStatsStore();

	const [skillPoints, setSkillPoints] = useState(
		Object.values(Enums.SkillNames).map((skill) => skills.find((s) => s.numSkill === skill.id)?.puntos || 0)
	);

	console.log('objeto skills viniendo de la store de zustand: ', skills);
	console.log('SkillNames: ', Enums.SkillNames);
	console.log('objeto skillPoints: ', skillPoints);

	const addPoint = (index) => {
		setSkillPoints((points) => points.map((point, i) => (i === index ? point + 1 : point)));
	};

	const subtractPoint = (index) => {
		setSkillPoints((points) => points.map((point, i) => (i === index && point > 0 ? point - 1 : point)));
	};

	return (
		<Popup title="Asignar skills" isOpen={isOpen} togglePopup={() => closePopup(PopupNames.SKILLS)}>
			<div css={asignarSkillsPopup}>
				<h4>Puntos libres: </h4>
				{Object.entries(Enums.SkillNames).map(([id, skill], index) => {
					const currentSkillPoints = skillPoints[index];
					return (
						<SkillRow
							key={id}
							id={id}
							title={skill.name}
							skillValue={currentSkillPoints}
							addPoint={() => addPoint(index)}
							subtractPoint={() => subtractPoint(index)}
						/>
					);
				})}

				<hr />

				<div css={closeButtonContainer}>
					<Button variant="primary" onClick={() => closePopup(PopupNames.SKILLS)}>
						Cancelar
					</Button>

					<Button variant="secondary" onClick={() => console.log('aceptar')}>
						Aceptar
					</Button>
				</div>
			</div>
		</Popup>
	);
};

export default Skills;
