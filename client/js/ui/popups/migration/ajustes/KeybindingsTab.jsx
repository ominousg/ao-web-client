import React from 'react';
import { css } from '@emotion/react';
import Accordion from '../Accordion.jsx';
import Button from '../Button.jsx';

const keyBindingsTabContainer = css`
	hr {
		padding: 0px 0px;
		margin: 10px 0px;
		border-color: #4b3c3370;
	}
`;

const KeybindingsTab = () => {
	return (
		<div css={keyBindingsTabContainer}>
			<Accordion />
			<hr />
			<Button variant="primary">Restaurar defaults</Button>
			<Button variant="primary">Cancelar</Button>
			<Button variant="secondary">Guardar y salir</Button>
		</div>
	);
};

export default KeybindingsTab;
