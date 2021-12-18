import { css } from 'styled-components';

const sizes = {
  mobile: 720,
  desktop: 1024,
};

export const above = Object.keys(sizes).reduce((accumulater, label) => {
  accumulater[label] = (...args) => css`
    @media (min-width: ${sizes[label]}px) {
      ${css(...args)}
    }
  `;
  return accumulater;
}, {});

export const BREAKPOINT = {
  mobile: '720px',
  desktop: '1024px',
};
