import React from 'react';
import MUISlider from '@mui/material/Slider';
import { css } from '@emotion/react';

const sliderStyles = css`
	&& {
		.MuiSlider-thumb {
			width: 30px;
			height: 40px;
			background: transparent;
			border: none;
			box-shadow: none;
			background-image: url('/imagenes/slider/scale_bar_handler.png');
			background-size: cover;
			background-repeat: no-repeat;

			&:hover {
				background-image: url('/imagenes/slider/scale_bar_handler_hover.png');
			}
		}

		.MuiSlider-rail {
			height: 20px;
			background-image: url('/imagenes/slider/scale_bar.png');
			background-size: cover;
			background-color: transparent;
			opacity: 0.8;
			max-width: 100%;
			right: 8px;
		}

		.MuiSlider-track {
			height: 7px;
			background: #978471;
			box-shadow: inset 2px 0px 1px 1px rgba(0, 0, 0, 0.5);
			max-width: 100%;
			right: 8px;
		}
	}
`;

const Slider = ({ value, onChange, ...rest }) => {
	return (
		<MUISlider
			size="small"
			value={value}
			onChange={(_, newValue) => onChange(newValue)}
			aria-label="Small"
			css={sliderStyles}
			{...rest}
		/>
	);
};

export default Slider;
