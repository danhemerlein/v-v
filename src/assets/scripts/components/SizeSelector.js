import React, { useState } from 'react';
import styled from 'styled-components';
import { remHelper } from '../styles/utilities';

const getSizeOption = (arr, str) => {
  return arr.filter((item) => {
    return item.name === str;
  });
};

const StyledSelect = styled.select`
  display: block;
  margin: ${remHelper[8]} auto 0 auto;
  padding: ${remHelper[4]};
`;

const SizeSelector = ({ values, activeVariant }) => {
  const [activeSize, setActiveColor] = useState(
    activeVariant.selectedOptions.Size
  );

  return (
    <StyledSelect>
      <option value="">- select a size -</option>
      {values.map((value) => {
        return (
          <option key={value} value={value}>
            {value}
          </option>
        );
      })}
    </StyledSelect>
  );
};
export default SizeSelector;
