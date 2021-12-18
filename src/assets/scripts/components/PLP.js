import React from 'react';
import styled from 'styled-components';
import ProductCard from './ProductCard';

const CollectionContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
`;

const PLP = ({ products }) => {
  console.log(products);
  return (
    <CollectionContainer>
      {products.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </CollectionContainer>
  );
};

export default PLP;
