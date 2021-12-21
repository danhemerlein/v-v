import React from 'react';
import styled from 'styled-components';
import { above, remHelper } from '../styles/utilities';
import ProductCard from './ProductCard';

const Wrapper = styled.main`
  padding: ${remHelper[16]};
`;

const ProductGrid = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: ${remHelper[16]};

  ${above.mobile`
    grid-template-columns: repeat(3, 1fr);
  `};
`;

const PLP = ({ products }) => {
  console.log(products);
  return (
    <Wrapper>
      <p>{products.length} results</p>
      <ProductGrid>
        {products.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </ProductGrid>
    </Wrapper>
  );
};

export default PLP;
