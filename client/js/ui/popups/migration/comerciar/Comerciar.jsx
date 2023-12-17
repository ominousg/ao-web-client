import React, { useState } from 'react';
import Popup from '../Popup.jsx';
import Button from '../Button.jsx';
import Input from '../Input.jsx';
import { css } from '@emotion/react';
import ItemsGrid from '../ItemsGrid.jsx';

const comerciarPopup = (isScrollable) => css`
  max-width: ${isScrollable ? '570px' : '547px'};
  height: ${isScrollable ? '400px' : '380px'};
  display: flex;
  flex-direction: column;

  hr {
    all: unset;
    border-top: 1px solid #373130;
    margin-top: 10px;
    margin-bottom: 25px;
  }
  

  input {
    max-width: 70px;
    height: 22px;
    text-align: start;
    margin: 0px 60px;
  }
`;

const itemStatsContainer = css`
  background-color: #191411;
  padding: 5px 20px;
  height: 60px;
  width: 100%;
  border: 1px solid #453c36;
  border-radius: 2px;
  display: flex;
  justify-content: space-between;

  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    span {
      text-transform: uppercase;
      color: #BBBDBF;

      &:nth-of-type(2) {
        color: white;
        margin-left: 7px;
      }
    }
  }
`;


const itemsGridContainer = css`
  display: flex;
  gap: 15px;
  padding: 15px 0px;

  > div {
    flex: 1; 
    width: 50%;
    border: 3px solid #1b1714;
    box-shadow: -1px 0px 17px -4px rgba(18,15,14,1);
  }
`;


const Comerciar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const itemsNumber = 40;
  const isScrollable = itemsNumber > 20;

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Popup title='Comerciar' isOpen={isOpen} togglePopup={togglePopup} maxWidth="560px">
      <div css={comerciarPopup(isScrollable)}>
        <div css={itemStatsContainer}>
          <div>
            <div>
              <span>Nombre</span>
              <span>Armadura</span>
            </div>
            <div>
              <span>Min defensa</span>
              <span>15</span>
            </div>
          </div>
          <div>
            <div>
              <span>Precio</span>
              <span>15000</span>
            </div>
            <div>
              <span>Max defensa</span>
              <span>35</span>
            </div>
          </div>
        </div>


        <div css={itemsGridContainer}>
          <div>
            <ItemsGrid itemsNumber={itemsNumber} />
          </div>
          <div>
            <ItemsGrid itemsNumber={itemsNumber} />
          </div>
        </div>

        <hr />
        <div style={{ textAlign: 'center' }}>
          <Button variant='primary'>Comprar</Button>
          <Input type="number" defaultValue={1} />
          <Button variant='primary'>Vender</Button>
        </div>
      </div>
    </Popup>
  );
};

export default Comerciar;
