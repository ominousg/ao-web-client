import React, { useState } from 'react';
import Popup from '../Popup.jsx';
import { css } from '@emotion/react';
import OptionsTab from './OptionsTab.jsx';
import SoundTab from './SoundTab.jsx';
import KeybindingsTab from './KeybindingsTab.jsx';

const estadisticasPopup = css`
	width: 450px;
	height: 500px;
	display: flex;
`;

const sidebarStyles = css`
	width: 70px;
	display: flex;
	flex-direction: column;
	margin: -10px 0px -10px -22px;
	align-items: center;

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
	padding: 8px;

	margin: -9px -20px -10px 5px;
	display: flex;
	flex-direction: column;

	button {
		// margin-top: auto;
		margin-top: 10px;
	}

	// primer select
	& > div:nth-of-type(2) {
		margin-top: -5px;
	}
`;

const Ajustes = () => {
	const [isOpen, setIsOpen] = useState(true);
	const [activeTab, setActiveTab] = useState('options');

	const togglePopup = () => {
		setIsOpen(!isOpen);
	};

	const tabs = [
		{ id: 'options', icon: 'wrench', label: 'tab opciones de renderizado' },
		{ id: 'sound', icon: 'speaker', label: 'tab opciones de sonido' },
		{ id: 'keybindings', icon: 'keyboard', label: 'tab configuracion de teclas' }
	];

	return (
		<Popup title="Ajustes" isOpen={isOpen} togglePopup={togglePopup} hideBorder={true}>
			<div css={estadisticasPopup}>
				<div css={sidebarStyles}>
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							style={{ cursor: 'pointer' }}
							disabled={tab.disabled}
						>
							<img
								src={
									activeTab === tab.id
										? `../imagenes/interfaz/iconos/${tab.icon}_active.png`
										: `../imagenes/interfaz/iconos/${tab.icon}.png`
								}
								alt={tab.label}
							/>
						</button>
					))}
				</div>
				<div css={contentStyle}>
					{activeTab === 'options' && <OptionsTab />}
					{activeTab === 'sound' && <SoundTab />}
					{activeTab === 'keybindings' && <KeybindingsTab />}
				</div>
			</div>
		</Popup>
	);
};

export default Ajustes;
