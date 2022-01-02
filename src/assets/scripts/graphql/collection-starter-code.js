import sendQuery from './index';

export async function getAllProducts(collectionHandle) {
  const query = `
        {
          collectionByHandle(handle: \"${collectionHandle}\") {
            products(first: 50) {
              edges {
                node {
                  id
                  handle
                  title
                  createdAt
                  options {
                    name
                    values
                  }
                  variants(first: 50) {
                    edges {
                      node {
                        id
                        price
                        compareAtPrice
                        availableForSale
                        image {
                          src
                        }
                        selectedOptions {
                          name
                          value
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        `;
  const { data } = await sendQuery(query);
  if (data && data.data) {
    const products = data?.data?.collectionByHandle?.products?.edges.map(
      ({ node }, key) => {
        const product = { ...node };

        product.variants = node.variants.edges.map(({ node }) => ({ ...node }));

        const optionsDict = {};

        product.options.map((option) => {
          optionsDict[option.name] = option.values;
        });

        product.options = optionsDict;

        let prices = [];

        product.variants.map((variant) => {
          const options = variant.selectedOptions;
          const price = variant.price;
          prices.push(price);

          const dict = {};

          options.map((vari) => {
            dict[vari.name] = vari.value;
          });

          variant.selectedOptions = dict;
        });

        product.priceRange = [
          prices.sort()[0],
          prices.sort()[prices.length - 1],
        ];

        product.defaultOrder = key;

        return product;
      }
    );

    return products;
  }
  return [];
}

export async function getCollection(collectionHandle) {
  const query = `
  {
    collections(first:5) {
      edges {
        node {
          title
          handle
          image {
            src
          }
        }
      }
    }
  }
  `;

  const { data } = await sendQuery(query);

  if (data && data.data) {
    const collections = data?.data?.collections?.edges.map(({ node }) => {
      const col = { ...node };

      return col;
    });

    return collections.filter((col) => col.handle === collectionHandle);
  }

  return [];
}
