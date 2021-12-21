import React from 'react';
import styled from 'styled-components';
import { above, remHelper } from '../styles/utilities';

const StyledSelect = styled.select`
  padding: ${remHelper[8]};
  width: 100%;
  text-align: left;
  cursor: pointer;
  background-color: #fff;
  background-image: url("data:image/svg+xml;utf8,<svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><polygon fill='currentColor' points='7 10 12 15 17 10'/></svg>");
  background-repeat: no-repeat;
  background-size: 24px;
  border: solid 1px #000;
  border-radius: 2px;
  background-position-y: center;
  background-position-x: calc(100%);
  -webkit-appearance: none;

  &:focus {
    outline: solid 2px #000;
    outline-offset: 2px;
  }

  ${above.mobile`
    max-width: 240px;
  `}
`;

const Select = ({ onChange, children, className }) => {
  return (
    <StyledSelect className={className} onChange={onChange}>
      {children}
    </StyledSelect>
  );
};

export default Select;
