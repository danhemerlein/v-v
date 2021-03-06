import React, { useState } from 'react';
import styled from 'styled-components';
import { above, COLORS, remHelper } from '../styles/utilities';
import ProductCard from './ProductCard';
import Select from './Select';

const Wrapper = styled.main`
  padding: 0 ${remHelper[16]} ${remHelper[16]} ${remHelper[16]};
`;

const Headline = styled.h1`
  color: ${COLORS.White};
  background: ${COLORS.Black};
  margin-bottom: ${remHelper[16]};
`;

const Hero = styled.div`
  width: 100%;
  height: 420px;
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  ${({ src }) => `background-image: url(${src});`};
`;

const SortContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  margin-top: ${remHelper[16]};

  ${above.mobile`
    justify-content: space-between;
    flex-direction: row-reverse;
    align-items: center;
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

  ${above.mobile`
    margin-top: 0;
  `};
`;

const PLP = ({ products, collection }) => {
  const [activeProducts, setActiveProducts] = useState(products);

  console.log(products);

  const handleSortChange = (e) => {
    if (e.target.value === '') {
      const sorted = activeProducts.sort((a, b) => {
        return a.defaultOrder - b.defaultOrder;
      });

      console.log(sorted);

      setActiveProducts([...sorted]);
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

  const { image, title } = collection;

  return (
    <Wrapper>
      <Hero src={image.src}>
        <Headline>
          &nbsp;
          {title}
          &nbsp;
        </Headline>
      </Hero>

      <SortContainer>
        <Select onChange={handleSortChange}>
          <option value="">sort by</option>
          <option value="a-z">A - Z</option>
          <option value="z-a">Z - A</option>
          <option value="low-high">Price Low to High</option>
          <option value="high-low">Price High to Low</option>
        </Select>

        <StyledParagaph>{activeProducts.length} results</StyledParagaph>
      </SortContainer>

      <ProductGrid>
        {activeProducts.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </ProductGrid>
    </Wrapper>
  );
};

export default PLP;
