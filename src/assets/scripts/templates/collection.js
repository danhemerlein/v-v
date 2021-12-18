import '../theme';
import '../../styles/templates/collection.scss';
import getAllProducts from '../graphql/collection-starter-code';

import ReactDOM from "react-dom"
import React from "react"
import  PLP  from "../components/PLP"




// getAllProducts('test-collection') => returns a Promise, which resolves to an Array of Product Objects

// Your Code Here


const init = async () => {
  const products = await getAllProducts('test-collection');
  console.log(products)
  return products;
}


document.addEventListener("DOMContentLoaded", function() {
  init()

  const rootEl = document.getElementById("react-plp")

  console.log(rootEl)

  rootEl && ReactDOM.render(<PLP />, rootEl)

});
