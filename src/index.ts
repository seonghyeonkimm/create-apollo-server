import path from 'path';
import { ApolloServer } from 'apollo-server';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';

import resolvers from './resolvers';
import ProductAPI from './datasources/product';

export type TContext = {
  dataSources: {
    productAPI: ProductAPI;
  }
}

const schema = loadSchemaSync(
  path.join(__dirname, 'schemas/schema.graphql'),
  { loaders: [new GraphQLFileLoader()] },
);

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
});

const server = new ApolloServer({
  schema: schemaWithResolvers,
  dataSources: () => {
    return {
      productAPI: new ProductAPI(),
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
