import React from 'react';
import { css } from '@emotion/react'; 

const baseStyles = css`
  all: unset;
  font-family: "Myriad Pro", arial, serif;
`;

const h4Styles = css`
  font-size: 18px;
  color: #978576;
  font-weight: 500;
  line-height: 20px;
`;

const pStyles = css`
  font-size: 16px;
  color: #FFFFFF;
  line-height: 22px;
`;

const labelStyles = css`
  font-size: 14px;
  cursor: pointer;
  color: #978577;
`;

const componentStyles = {
  h4: h4Styles,
  p: pStyles,
  label: labelStyles,
};

const Typography = ({ component = 'p', children, additionalStyles }) => {
  const Component = component;
  const combinedStyles = [baseStyles, componentStyles[Component], additionalStyles];

  return <Component css={combinedStyles}>{children}</Component>;
};

export default Typography;
