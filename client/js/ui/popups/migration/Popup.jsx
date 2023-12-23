/*
  TO DO:
  1) asegurar consistencia en los nombres de los css consts
  2) abstraer el diseño/estructura de la sidebar para evitar repeticion
  3) abstraer el footer del popup y reusarlo
*/

import React from 'react';
import Dialog from '@mui/material/Dialog';
import Draggable from 'react-draggable';
import { css } from '@emotion/react';

const basePopup = css`
	background: url('../imagenes/background.png') repeat;
	border: 10px solid black;
	border-image: url(../imagenes/borde.png) 20 round;
	box-shadow:
		0 4px 8px 0 rgba(0, 0, 0, 0.3),
		0 6px 20px 0 rgba(0, 0, 0, 0.5);
	color: white;
	min-width: 240px;
`;

const titleBar = css`
	display: flex;
	justify-content: space-between;
	align-items: center;

	border: 2px solid black;

	background: url(../imagenes/background_heading.png);
	background-size: 100% 100%;
	background-repeat: no-repeat;

	border-image-source: url(../imagenes/borde_heading.png);
	border-image-slice: 14 14 28 14;
	border-image-repeat: round;
	border-image-width: 5px 5px 10px 5px;

	padding: 8px 8px 10px 15px;
	cursor: move;

	h2 {
		all: unset;
		font-size: 14px;
		color: #bda186;
		font-weight: bold;
		font-family: Myriad Pro;
		text-transform: uppercase;
		text-overflow: ellipsis;
	}

	// boton para cerrar popup
	button {
		all: unset;
		width: 20px;
		height: 20px;
		background-repeat: no-repeat;
		background-image: url(../imagenes/botones/boton_cerrar.png);
		background-size: 100% 100%;
		box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
		border: none;
		outline: none;
		cursor: pointer;

		&:hover {
			background-image: url(../imagenes/botones/boton_cerrar_hover.png);
		}

		&:active {
			background-image: url(../imagenes/botones/boton_cerrar_push.png);
		}
	}
`;

const textContainer = (hideBorder) => css`
	padding: 10px 15px;
	border: ${hideBorder ? '8px solid transparent' : '8px solid black'};
	border-image: ${hideBorder ? 'none' : 'url(../imagenes/container_content_iner_border.png) 20 repeat'};
`;

const Popup = ({ title, children, isOpen, togglePopup, hideBorder, ...rest }) => {
	const handleKeyPress = (event) => {
		if (event.key === 'Escape') togglePopup();
	};

	const DraggableDialog = (props) => {
		return (
			<Draggable handle=".drag-handle">
				<div {...props} />
			</Draggable>
		);
	};

	return (
		<Dialog
			open={isOpen}
			PaperComponent={DraggableDialog}
			onClose={togglePopup}
			onKeyDown={handleKeyPress}
			{...rest}
		>
			<div css={basePopup}>
				<div css={titleBar} className="drag-handle">
					<h2>{title}</h2>
					<button data-id="close-popup" onClick={togglePopup}></button>
				</div>
				<div css={textContainer(hideBorder)}>{children}</div>
			</div>
		</Dialog>
	);
};

export default Popup;
