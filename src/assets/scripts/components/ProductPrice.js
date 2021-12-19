import React from 'react';
import styled from 'styled-components';
import { COLORS, remHelper } from '../styles/utilities';

const PriceParagraph = styled.p`
  margin-top: ${remHelper[8]};
  text-align: center;
  background-color: ${({ color }) => color};

  ${({ strike }) =>
    strike &&
    `
      text-decoration: line-through;
      margin: 0;
    `};

  ${({ red }) =>
    red &&
    `
      color: ${COLORS.Red};
      margin: 0;
    `};
`;

const renderPrice = (avail, price, compPrice) => {
  if (!avail) {
    return <PriceParagraph>Out of Stock</PriceParagraph>;
  }

  if (compPrice) {
    return (
      <PriceParagraph>
        <PriceParagraph as="span" strike>
          ${price}
        </PriceParagraph>
        <PriceParagraph as="span" red>
          &nbsp;&nbsp;&nbsp;$
          {compPrice}
        </PriceParagraph>
      </PriceParagraph>
    );
  }

  return <PriceParagraph>${price}</PriceParagraph>;
};

const ProductPrice = ({ variant }) => {
  const { availableForSale, compareAtPrice, price } = variant;

  return <>{renderPrice(availableForSale, price, compareAtPrice)}</>;
};
export default ProductPrice;
