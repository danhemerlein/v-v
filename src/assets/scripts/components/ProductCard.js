import { Form, Formik } from 'formik';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { above, remHelper } from '../styles/utilities';
import ColorSwatch from './ColorSwatch';
import ProductPrice from './ProductPrice';
import VariantSelect from './VariantSelect';

const Card = styled.li`
  margin-top: ${remHelper[16]};
`;

const Image = styled.img`
  width: 100%;
`;

const TitleParagraph = styled.p`
  margin-top: ${remHelper[8]};
  text-align: center;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const CustomSelectContainer = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: space-around;

  ${above.mobile`
    flex-direction: row;
  `};
`;

const ProductCard = ({ product }) => {
  const [activeVariant, setActiveVariant] = useState(product.variants[0]);
  const [hasColors, setHasColors] = useState(false);
  const [hasSize, setHasSize] = useState(false);
  const [hasFit, setHasFit] = useState(false);
  const [hasWaist, setHasWaist] = useState(false);
  const [hasLength, setHasLength] = useState(false);

  const selectVariant = (newBuild) => {
    const newVariant = product.variants.filter((variant) => {
      if (_.isEqual(newBuild, variant.selectedOptions)) {
        return variant;
      }
    });

    setActiveVariant(newVariant[0]);
  };

  const { options } = product;

  useEffect(() => {
    const colorOption = Object.keys(options).includes('Color');
    const sizeOption = Object.keys(options).includes('Size');
    const fitOption = Object.keys(options).includes('Fit');
    const waistOption = Object.keys(options).includes('Waist');
    const lengthOption = Object.keys(options).includes('Length');

    setHasSize(sizeOption);
    setHasFit(fitOption);
    setHasWaist(waistOption);
    setHasLength(lengthOption);
    setHasColors(colorOption);
  }, []);

  return (
    <Card>
      <Image src={activeVariant.image.src} alt={product.title} />

      <TitleParagraph>{product.title}</TitleParagraph>

      <ProductPrice variant={activeVariant} />

      <Formik
        initialValues={product.variants[0].selectedOptions}
        // validationSchema={schema[0]}
        onSubmit={(values, { setSubmitting }) => {
          selectVariant(values);
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          setFieldValue,
          submitForm,
        }) => {
          const selectColor = (e) => {
            setFieldValue('Color', e.target.dataset.value);
            submitForm();
          };

          const customSelectChangeHandler = (e, val) => {
            setFieldValue(val, e.target.value);
            submitForm();
          };

          return (
            <StyledForm id={product.id}>
              {hasColors && (
                <ColorSwatch
                  selectColor={selectColor}
                  activeVariant={activeVariant}
                  values={product.options.Color}
                />
              )}

              <CustomSelectContainer>
                {hasSize && (
                  <VariantSelect
                    updateValues={customSelectChangeHandler}
                    values={product.options.Size}
                    value="Size"
                  />
                )}

                {hasWaist && (
                  <VariantSelect
                    updateValues={customSelectChangeHandler}
                    values={product.options.Waist}
                    value="Waist"
                  />
                )}

                {hasLength && (
                  <VariantSelect
                    updateValues={customSelectChangeHandler}
                    values={product.options.Length}
                    value="Length"
                  />
                )}

                {hasFit && (
                  <VariantSelect
                    updateValues={customSelectChangeHandler}
                    values={product.options.Fit}
                    value="Fit"
                  />
                )}

                <pre>{JSON.stringify(values, null, 2)}</pre>

                <pre>
                  {JSON.stringify(activeVariant.selectedOptions, null, 2)}
                </pre>
              </CustomSelectContainer>
            </StyledForm>
          );
        }}
      </Formik>
    </Card>
  );
};
export default ProductCard;
