import React from 'react';
import Popup from '../Popup.jsx';
import { css } from '@emotion/react';
import Button from '../Button.jsx';
import { useUIStore } from '../../../../stores';
import { PopupNames } from '../../popupNames.js';
import Input from '../Input.jsx';

const tirarPopup = css`
	width: 210px;
	height: auto;

	button {
		width: 75px;
		text-align: center;
	}
`;

const closeButtonContainer = css`
	display: flex;
	justify-content: space-between;
`;

const Tirar = () => {
	const { popups, closePopup } = useUIStore();
	const isOpen = popups[PopupNames.TIRAR] || false;

	const handleIndividualDrop = () => {
		closePopup(PopupNames.TIRAR);
	};

	const handleMultipleDrop = () => {
		closePopup(PopupNames.TIRAR);
	};

	return (
		<Popup title="Tirar" isOpen={isOpen} togglePopup={() => closePopup(PopupNames.TIRAR)}>
			<div css={tirarPopup}>
				<Input type="number" value={1} onChange={(e) => {}} />
				<div css={closeButtonContainer}>
					<Button variant="primary" onClick={handleIndividualDrop}>
						Tirar
					</Button>
					<Button variant="secondary" onClick={handleMultipleDrop}>
						Tirar todo
					</Button>
				</div>
			</div>
		</Popup>
	);
};

export default Tirar;
