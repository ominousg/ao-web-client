import React from 'react';
import { mapaGlobal, terrainConfig } from '../data/mapas';
import { Filters } from '../Filters.jsx';
import { mapaStyles } from './Mapa.styles';
import { css } from '@emotion/react';
import { useMapLoader } from './useMapLoader';

const currentPosition = 30;

const borderedTextStyle = css`
	stroke: #211c11;
	stroke-width: 2;
	fill: #211c11;
	font-weight: 600;
`;

const textStyle = css`
	fill: #c1a365;
	font-weight: 600;
	cursor: initial !important;
`;

export const MapaGlobalSVG = () => {
	const { isLoading, renderMapa } = useMapLoader(terrainConfig);

	return (
		<div css={mapaStyles}>
			{isLoading ? (
				<img src="../imagenes/popups/mapa_1_skeleton.png" alt="skeleton mapa global" />
			) : (
				<svg width="650" height="550">
					<text x={92} y={10} css={borderedTextStyle}>
						{' '}
						Micro - AO{' '}
					</text>
					<text x={92} y={10} css={textStyle}>
						{' '}
						Micro - AO{' '}
					</text>
					<Filters />
					{mapaGlobal.map((map) => renderMapa(map, currentPosition))}
				</svg>
			)}
		</div>
	);
};
