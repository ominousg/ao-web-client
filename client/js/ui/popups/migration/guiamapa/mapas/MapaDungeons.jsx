import React from 'react';
import { mapaDungeons, terrainConfig } from '../data/mapas';
import { Filters } from '../Filters.jsx';
import { mapaStyles } from './Mapa.styles';
import { css } from '@emotion/react';
import { useMapLoader } from './useMapLoader';

const currentPosition = 48;

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

const Text = ({ x, y, content }) => {
	return (
		<>
			<text x={x} y={y} css={borderedTextStyle}>
				{' '}
				{content}{' '}
			</text>
			<text x={x} y={y} css={textStyle}>
				{' '}
				{content}{' '}
			</text>
		</>
	);
};

export const MapaDungeonsSVG = () => {
	const { isLoading, renderMapa } = useMapLoader(terrainConfig);

	return (
		<div css={mapaStyles}>
			{isLoading ? (
				<img src="../imagenes/popups/mapa_2_skeleton.png" alt="skeleton mapa dungeons" />
			) : (
				<svg width="650" height="550">
					<Text x="85" y="20" content="Dungeon Veriil" />
					<Text x="255" y="15" content="Catacumbas" />
					<Text x="255" y="30" content="Ulla-Nix" />
					<Text x="415" y="15" content="Ducto de Escape" />
					<Text x="580" y="15" content="Ruinas" />
					<Text x="580" y="30" content="de Earost" />
					<Text x="110" y="220" content="Dungeon" />
					<Text x="110" y="237" content="Marabel" />
					<Text x="110" y="335" content="Dungeon" />
					<Text x="110" y="352" content="Dragon" />
					<Text x="80" y="435" content="Dungeon" />
					<Text x="80" y="452" content="Newbie" />
					<Text x="247" y="220" content="Minas de Plata" />
					<Text x="247" y="320" content="Minas de Hierro" />
					<Text x="247" y="400" content="Minas de Oro" />
					<Text x="245" y="478" content="Mausoleo" />
					<Text x="420" y="204" content="Montaña Ungrid" />
					<Text x="420" y="220" content="Ankon" />
					<Text x="412" y="350" content="Dungeon" />
					<Text x="412" y="367" content="Inferno" />
					<Text x="412" y="450" content="Nubal" />
					<Filters />
					{mapaDungeons.map((map) => renderMapa(map, currentPosition))}
				</svg>
			)}
		</div>
	);
};
