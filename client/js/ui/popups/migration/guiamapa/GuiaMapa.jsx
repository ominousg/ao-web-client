import React, { useState } from 'react';
import Popup from '../Popup.jsx';
import { css } from '@emotion/react';
import { MapaGlobalSVG } from './mapas/MapaGlobal.jsx';
import { MapaDungeonsSVG } from './mapas/MapaDungeons.jsx';
import { useUIStore } from '../../../../stores';
import { PopupNames } from '../../popupNames.js';

const guiaMapaPopup = css`
	display: flex;
	width: 700px;
	height: 620px;
`;

const sidebarStyle = css`
	width: 70px;
	display: flex;
	flex-direction: column;
	margin: -10px 0px -10px -15px;

	border: 8px solid black;
	border-image: url(../imagenes/container_content_iner_border.png) 20 repeat;

	button {
		all: unset;
		height: 44px;
		width: 44px;
		cursor: pointer;

		img {
			height: 44px;
			width: 44px;
		}
	}
`;

const contentStyle = css`
	width: 100%;
	border: 8px solid black;
	border-image: url(../imagenes/container_content_iner_border.png) 20 repeat;

	margin: -9px -20px -10px 5px;
	display: flex;
	flex-direction: column;

	h2 {
		padding-left: 8px;
	}
`;

const GuiaMapa = () => {
	const { popups, closePopup } = useUIStore();
	const isOpen = popups[PopupNames.GUIA_MAPA] || false;
	const [activeTab, setActiveTab] = useState('mapaGlobal');

	const getMapIconSrc = () => {
		return activeTab === 'mapaGlobal'
			? '../imagenes/interfaz/iconos/map_active.png'
			: '../imagenes/interfaz/iconos/map.png';
	};

	const getCaveIconSrc = () => {
		return activeTab === 'mapaDungeons'
			? '../imagenes/interfaz/iconos/cave_active.png'
			: '../imagenes/interfaz/iconos/cave.png';
	};

	return (
		<Popup
			title="Mapa"
			isOpen={isOpen}
			togglePopup={() => closePopup(PopupNames.GUIA_MAPA)}
			hideBorder={true}
			maxWidth="700px"
		>
			<div css={guiaMapaPopup}>
				<div css={sidebarStyle}>
					<button onClick={() => setActiveTab('mapaGlobal')}>
						<img src={getMapIconSrc()} alt="icono de mapa" />
					</button>
					<button onClick={() => setActiveTab('mapaDungeons')}>
						<img src={getCaveIconSrc()} alt="icono de dungeon" />
					</button>
				</div>
				<div css={contentStyle}>
					{activeTab === 'mapaGlobal' && <MapaGlobalSVG />}
					{activeTab === 'mapaDungeons' && <MapaDungeonsSVG />}
				</div>
			</div>
		</Popup>
	);
};

export default GuiaMapa;
