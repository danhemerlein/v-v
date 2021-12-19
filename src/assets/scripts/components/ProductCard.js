import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { remHelper } from '../styles/utilities';
import ColorSwatch from './ColorSwatch';
import ProductPrice from './ProductPrice';

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

const ProductCard = ({ product }) => {
  const [activeVariant, setActiveVariant] = useState(product.variants[0]);
  const [hasColors, setHasColors] = useState(false);

  useEffect(() => {
    const colorOption = product.options
      .map((option) => option.name === 'Color')
      .includes(true);

    setHasColors(colorOption);
  }, []);

  return (
    <Card>
      <Image src={activeVariant.image.src} alt={product.title} />

      <TitleParagraph>{product.title}</TitleParagraph>

      <ProductPrice variant={activeVariant} />

      {hasColors && <ColorSwatch productOptions={product.options} />}
    </Card>
  );
};
export default ProductCard;
