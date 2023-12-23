import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import mapasData from './data/mapasDat.json';
import user_head from '../../../../../imagenes/popups/user_head.png';
import Typography from '../Typography.jsx';
import Tooltip from '../Tooltip.jsx';
import { tooltipStyles } from '../Tooltip.jsx';

const RECT_WIDTH = 36;
const RECT_HEIGHT = 24;
const HALF_RECT_WIDTH = RECT_WIDTH / 2;
const HALF_RECT_HEIGHT = RECT_HEIGHT / 2;

const BaseMapaProps = {
	width: RECT_WIDTH,
	height: RECT_HEIGHT
};

const textStyles = (isCurrentPosition) => ({
	fontWeight: isCurrentPosition ? 600 : 'normal',
	letterSpacing: '0.05em'
});

export const Mapa = ({ x, y, mapa, entrada, imagePath, currentPosition }) => {
	const [showText, setShowText] = useState(true);
	const [open, setOpen] = useState(false);
	const isCurrentPosition = currentPosition === mapa;
	const textColor = isCurrentPosition ? 'red' : entrada ? 'yellow' : 'white';

	const handleMouseOver = () => {
		const blurFilter = document.querySelector('.textShadowAnimation');
		blurFilter.setAttribute('stdDeviation', '3');
	};

	const handleMouseOut = () => {
		const blurFilter = document.querySelector('.textShadowAnimation');
		blurFilter.setAttribute('stdDeviation', '0');
	};

	const handleClick = () => {
		setOpen(true);
	};

	const handleClickAway = () => {
		setOpen(false);
	};

	useEffect(() => {
		let timer;

		if (isCurrentPosition) {
			timer = setInterval(() => {
				setShowText((prev) => !prev);
			}, 2500);
		}

		return () => {
			clearInterval(timer);
		};
	}, [mapa, currentPosition]);

	const mapInfo = mapasData.find((m) => m.mapa === mapa);

	const tooltipContent = (
		<div css={tooltipStyles}>
			<Typography component="span">Mapa {mapInfo.mapa}</Typography>
			<Typography component="span">Nombre: {mapInfo.name}</Typography>
			<Typography component="span">Magia sin efecto: {mapInfo.MagiaSinefecto}</Typography>
			<Typography component="span">Pk: {mapInfo.Pk}</Typography>
		</div>
	);

	return (
		<g onClick={handleClick} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
			<Tooltip open={open} handleClickAway={handleClickAway} tooltipContent={tooltipContent}>
				<rect x={x} y={y} {...BaseMapaProps} />
				<image href={imagePath} x={x} y={y} width={RECT_WIDTH} height={RECT_HEIGHT} />
				<rect className="overlay" x={x} y={y} {...BaseMapaProps} />

				{isCurrentPosition && !showText && (
					<image
						href={user_head}
						x={x + HALF_RECT_WIDTH / 2 - 2}
						y={y + HALF_RECT_HEIGHT / 2 - 1}
						width={RECT_WIDTH / 1.6}
						height={RECT_HEIGHT / 1.6}
						css={css`
							opacity: ${showText ? 0 : 1};
							transition: opacity 0.6s ease;
						`}
					/>
				)}

				<text
					x={x + HALF_RECT_WIDTH}
					y={y + HALF_RECT_HEIGHT + 2}
					fill={textColor}
					style={textStyles(isCurrentPosition)}
					css={css`
						opacity: ${showText ? 1 : 0};
						transition: opacity 0.6s ease;
					`}
				>
					{mapa}
				</text>
			</Tooltip>
		</g>
	);
};

export default Mapa;
