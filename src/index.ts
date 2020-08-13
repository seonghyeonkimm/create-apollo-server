import { ApolloServer, gql } from 'apollo-server';

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
`;

const products = [
  {
    id: 1,
    name: 'Product 1',
    tags: [],
    options: [],
  },
  {
    id: 2,
    name: 'Product 2',
    tags: [],
    options: [],
  },
];

const resolvers = {
  Query: {
    products: () => products,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
