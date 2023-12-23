import React from 'react';
import { css } from '@emotion/react';

const primaryStyle = css`
	all: unset;
	background-color: #694f41;
	background-image: linear-gradient(#8c766b, #694f41);
	padding: 5px 12px;
	cursor: pointer;
	border-radius: 1px;
	width: fit-content;

	&:hover {
		outline: 1px solid #705e54;
	}

	&:active {
		background-color: #503b2e;
		background-image: none;
	}

	&:disabled {
		cursor: not-allowed;
		opacity: 0.45;
	}
`;

const secondaryStyle = css`
	all: unset;
	background-color: #de8b47;
	background-image: linear-gradient(#e3b58f, #de8b47);
	border-color: #de8b47;
	padding: 5px 12px;
	cursor: pointer;
	border-radius: 1px;
	width: fit-content;

	&:hover {
		outline: 1px solid #de8b47;
	}

	&:active {
		background-color: #de8b47;
		background-image: none;
	}

	&:disabled {
		cursor: not-allowed;
		opacity: 0.45;
	}
`;

const Button = ({ variant, children, ...rest }) => {
	const style = variant === 'primary' ? primaryStyle : secondaryStyle;

	return (
		<button css={style} {...rest}>
			{' '}
			{children}{' '}
		</button>
	);
};

export default Button;
