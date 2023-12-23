import React, { useState, useEffect, useCallback, useMemo } from 'react';
import MyPopup from '../Popup.jsx';
import { css } from '@emotion/react';
import Button from '../Button.jsx';
import Input from '../Input.jsx';

const clanesPopup = css`
	width: 450px;
	height: 350px;
	display: flex;
`;

const sidebarStyle = css`
	width: 70px;
	display: flex;
	flex-direction: column;
	margin: -10px 0px -10px -22px;
	align-items: center;

	border: 8px solid black;
	border-image: url(../imagenes/container_content_iner_border.png) 20 repeat;

	button {
		all: unset;
		height: 44px;
		width: 44px;
		cursor: pointer;

		img {
			height: 44px;
			width: 44px;
		}
	}
`;

const contentStyle = css`
	width: 100%;
	border: 8px solid black;
	border-image: url(../imagenes/container_content_iner_border.png) 20 repeat;

	margin: -9px -20px -10px 5px;
`;

const clanesList = css`
	padding-left: 8px;

	h4 {
		color: #978576;
	}

	// caja de clanes
	div:nth-of-type(1) {
		max-height: 225px;
		overflow-y: auto;
		max-width: 390px;
		overflow-x: hidden;
	}

	.clan-list {
		border: 1px solid #453c36;
	}

	button {
		margin: 8px 7px 0px 0px;
	}
`;

const searchResult = css`
	background-color: #191411;
	width: 390px;
	padding: 1px 5px 1px 10px;
	cursor: pointer;
	user-select: none;

	p {
		all: unset;
	}

	&:hover {
		background-color: #19141120;
	}
`;

const clanes = [
	'La Logia',
	'TRAPO',
	'KenhoKai',
	'NAPALM',
	'Valhalla',
	'BlueSky',
	'Arcanos',
	'La Mazorka',
	'Irilend',
	'Los Intocables',
	'Austland',
	'Dha Mastha',
	'TalKinG',
	'BRUJERIA',
	'mRaiders',
	'Gauchos del Cielo',
	'IroN PoweR',
	'No MerCy',
	'Clase A',
	'Caradrim',
	'KarmianS',
	'Caballeros Del Temple',
	'M A F I A',
	'Eldar Ithil',
	'Praetorians',
	'HellFish',
	'Hay Equipo',
	'Hijos de Marco Apostol',
	'Gefolgen',
	'La Granja',
	'Zoldick',
	'Lumiere',
	'attitudE',
	'Sword Knights',
	'Zoltan',
	'Hijos De Belcebu',
	'The Clash',
	'VenitA',
	'The PoweR'
];

const ClanListItem = React.memo(({ result, index, clickedResult, onClick }) => {
	return (
		<div
			key={result}
			css={css`
				${searchResult};
				${clickedResult === result ? 'background-color: #19141120;' : ''}
				${index === 0 ? 'padding-top: 5px' : null}
			`}
			onClick={() => onClick(result)}
		>
			<p>{result}</p>
		</div>
	);
});

ClanListItem.displayName = 'ClanListItem';

const ClanesList = () => {
	const [searchInput, setSearchInput] = useState('');
	const [debouncedSearchInput, setDebouncedSearchInput] = useState(searchInput);
	const [clickedResult, setClickedResult] = useState(null);

	const handleResultClick = useCallback((result) => {
		setClickedResult(result);
	}, []);

	useEffect(() => {
		const timerId = setTimeout(() => {
			setDebouncedSearchInput(searchInput);
		}, 200);

		return () => {
			clearTimeout(timerId);
		};
	}, [searchInput]);

	const filteredResults = useMemo(() => {
		if (debouncedSearchInput.length >= 1) {
			return clanes.filter((clan) => clan.toLowerCase().includes(debouncedSearchInput.toLowerCase()));
		}
		return clanes;
	}, [debouncedSearchInput]);

	return (
		<div css={clanesList}>
			<h4>Clanes</h4>
			<Input
				type="search"
				placeholder="Nombre"
				value={searchInput}
				onChange={(e) => setSearchInput(e.target.value)}
			/>
			<div className="clan-list">
				{filteredResults.length === 0 ? (
					<h5 style={{ padding: '0px 10px' }}>Sin resultados.</h5>
				) : (
					filteredResults.map((result, index) => (
						<ClanListItem
							key={result}
							result={result}
							index={index}
							clickedResult={clickedResult}
							onClick={handleResultClick}
						/>
					))
				)}
			</div>

			<Button variant="secondary">Crear</Button>
			<Button variant="primary">Detalles</Button>
			<Button variant="secondary">Aplicarse</Button>
		</div>
	);
};

const Clanes = () => {
	const [isOpen, setIsOpen] = useState(true);
	const [activeTab, setActiveTab] = useState('clanesList');

	const togglePopup = () => {
		setIsOpen(!isOpen);
	};

	const tabs = [
		{ id: 'clanesList', icon: 'shield', label: 'tab lista de clanes' },
		{ id: 'clanesMembers', icon: 'group', label: 'tab miembros clan', disabled: true },
		{ id: 'clanesSolicitudes', icon: 'crown', label: 'tab solicitudes clan', disabled: true },
		{ id: 'clanesSettings', icon: 'settings', label: 'tab configuracion clan', disabled: true }
	];

	return (
		<MyPopup title="Clanes" isOpen={isOpen} togglePopup={togglePopup} hideBorder={true}>
			<div css={clanesPopup}>
				<div css={sidebarStyle}>
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							style={{ cursor: tab.disabled ? 'not-allowed' : 'pointer' }}
							disabled={tab.disabled}
						>
							<img
								src={
									activeTab === tab.id
										? `../imagenes/interfaz/iconos/${tab.icon}_active.png`
										: `../imagenes/interfaz/iconos/${tab.icon}.png`
								}
								alt={tab.label}
							/>
						</button>
					))}
				</div>
				<div css={contentStyle}>
					{activeTab === 'clanesList' && <ClanesList />}
					{activeTab === 'clanesMembers' && <h6>clanes members</h6>}
				</div>
			</div>
		</MyPopup>
	);
};

export default Clanes;
