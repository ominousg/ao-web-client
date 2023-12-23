import React, { useState } from 'react';
import { css } from '@emotion/react';

const itemsGrid = (itemsNumber) => css`
	display: flex;
	flex-wrap: wrap;
	max-height: 230px;
	overflow-y: ${itemsNumber > 20 ? 'scroll' : 'none'};
`;

const itemBox = css`
	height: 50px;
	width: 50px;
	background-image: url('../imagenes/slot.png');
	background-size: 100% 100%;
	margin: 1px;
	border: 1px solid #1b1714;
	cursor: pointer;
`;

const selectedBox = css`
	border: 1px solid #ff9800;
	transition: 0.3s;
`;

const ItemsGrid = ({ itemsNumber }) => {
	const [selectedItem, setSelectedItem] = useState(null);

	const handleClick = (index) => {
		setSelectedItem(index);
	};

	return (
		<div css={itemsGrid(itemsNumber)}>
			{Array.from({ length: itemsNumber }, (_, index) => (
				<div
					key={index}
					css={[itemBox, selectedItem === index && selectedBox]}
					onClick={() => handleClick(index)}
				></div>
			))}
		</div>
	);
};

export default ItemsGrid;
