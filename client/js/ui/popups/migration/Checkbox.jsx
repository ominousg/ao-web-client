import { css } from '@emotion/react';
import Typography from './Typography.jsx';
import React from 'react';

const checkboxStyles = css`
  input {
    cursor: pointer;
    border: 1px solid #453c36;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    transition: border-color ease-in-out 0.2s, box-shadow ease-in-out 0.2s;
    margin-right: 5px !important;

    &:hover {
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 5px rgba(151, 132, 113, 0.6);
      border: 1px solid rgba(159, 142, 128, 0.5);
    }
  }
`;

const Checkbox = React.memo(({ id, label = 'Label', isChecked = false, onChange, disabled, ...rest }) => {

  return (
    <div css={checkboxStyles}>
      <Typography component='label'>
        <input
          type="checkbox"
          id={id}
          checked={isChecked}
          onChange={onChange}
          disabled={disabled}
          {...rest}
        />
        {label}
      </Typography>
    </div>
  );
});


export default Checkbox;
