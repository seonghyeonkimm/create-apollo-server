import dotenv from 'dotenv';

import path from 'path';
import {
  ApolloServer,
  AuthenticationError,
  UserInputError,
  PubSub,
} from 'apollo-server';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';

import resolvers from './resolvers';
import dataSources from './datasources';

// environment variables
dotenv.config();

export type TContext = {
  pubsub: PubSub;
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

export const server = new ApolloServer({
  dataSources,
  schema: schemaWithResolvers,
  context: {
    pubsub: new PubSub(),
  },
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

if (process.env.NODE_ENV !== 'test') {
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}
