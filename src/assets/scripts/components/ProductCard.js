import React, { useState } from 'react';
import styled from 'styled-components';
import { above } from '../styles/utilities';

const Card = styled.div`
  width: 50%;

  ${above.desktop`
  width: 33.33%;
  `}
`;

const Image = styled.img`
  width: 100%;
`;

const ProductCard = ({ product }) => {
  const [activeVariant, setActiveVariant] = useState(product.variants[0]);
  return (
    <Card>
      <Image src={activeVariant.image.src} alt={product.title} />
      <p>{product.title}</p>
      <p>{activeVariant.price}</p>
    </Card>
  );
};
export default ProductCard;
