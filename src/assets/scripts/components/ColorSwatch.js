import React from 'react';

const ColorSwatch = ({ productOptions }) => {
  const colorOption = productOptions.filter((option) => {
    return option.name === 'Color';
  });

  console.log(colorOption);

  const { values } = colorOption[0];

  console.log(values);

  return (
    <>
      {values.map((value) => {
        return <p>{value}</p>;
      })}
    </>
  );
};
export default ColorSwatch;
