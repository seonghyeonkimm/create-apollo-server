import { gql, GraphQLClient } from 'graphql-request';

describe('[Resolver.Product]', () => {
  let client: GraphQLClient | undefined;

  beforeAll(() => {
    client = new GraphQLClient(global.testHost);
  });

  describe('[Query.createProduct]', () => {
    it('return new Product', async () => {
      const response = await client?.request(
        gql`
          mutation CreateProduct($input: ProductInput!) {
            createProduct(input: $input) {
              id
            }
          }
        `,
        { input: { name: 'New Product' } },
      );

      expect(response).toHaveProperty('createProduct');
      expect(response.createProduct).toHaveProperty('id');
    });
  });

  describe('[Query.products]', () => {
    it('return products', async () => {
      const response = await client?.request(gql`
        query Products {
          products {
            results {
              id
            }
          }
        }
      `);

      expect(response.products).toHaveProperty('results');
    });
  });
});
