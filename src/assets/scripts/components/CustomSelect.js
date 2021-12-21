import { Field } from 'formik';
import React from 'react';
import styled from 'styled-components';
import { above, remHelper } from '../styles/utilities';

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

const CustomSelect = ({ values, updateValues, value }) => {
  return (
    <Container>
      <StyledLabel htmlFor={value}>{value.toLowerCase()}</StyledLabel>
      <Field
        as="select"
        name={value}
        id={value}
        onChange={(e) => updateValues(e, value)}
      >
        {values.map((val) => {
          return (
            <option key={val} value={val}>
              {val}
            </option>
          );
        })}
      </Field>
    </Container>
  );
};
export default CustomSelect;
