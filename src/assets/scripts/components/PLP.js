import React, { useState } from 'react';
import styled from 'styled-components';
import { above, remHelper } from '../styles/utilities';
import ProductCard from './ProductCard';
import Select from './Select';

const Wrapper = styled.main`
  padding: ${remHelper[16]};
`;

const SortContainer = styled.div`
  display: flex;

  ${above.mobile`
    justify-content: flex-end;
  `};
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

const StyledParagaph = styled.p`
  margin-top: ${remHelper[16]};
`;

const PLP = ({ products }) => {
  const [activeProducts, setActiveProducts] = useState(products);

  const handleSortChange = (e) => {
    if (e.target.value === '') {
      setActiveProducts([...products]);
    }

    if (e.target.value === 'a-z') {
      const sorted = activeProducts.sort((a, b) => {
        if (a.handle < b.handle) {
          return -1;
        }
        if (a.handle > b.handle) {
          return 1;
        }
        return 0;
      });

      setActiveProducts([...sorted]);
    }

    if (e.target.value === 'z-a') {
      const sorted = activeProducts.sort((a, b) => {
        if (a.handle < b.handle) {
          return 1;
        }
        if (a.handle > b.handle) {
          return -1;
        }
        return 0;
      });

      setActiveProducts([...sorted]);
    }

    if (e.target.value === 'low-high') {
      const sorted = activeProducts.sort((a, b) => {
        if (a.priceRange[0] < b.priceRange[0]) {
          return -1;
        }
        if (a.priceRange[0] > b.priceRange[0]) {
          return 1;
        }
        return 0;
      });

      setActiveProducts([...sorted]);
    }

    if (e.target.value === 'high-low') {
      const sorted = activeProducts.sort((a, b) => {
        if (a.priceRange[0] < b.priceRange[0]) {
          return 1;
        }
        if (a.priceRange[0] > b.priceRange[0]) {
          return -1;
        }
        return 0;
      });

      setActiveProducts([...sorted]);
    }
  };

  console.log('active products', activeProducts);

  return (
    <Wrapper>
      <SortContainer>
        <Select onChange={handleSortChange}>
          <option value="">sort by</option>
          <option value="a-z">A - Z</option>
          <option value="z-a">Z - A</option>
          <option value="low-high">Price Low to High</option>
          <option value="high-low">Price High to Low</option>
        </Select>
      </SortContainer>

      <StyledParagaph>{activeProducts.length} results</StyledParagaph>

      <ProductGrid>
        {activeProducts.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </ProductGrid>
    </Wrapper>
  );
};

export default PLP;
