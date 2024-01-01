import React from 'react';
import Popup from '../Popup.jsx';
import { css } from '@emotion/react';
import { useUIStore, useConsoleMessagesStore } from '../../../../stores';
import { PopupNames } from '../../popupNames.js';

const convertPixiStyleToCSS = (pixiStyle) => {
	const cssStyle = {
		color: pixiStyle._fill,
		fontFamily: pixiStyle._fontFamily,
		fontWeight: pixiStyle.bold ? '500' : 'normal',
		fontStyle: pixiStyle.italic,
		letterSpacing: `${pixiStyle._letterSpacing}px`,
		lineHeight: pixiStyle._lineHeight ? `${pixiStyle._lineHeight}px` : 'normal'
	};

	return cssStyle;
};

const consolaCompletaPopup = css`
	width: 900px;
	max-width: 900px;
	height: 250px;
	overflow-y: auto;

	.MuiDialog-paper {
		max-width: 100%;
	}

	button {
		margin-top: 15px;
	}

	hr {
		border-color: #97857730;
		margin-bottom: 5px;
	}

	p {
		font-size: 15px;
	}
`;

const ConsolaCompleta = () => {
	const { popups, closePopup } = useUIStore();
	const isOpen = popups[PopupNames.CONSOLA_COMPLETA] || false;
	const { consoleMessages } = useConsoleMessagesStore();

	return (
		<Popup
			title="Consola completa"
			isOpen={isOpen}
			togglePopup={() => closePopup(PopupNames.CONSOLA_COMPLETA)}
			sx={{
				'& .MuiDialog-paper': { overflowY: 'initial', maxWidth: '945px' }
			}}
		>
			<div css={consolaCompletaPopup}>
				{consoleMessages.length === 0 ? (
					<h5 style={{ padding: '0px 10px' }}>Consola vacía.</h5>
				) : (
					consoleMessages.map((message, idx) => (
						<p style={{ ...convertPixiStyleToCSS(message.style) }} key={idx}>
							{message.text}
						</p>
					))
				)}
			</div>
		</Popup>
	);
};

export default ConsolaCompleta;
