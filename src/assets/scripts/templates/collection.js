import '../theme';
import '../../styles/templates/collection.scss';
import getAllProducts from '../graphql/collection-starter-code';

import ReactDOM from 'react-dom';
import React from 'react';
import PLP from '../components/PLP';

// getAllProducts('test-collection') => returns a Promise, which resolves to an Array of Product Objects

// Your Code Here

document.addEventListener('DOMContentLoaded', async function () {
  const products = await getAllProducts('test-collection');

  const root = document.getElementById('react-plp');

  root && ReactDOM.render(<PLP products={products} />, root);
});
