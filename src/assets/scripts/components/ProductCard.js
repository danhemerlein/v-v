import { Form, Formik } from 'formik';
import _ from 'lodash';
import React, { useState } from 'react';
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

  const [productOptions, setProductOptions] = useState(
    Object.keys(product.options)
  );

  const selectVariant = (newBuild) => {
    const newVariant = product.variants.filter((variant) => {
      if (_.isEqual(newBuild, variant.selectedOptions)) {
        return variant;
      }
    });

    setActiveVariant(newVariant[0]);
  };

  const { id, title, variants } = product;

  return (
    <Card>
      <Image src={activeVariant.image.src} alt={title} />

      <TitleParagraph>{title}</TitleParagraph>

      <ProductPrice variant={activeVariant} />

      <Formik
        initialValues={variants[0].selectedOptions}
        onSubmit={(values, { setSubmitting }) => {
          selectVariant(values);
          setSubmitting(false);
        }}
      >
        {({ values, setFieldValue, submitForm }) => {
          const selectColor = (e) => {
            setFieldValue('Color', e.target.dataset.value);
            submitForm();
          };

          const customSelectChangeHandler = (e, val) => {
            setFieldValue(val, e.target.value);
            submitForm();
          };

          return (
            <StyledForm id={id}>
              {productOptions.map((option) => {
                if (option === 'Color') {
                  return (
                    <ColorSwatch
                      key={option}
                      selectColor={selectColor}
                      activeVariant={activeVariant}
                      values={product.options.Color}
                    />
                  );
                }
              })}

              <CustomSelectContainer>
                {productOptions.map((option) => {
                  if (option !== 'Color') {
                    return (
                      <VariantSelect
                        key={option}
                        updateValues={customSelectChangeHandler}
                        values={product.options[option]}
                        value={option}
                      />
                    );
                  }
                })}

                {/* <pre>{JSON.stringify(values, null, 2)}</pre>

                <pre>
                  {JSON.stringify(activeVariant.selectedOptions, null, 2)}
                </pre> */}
              </CustomSelectContainer>
            </StyledForm>
          );
        }}
      </Formik>
    </Card>
  );
};
export default ProductCard;
