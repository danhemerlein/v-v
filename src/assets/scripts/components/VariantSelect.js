import React from 'react';
import styled from 'styled-components';
import { above, remHelper } from '../styles/utilities';
import Select from './Select';

const Container = styled.div`
  margin-top: ${remHelper[8]};
  width: 100%;
  display: flex;
  flex-direction: column;

  ${above.mobile`
    width: 45%;
  `};
`;

const StyledLabel = styled.label`
  margin-bottom: ${remHelper[4]};
`;

const StyledSelect = styled(Select)`
  padding: ${remHelper[4]};
`;

const VarientSelect = ({ values, updateValues, value }) => {
  return (
    <Container>
      <StyledLabel htmlFor={value}>{value.toLowerCase()}</StyledLabel>
      <StyledSelect
        name={value}
        id={value}
        onChange={(e) => updateValues(e, value)}
      >
        <option value="">{value.toLowerCase()}</option>

        {values.map((val) => {
          return (
            <option key={val} value={val}>
              {val}
            </option>
          );
        })}
      </StyledSelect>
    </Container>
  );
};

export default VarientSelect;
