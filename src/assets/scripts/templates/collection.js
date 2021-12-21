import React from 'react';
import ReactDOM from 'react-dom';
import '../../styles/templates/collection.scss';
import PLP from '../components/PLP';
import {
  getAllProducts,
  getCollection,
} from '../graphql/collection-starter-code';
import '../theme';

// getAllProducts('test-collection') => returns a Promise, which resolves to an Array of Product Objects

// Your Code Here

document.addEventListener('DOMContentLoaded', async function () {
  const products = await getAllProducts('test-collection');
  let collection = await getCollection('test-collection');

  [collection] = collection;

  const root = document.getElementById('react-plp');

  root &&
    ReactDOM.render(<PLP products={products} collection={collection} />, root);
});
