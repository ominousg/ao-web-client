import { css } from '@emotion/react';

const selectStyles = css`
  height: 28px;
  padding: 3px 12px;
  font-size: 14px;
  line-height: 1.42857;
  color: #9f8e80;
  background-color: #191411;
  border: 1px solid #453c36;
  border-radius: 2px;
  transition: border-color ease-in-out 0.2s, box-shadow ease-in-out 0.2s;
  max-width: 180px;

  &:focus {
    border-color: #978471;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(151, 132, 113, 0.6);
  }
`;

const Select = ({ options, selectedValue, onChange, ...rest }) => {

  return (
    <select
      value={selectedValue}
      onChange={onChange}
      {...rest}
      css={selectStyles}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value} disabled={option.disabled}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;