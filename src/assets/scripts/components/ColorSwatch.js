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

  const ListItem = styled.li`
    width: ${remHelper[12]};
    height: ${remHelper[12]};
    margin: ${remHelper[4]};

    ${above.mobile`
      width: ${remHelper[16]};
      height: ${remHelper[16]};
      margin: ${remHelper[8]};
    `};
  `;

  const ColorLabel = styled.label`
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    width: 100%;
    height: 100%;

    &:focus {
      border: 2px solid ${COLORS.Black};
    }
  `;

  const DefaultInput = styled.input`
    appearance: none;
    background-color: #fff;
    margin: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;

    &:focus {
      outline: 1px solid black;
      outline: 1px auto -webkit-focus-ring-color;
    }
  `;

  const CustomInput = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    background: ${({ color }) => COLORS[color]} no-repeat;
    position: absolute;
    z-index: 2;

    ${({ isSelected }) =>
      isSelected &&
      `
        box-shadow: 0 0 0 2px white, 0 0 0 3px ${COLORS.Black};
      `}
  `;

  return (
    <SwatchContainer>
      {values.map((value) => {
        return (
          <ListItem key={value}>
            <ColorLabel htmlFor={value} isSelected={activeColor === value}>
              <DefaultInput
                type="radio"
                name={value}
                id={value}
                data-value={value}
                onChange={(e) => selectColor(e)}
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
          </ListItem>
        );
      })}
    </SwatchContainer>
  );
};
export default ColorSwatch;
