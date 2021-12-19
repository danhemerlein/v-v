import React, { useState } from 'react';
import styled from 'styled-components';
import { remHelper } from '../styles/utilities';
import ProductPrice from './ProductPrice';

const Card = styled.li`
  ${'' /* width: calc(50% - ${remHelper[16]}); */}
  margin-top: ${remHelper[16]};

  ${
    '' /* &:nth-of-type(even) {
    margin-left: ${remHelper[8]};
  }

  &:nth-of-type(odd) {
    margin-right: ${remHelper[8]};
  } */
  }

  ${
    '' /* ${above.mobile`
    width: calc(33.33% - ${remHelper[16]});

    &:nth-of-type(2n) {
      margin-left: ${remHelper[8]};
      margin-right: ${remHelper[8]};
    }

    &:nth-of-type(3n) {
      margin-left: ${remHelper[8]};
    }
  `} */
  }
`;

const Image = styled.img`
  width: 100%;
`;

const TitleParagraph = styled.p`
  margin-top: ${remHelper[8]};
  text-align: center;
`;

const ProductCard = ({ product }) => {
  const [activeVariant, setActiveVariant] = useState(product.variants[0]);
  return (
    <Card>
      <Image src={activeVariant.image.src} alt={product.title} />
      <TitleParagraph>{product.title}</TitleParagraph>

      <ProductPrice variant={activeVariant} />
    </Card>
  );
};
export default ProductCard;
