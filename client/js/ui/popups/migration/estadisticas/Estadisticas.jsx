import React from 'react';
import MyPopup from '../Popup.jsx';
import { css } from '@emotion/react';
import { Enums } from '../../../../enums.js';
import Button from '../Button.jsx';
import { useUIStore, usePlayerStatsStore } from '../../../../stores';
import { PopupNames } from '../../popupNames.js';

const estadisticasPopup = css`
	width: 450px;

	button {
		margin-top: 15px;
	}

	hr {
		border-color: #97857730;
		margin-bottom: 5px;
	}
`;

const scrollFlex = css`
	overflow-y: auto;
	height: 230px;
`;

const statsBox = css`
	border: 1px solid #ffffff50;
	border-radius: 2px;
	margin: 0px 5px 10px 0px;

	p {
		all: unset;
		color: #978577;
	}

	div:nth-of-type(1) {
		background-color: #4b3d34;
		padding: 10px 10px 10px 15px;

		h2 {
			all: unset;
			font-size: 16px;
		}
	}

	div:nth-of-type(2) {
		background-color: #382e27;
		padding: 10px 10px 10px 15px;
		display: flex;
		flex-direction: column;
	}

	&:last-of-type {
		margin-bottom: 0px;
	}

	tr {
		td:nth-of-type(1) {
			color: #bbbdbf;
			max-width: 0px;
		}

		td:nth-of-type(2) {
			color: #978577;
			max-width: 0px;
		}
	}
`;

const closeButtonContainer = css`
	text-align: right;
`;

const Estadisticas = () => {
	const { popups, closePopup } = useUIStore();
	const isOpen = popups[PopupNames.ESTADISTICAS] || false;
	const {
		playerStats: { attributes, fameInfo, miniStats, skills }
	} = usePlayerStatsStore();
	const status = fameInfo.Promedio < 0 ? 'Criminal' : 'Ciudadano';

	return (
		<MyPopup title="Estadísticas" isOpen={isOpen} togglePopup={() => closePopup(PopupNames.ESTADISTICAS)}>
			<div css={estadisticasPopup}>
				<div css={scrollFlex}>
					<div css={statsBox}>
						<div>
							<h2>Atributos</h2>
						</div>
						<div>
							<p>Fuerza: {attributes.fuerza}</p>
							<p>Agilidad: {attributes.agilidad}</p>
							<p>Inteligencia: {attributes.inteligencia}</p>
							<p>Carisma: {attributes.carisma}</p>
							<p>Constitución: {attributes.constitucion}</p>
						</div>
					</div>

					<div css={statsBox}>
						<div>
							<h2>Reputación</h2>
						</div>
						<div>
							<p>Asesino: {fameInfo.asesino}</p>
							<p>Burgues: {fameInfo.burgues}</p>
							<p>Bandido: {fameInfo.bandido}</p>
							<p>Ladron: {fameInfo.ladron}</p>
							<p>Noble: {fameInfo.noble}</p>
							<p>Plebe: {fameInfo.plebe}</p>
							<p>Status: {status}</p>
						</div>
					</div>

					<div css={statsBox}>
						<div>
							<h2>Estadísticas</h2>
						</div>
						<div>
							<p>Criminales matados: {miniStats.criminalesMatados}</p>
							<p>Ciudadanos matados: {miniStats.ciudadanosMatados}</p>
							<p>Criaturas matadas: {miniStats.npcsMuertos}</p>
							<p>Clase: {Enums.NombreClase[miniStats.clase]}</p>
							<p>Tiempo restante en carcel: {miniStats.pena}</p>
						</div>
					</div>

					<div css={statsBox}>
						<div>
							<h2>Skills</h2>
						</div>
						<div>
							<table>
								<tbody>
									{skills &&
										skills.map(
											(skill, index) =>
												skill && (
													<tr key={index}>
														<td>{skill.nombre}</td>
														<td>{skill.puntos}</td>
													</tr>
												)
										)}
								</tbody>
							</table>
						</div>
					</div>
				</div>

				<hr />
				<div css={closeButtonContainer}>
					<Button
						variant="primary"
						style={{ textAlign: 'right' }}
						onClick={() => closePopup(PopupNames.ESTADISTICAS)}
					>
						Cerrar
					</Button>
				</div>
			</div>
		</MyPopup>
	);
};

export default Estadisticas;
