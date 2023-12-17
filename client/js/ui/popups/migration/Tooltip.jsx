import MUITooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { css } from '@emotion/react';

export const tooltipStyles = css`
  display: flex;
  flex-direction: column;

  span {
    font-size: 14px;
  }
`;

const Tooltip = ({ children, handleClickAway, tooltipContent, open, ...rest }) => {
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <MUITooltip
        title={tooltipContent}
        open={open}
        placement="top"
        arrow
        {...rest}
      >
        <g>
          {children}
        </g>
      </MUITooltip>
    </ClickAwayListener>
  );
};

export default Tooltip;