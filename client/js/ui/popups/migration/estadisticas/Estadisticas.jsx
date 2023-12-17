import React from 'react';
import MyPopup from '../Popup.jsx';
import { css } from '@emotion/react';
import Button from '../Button.jsx';
import useStore from '../../../../store.js';
import { PopupNames } from '../../popupNames.js';

const estadisticasPopup = css`
  width: 450px;

  button {
    margin-top: 15px;
  }

  hr {
    border-color: #97857730;
    margin-bottom: 5px;
  }
`;

const scrollFlex = css`
  overflow-y: auto;
  height: 230px;
`;

const statsBox = css`
  border: 1px solid #FFFFFF50;
  border-radius: 2px;
  margin: 0px 5px 10px 0px;

  p {
    all: unset;
    color: #978577;
  }

  div:nth-of-type(1) {
    background-color: #4b3d34;
    padding: 10px 10px 10px 15px;

    h2 {
      all: unset;
      font-size: 16px;
    }
  }

  div:nth-of-type(2) {
    background-color: #382e27;
    padding: 10px 10px 10px 15px;
    display: flex;
    flex-direction: column;
  }

  &:last-of-type {
    margin-bottom: 0px;
  }

  tr {
    td:nth-of-type(1) {
      color: #BBBDBF;
      max-width: 0px;
    }

    td:nth-of-type(2) {
      color: #978577;
      max-width: 0px;
    }
  }
`;

const closeButtonContainer = css`
  text-align: right;
`;

const Estadisticas = () => {
  const { popups, closePopup } = useStore();
  const isOpen = popups[PopupNames.ESTADISTICAS] || false;

  return (
    <MyPopup title='Estadísticas' isOpen={isOpen} togglePopup={() => closePopup(PopupNames.ESTADISTICAS)}>
      <div css={estadisticasPopup}>
        <div css={scrollFlex}>
          <div css={statsBox}>
            <div>
              <h2>Atributos</h2>
            </div>
            <div>
              <p>Fuerza: 27</p>
              <p>Agilidad: 17</p>
              <p>Inteligencia: 16</p>
              <p>Carisma: 15</p>
              <p>Constitución: 19</p>
            </div>
          </div>

          <div css={statsBox}>
            <div>
              <h2>Reputación</h2>
            </div>
            <div>
              <p>Asesino: 0</p>
              <p>Bandido: 0</p>
              <p>Ladron: 0</p>
              <p>Burgues: 0</p>
              <p>Noble: 3000</p>
            </div>
          </div>

          <div css={statsBox}>
            <div>
              <h2>Estadísticas</h2>
            </div>
            <div>
              <p>Criminales matados: 0</p>
              <p>Ciudadanos matados: 0</p>
              <p>Ladron: 0</p>
              <p>Clase: Clérigo</p>
              <p>Tiempo restante en carcel: 0</p>
            </div>
          </div>

          <div css={statsBox}>
            <div>
              <h2>Skills</h2>
            </div>
            <div>
              <table>
                <tbody>
                  <tr>
                    <td>Magia</td>
                    <td>8</td>
                  </tr>
                  <tr>
                    <td>Combate cuerpo a cuerpo</td>
                    <td>0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

        <hr />
        <div css={closeButtonContainer}>
          <Button variant='primary' style={{ textAlign: 'right' }} onClick={() => closePopup(PopupNames.ESTADISTICAS)}>Cerrar</Button>
        </div>
      </div>
    </MyPopup>
  );
};

export default Estadisticas;
