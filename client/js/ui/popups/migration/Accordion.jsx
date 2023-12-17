import React from 'react'
import { css } from '@emotion/react';
import MUIAccordion from '@mui/material/Accordion';
import Typography from './Typography.jsx';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Input from './Input.jsx';
import { ExpandMoreIcon } from '../../../../imagenes/vectores/ExpandMore.jsx';

const accordionStyles = css`
  background-color: #4b3d34;
  border: 1px solid #302721;
  box-shadow: 0px 0px 4px -1px #0d0a08;

  .MuiAccordionDetails-root {
    background-color: #382d27;
    display: flex;
    flex-direction: column;
    padding: 0;
  }

  h4 {
    color: white;
  }

  p {
    color: #978576;
    font-size: 14px;
  }

  svg {
    color: white;
    font-size: 20px;
  }
`;

const accordionItem = css`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #4b3c33;
  padding: 7px 5px 7px 17px;
  flex-grow: 1;

  & > p {
    flex-basis: 40%;
  }

  input {
    flex-basis: 60%;
    max-width: 180px;
    height: 20px !important;
    margin-bottom: 0px;
  }
`;

const AccordionItem = () => {
  return (
    <div css={accordionItem}>
      <Typography component='p'>
        Caminar norte
      </Typography>
      <Input />
    </div>
  )
}

const Accordion = () => {
  return (
    <>
      <MUIAccordion css={accordionStyles} disableGutters>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography component='h4'>Movimiento</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AccordionItem />
          <AccordionItem />
          <AccordionItem />
        </AccordionDetails>
      </MUIAccordion>
    </>
  )
}

export default Accordion