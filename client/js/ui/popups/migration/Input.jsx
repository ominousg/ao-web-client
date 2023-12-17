import { css } from '@emotion/react';

const inputStyles = css`
  all: unset;
  width: 390px;
  height: 32px;
  padding: 3px 12px;
  font-size: 14px;
  color: #9f8e80;
  background-color: #191411;
  border: 1px solid #453c36;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  margin-bottom: 15px;

  &::placeholder {
    color: #9f8e8080;
  }

  &:focus {
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px rgba(151, 132, 113, 0.6);
    border: 1px solid #9f8e8080;
  }
`;

const Input = ({ type, value, onChange, placeholder, ...rest }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      css={inputStyles}
      {...rest}
    />
  );
};

export default Input;