import React, { useState, useCallback } from 'react';
import { css } from '@emotion/react';
import Button from '../Button.jsx';
import Typography from '../Typography.jsx';
import Checkbox from '../Checkbox.jsx';
import Select from '../Select.jsx';

export const checkboxContainerStyle = css`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	margin-top: 10px;
	margin-bottom: 20px;
`;

const selectContainer = css`
	display: flex;
	justify-content: space-between;
	margin: 10px 15px 5px 0px;

	select {
		width: 180px;
	}
`;

const OptionsTab = () => {
	const checkboxOptions = [
		{ id: 'fps', label: 'Mostrar FPS' },
		{ id: 'ping', label: 'Mostrar ping' },
		{ id: 'rain', label: 'Renderizar lluvia' },
		{ id: 'disableParticles', label: 'Renderizar partículas' },
		{ id: 'hdGraphics', label: 'Gráficos HD (2x)' },
		{ id: 'compressedTextures', label: 'Texturas comprimidas (KTX)' },
		{ id: 'disableDmgText', label: 'Renderizar texto de daño' },
		{ id: 'ceilingAlphaBlending', label: 'Transparencia en techos' },
		{ id: 'textTransition', label: 'Animación de texto chat' },
		{ id: 'closeWithESC', label: 'Cerrar ventana con ESC' },
		{ id: 'hideTextWhileDead', label: 'Ocultar texto al morir' }
	];

	const renderizadorOptions = [
		{ value: 'WebGL 2', label: 'WebGL 2' },
		{ value: 'Canvas', label: 'Canvas' },
		{ value: 'WebGPU', label: 'WebGPU', disabled: true }
	];

	const textOptions = [
		{ value: 'Default', label: 'Canvas API' },
		{ value: 'Bitmap', label: 'Bitmap' },
		{ value: 'MSDF', label: 'MSDF', disabled: true }
	];

	const [selectedRenderizador, setSelectedRenderizador] = useState('WebGL 2');
	const [selectedTexto, setSelectedTexto] = useState('Canvas API');

	const performanceCheckboxes = checkboxOptions.slice(0, -2);
	const gameplayCheckboxes = checkboxOptions.slice(-2);

	const handleRenderizadorChange = (e) => setSelectedRenderizador(e.target.value);
	const handleTextoChange = (e) => setSelectedTexto(e.target.value);

	const initialState = checkboxOptions.reduce((acc, item) => {
		acc[item.id] = false;
		return acc;
	}, {});

	const [checkboxValues, setCheckboxValues] = useState(initialState);

	const handleCheckboxChange = useCallback((e) => {
		const { id, checked } = e.target;
		setCheckboxValues((prevValues) => ({
			...prevValues,
			[id]: checked
		}));
	}, []);

	return (
		<>
			<Typography component="h4">Rendimiento</Typography>
			<div css={checkboxContainerStyle}>
				{performanceCheckboxes.map(({ id, label, disabled }) => (
					<Checkbox
						key={id}
						id={id}
						label={label}
						isChecked={checkboxValues[id]}
						onChange={handleCheckboxChange}
						disabled={disabled}
					/>
				))}
			</div>

			<div css={selectContainer}>
				<Typography component="label">Renderizador: </Typography>
				<Select
					options={renderizadorOptions}
					selectedValue={selectedRenderizador}
					onChange={handleRenderizadorChange}
					style={{ width: '180px' }}
				/>
			</div>

			<div css={selectContainer}>
				<Typography component="label">Texto: </Typography>
				<Select options={textOptions} selectedValue={selectedTexto} onChange={handleTextoChange} />
			</div>

			<div css={checkboxContainerStyle}>
				{gameplayCheckboxes.map(({ id, label, disabled }) => (
					<Checkbox
						key={id}
						id={id}
						label={label}
						isChecked={checkboxValues[id]}
						onChange={handleCheckboxChange}
						disabled={disabled}
					/>
				))}
			</div>

			<Button variant="primary">Restaurar defaults</Button>
		</>
	);
};

export default OptionsTab;
