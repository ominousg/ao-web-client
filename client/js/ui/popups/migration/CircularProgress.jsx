import React from 'react';
import { css } from '@emotion/react';
import MUICircularProgress from '@mui/material/CircularProgress';

const circleStyles = css`
	& .MuiCircularProgress-svg {
		color: white;
	}
`;

const CircularProgress = ({ ...rest }) => {
	return (
		<div css={circleStyles}>
			<MUICircularProgress {...rest} />
		</div>
	);
};

export default CircularProgress;
