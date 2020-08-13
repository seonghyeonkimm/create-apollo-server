import { GraphQLClient, gql } from 'graphql-request';

describe('[Product]' , () => {
  let client: GraphQLClient | undefined;

  beforeAll(() => {
    client = new GraphQLClient(global.testHost);
  });

  describe('[Query.createProduct]', () => {
    it('throw UserInputError when input is not provided', async () => {
      try {
        await client?.request(gql`
          mutation {
            createProduct {
              id
            }
          }
        `);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  })

  describe('[Query.products]', () => {
    it('return products', async () => {
      const response = await client?.request(gql`
        query {
          products {
            id
          }
        }
      `)

      expect(response).toHaveProperty('products');
    });
  });
});
