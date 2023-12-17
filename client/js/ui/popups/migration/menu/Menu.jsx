import React, { useState } from 'react';
import MyPopup from '../Popup.jsx';
import Button from '../Button.jsx';
import { css } from '@emotion/react';

const menuPopup = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    margin: 7px 0px;
  }
`;

const Menu = () => {
  const [isOpen, setIsOpen] = useState(true);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <MyPopup title='Menu' isOpen={isOpen} togglePopup={togglePopup}>
      <div css={menuPopup}>
        <Button variant='primary'>Mapa</Button>
        <Button variant='primary'>Estadísticas</Button>
        <Button variant='primary'>Clanes</Button>
        <Button variant='primary'>Party</Button>
        <Button variant='primary'>Ajustes</Button>
      </div>
    </MyPopup>
  );
}

export default Menu;
