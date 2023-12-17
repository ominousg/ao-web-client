import React, { useState, useCallback } from 'react'
import { css } from '@emotion/react';
import Slider from '../Slider.jsx'
import Button from '../Button.jsx';
import Typography from '../Typography.jsx';
import Checkbox from '../Checkbox.jsx';
import { checkboxContainerStyle } from './OptionsTab.jsx';

const sliderContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  label {
    width: 100%;
  }

  div { 
    width: 40%;
  }
`;


const SoundTab = () => {

  const checkboxOptions = [
    { id: 'musicValue', label: 'Música activada' },
    { id: 'soundValue', label: 'Sonido activado' },
    { id: 'rainSound', label: 'Sonido de lluvia activado' },
    { id: 'inactiveTabSound', label: 'Silenciar pestaña oculta' },
  ];

  const initialState = checkboxOptions.reduce((acc, item) => {
    acc[item.id] = false;
    return acc;
  }, {});

  const [checkboxValues, setCheckboxValues] = useState(initialState);

  const handleCheckboxChange = useCallback((e) => {
    const { id, checked } = e.target;
    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [id]: checked,
    }));
  }, []);

  const [musicSliderValue, setMusicSliderValue] = useState(70);
  const [soundSliderValue, setSoundSliderValue] = useState(70);

  return (
    <>
      <Typography component='h4'>Sonido</Typography>
      <div css={checkboxContainerStyle}>
        {checkboxOptions.map(({ id, label, disabled }) => (
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

      <div css={sliderContainer}>
        <Typography component='label'>Volumen Música: </Typography>
        <Slider value={musicSliderValue} onChange={setMusicSliderValue} />
      </div>

      <div css={sliderContainer}>
        <Typography component='label'>Volumen Sonido: </Typography>
        <Slider value={soundSliderValue} onChange={setSoundSliderValue} />
      </div>

      <Button variant='primary'>Restaurar defaults</Button>
    </>
  )
}

export default SoundTab