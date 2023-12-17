import React, { useState, useEffect } from "react";
import { Mapa } from "../Mapa.jsx";

export const useMapLoader = (terrainConfig) => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				setIsLoading(false);
			});
		});
	}, []);

	const renderMapa = (map, currentPosition) => {
		const { imagePath } = terrainConfig[map.terreno];

		return (
			<Mapa
				key={map.mapa}
				{...map}
				imagePath={imagePath}
				currentPosition={currentPosition}
			/>
		);
	};

	return { isLoading, renderMapa };
};
