import sendQuery from './index';

export default async function getAllProducts(collectionHandle) {
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
      ({ node }) => {
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
          prices.sort()[prices.sort().length - 1],
        ];

        return product;
      }
    );

    return products;
  }
  return [];
}
