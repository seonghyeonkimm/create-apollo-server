import { ApolloServer, gql } from 'apollo-server';
import ProductAPI from './datasources/product';

const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    tags: [Tag]!
    options: [ProductOption]!
  }

  type ProductOption {
    id: ID!
    name: String!
    productId: ID!
  }

  type Tag {
    id: ID!
    name: String!
    productId: ID!
  }

  type Query {
    products: [Product]!
  }

  input ProductInput {
    name: String!
  }

  type Mutation {
    createProduct(input: ProductInput): Product!
  }
`;

const resolvers = {
  Query: {
    products: async (parent: any, args: any, { dataSources }: any) => {
      return await dataSources.productAPI.getAllProducts();
    },
  },
  Mutation: {
    createProduct: async (_: any, args: any, { dataSources }: any) => {
      return await dataSources.productAPI.createProduct(args.input);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { contextData: 1 },
  dataSources: () => {
    return {
      productAPI: new ProductAPI(),
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
