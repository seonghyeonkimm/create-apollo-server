import path from 'path';
import { ApolloServer } from 'apollo-server';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';

import resolvers from './resolvers';
import dataSources from './datasources';

export type TContext = {
  dataSources: ReturnType<typeof dataSources>;
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
  dataSources,
  schema: schemaWithResolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
