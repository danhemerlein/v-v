import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { above, COLORS, remHelper } from '../styles/utilities';

const ColorSwatch = ({ values, activeVariant, selectColor }) => {
  const [activeColor, setActiveColor] = useState('');

  useEffect(() => {
    setActiveColor(activeVariant.selectedOptions.Color);
  }, [activeVariant]);

  const SwatchContainer = styled.ul`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    list-style: none;
  `;

  const ColorLabel = styled.label`
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    margin: ${remHelper[4]};

    ${above.mobile`
      margin: ${remHelper[8]};
    `};
  `;

  const DefaultInput = styled.input`
    opacity: 0;
    width: 0;
    height: 0;
  `;

  const CustomInput = styled.div`
    position: relative;
    width: ${remHelper[12]};
    height: ${remHelper[12]};
    border-radius: 100%;
    background: ${({ color }) => COLORS[color]} no-repeat;

    ${above.mobile`
      width: ${remHelper[16]};
      height: ${remHelper[16]};
    `};

    ${({ isSelected, color }) =>
      isSelected &&
      `
        box-shadow: 0 0 0 2px white, 0 0 0 4px ${COLORS[color]};
      `}
  `;

  return (
    <SwatchContainer>
      {values.map((value) => {
        return (
          <li key={value}>
            <ColorLabel htmlFor={value} isSelected={activeColor === value}>
              <DefaultInput
                type="radio"
                name={value}
                id={value}
                defaultChecked={activeColor === value}
                aria-checked={activeColor === value}
              />

              <CustomInput
                data-value={value}
                color={value}
                onClick={(e) => selectColor(e)}
                isSelected={activeColor === value}
              />
            </ColorLabel>
          </li>
        );
      })}
    </SwatchContainer>
  );
};
export default ColorSwatch;
