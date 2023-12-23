import { css } from '@emotion/react';

export const mapaStyles = css`
	position: relative;
	margin: 0 auto;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;

	g {
		cursor: pointer;
		transform: translateX(30px);

		// overlay blanco al hoverear el mapa
		&:hover .overlay {
			fill-opacity: 0.2;
		}

		&:hover text {
			filter: url(#textShadow);
		}
	}

	.overlay {
		fill: white;
		fill-opacity: 0;
		transition: fill-opacity 0.3s ease;
	}

	text {
		font-size: 14px;
		fill-opacity: 0.8;
		cursor: pointer;
		text-anchor: middle;
		dominant-baseline: middle;
		user-select: none;
	}

	.textShadowAnimation {
		transition: stdDeviation 0.3s ease;
	}

	.mapaGlobalSkeleton {
		transform: translate(-3px, 7px) scale(0.99);
	}
`;
