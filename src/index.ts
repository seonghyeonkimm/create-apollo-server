import dotenv from 'dotenv';

// environment variables
dotenv.config();

import path from 'path';
import { ApolloServer, AuthenticationError, UserInputError } from 'apollo-server';
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
  engine: {
    graphVariant: 'current',
    reportSchema: !!process.env.APOLLO_KEY,
    rewriteError: (error) => {
      if (
        error instanceof AuthenticationError ||
        error instanceof UserInputError
      ) {
        return null;
      }

      return error;
    },
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
