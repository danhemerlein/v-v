import axios from "axios";

const accessToken = '2b508ca600077d3c9ea23b0650880a6e';
const store = document.firstElementChild.dataset.shop;
const locale = document.firstElementChild.lang;

const headers = {
  'Content-Type': 'application/json',
  'X-Shopify-Storefront-Access-Token': accessToken,
  'Accept': 'application/json',
  'Accept-Language': locale,
};

const sendQuery = (query, variables = {}) => {
  const body = JSON.stringify({
    query,
    variables,
  });

  return axios({
    headers,
    method: 'post',
    data: body,
    url: `https://${store}.myshopify.com/api/2021-07/graphql`,
  })
}

export default sendQuery;
