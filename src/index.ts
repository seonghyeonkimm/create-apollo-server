import path from 'path';
import { ApolloServer } from 'apollo-server';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';

import ProductAPI from './datasources/product';

const schema = loadSchemaSync(
  path.join(__dirname, 'schemas/schema.graphql'),
  { loaders: [new GraphQLFileLoader()] },
);

const resolvers = {
  Query: {
    products: async (_: any, __: any, { dataSources }: any) => {
      return await dataSources.productAPI.getAllProducts();
    },
  },
  Mutation: {
    createProduct: async (_: any, args: any, { dataSources }: any) => {
      return await dataSources.productAPI.createProduct(args.input);
    },
  },
};

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
});

const server = new ApolloServer({
  schema: schemaWithResolvers,
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
