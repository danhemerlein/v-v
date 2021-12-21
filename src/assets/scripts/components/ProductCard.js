import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { remHelper } from '../styles/utilities';
import ColorSwatch from './ColorSwatch';
import ProductPrice from './ProductPrice';
import SizeSelector from './SizeSelector';

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

const getOption = (arr, str) => {
  return arr.map((option) => option.name === str).includes(true);
};

const ProductCard = ({ product }) => {
  const [activeVariant, setActiveVariant] = useState(product.variants[0]);
  const [buildVariant, setBuildVariant] = useState({});
  const [hasColors, setHasColors] = useState(false);
  const [hasSize, setHasSize] = useState(false);
  const [hasFit, setHasFit] = useState(false);
  const [hasWaist, setHasWaist] = useState(false);
  const [hasLength, setHasLength] = useState(false);

  const selectVariant = (newBuild) => {
    console.log(newBuild);

    const newVariant = product.variants.map((variant) => {
      _.isEqual(newBuild, variant.selectVariant);
    });

    setBuildVariant(newBuild);

    console.log(newVariant);
    // return newVariant;
  };

  const { options } = product;

  useEffect(() => {
    const colorOption = Object.keys(options).includes('Color');
    const sizeOption = Object.keys(options).includes('Size');
    const fitOption = Object.keys(options).includes('Fit');
    const waistOption = Object.keys(options).includes('Waist');
    const lengthOption = Object.keys(options).includes('Length');

    setHasSize(sizeOption);
    setHasFit(fitOption);
    setHasWaist(waistOption);
    setHasLength(lengthOption);
    setHasColors(colorOption);
  }, []);

  const handleSelectColor = (color) => {
    let dict = {};

    console.log(buildVariant.Size);

    if (buildVariant.Size) {
      dict = {
        ...buildVariant,
        Size: 'S',
        Color: color,
      };
    } else {
      dict = {
        ...buildVariant,
        Color: color,
      };
    }

    selectVariant(dict);
  };

  return (
    <Card>
      <Image src={activeVariant.image.src} alt={product.title} />

      <TitleParagraph>{product.title}</TitleParagraph>

      <ProductPrice variant={activeVariant} />

      {hasColors && (
        <ColorSwatch
          handleSelectColor={handleSelectColor}
          activeVariant={activeVariant}
          values={product.options.Color}
        />
      )}

      {hasSize && (
        <SizeSelector
          activeVariant={activeVariant}
          values={product.options.Size}
        />
      )}
    </Card>
  );
};
export default ProductCard;
