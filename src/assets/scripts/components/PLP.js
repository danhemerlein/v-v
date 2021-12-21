import React, { useState } from 'react';
import styled from 'styled-components';
import { above, remHelper } from '../styles/utilities';
import ProductCard from './ProductCard';

const Wrapper = styled.main`
  padding: ${remHelper[16]};
`;

const ProductGrid = styled.ul`
  list-style: none;
  display: grid;
  ${'' /* grid-template-columns: repeat(2, 1fr); */}
  grid-template-columns: repeat(auto-fit, minmax(200px,1fr));
  column-gap: ${remHelper[16]};

  ${above.mobile`
    ${'' /* grid-template-columns: repeat(3, 1fr); */}
  `};
`;

const StyledParagaph = styled.p`
  margin-top: ${remHelper[16]};
`;

const StyledSelect = styled.select`
  ${'' /* min-width: 150px; */}
  width: 100%;
  padding: ${remHelper[12]};
  text-align: left;
  cursor: pointer;
  background-color: #fff;
  background-image: url("data:image/svg+xml;utf8,<svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><polygon fill='currentColor' points='7 10 12 15 17 10'/></svg>");
  background-repeat: no-repeat;
  background-size: 24px;
  border: solid 1px #000;
  border-radius: 2px;
  background-position-y: center;
  background-position-x: calc(100% - 10px);
  -webkit-appearance: none;

  &:focus {
    outline: solid 2px #000;
    outline-offset: 2px;
  }
`;

const PLP = ({ products }) => {
  const [activeProducts, setActiveProducts] = useState(products);

  const handleSortChange = (e) => {
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
  };

  console.log('active products', activeProducts);

  return (
    <Wrapper>
      <StyledSelect onChange={handleSortChange}>
        <option value="">sort by</option>
        <option value="a-z">A - Z</option>
        <option value="z-a">Z - A</option>
        <option value="low-high">Price Low to High</option>
        <option value="high-low">Price High to Low</option>
      </StyledSelect>

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
