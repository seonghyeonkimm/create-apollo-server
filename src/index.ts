import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';
import {
  ApolloServer,
  AuthenticationError,
  PubSub,
  UserInputError,
} from 'apollo-server';
import dotenv from 'dotenv';
import path from 'path';

import createDataSources from './datasources';
import createDBConnection, { ModelStaticType } from './models';
import resolvers from './resolvers';

export type TContext = {
  pubsub: PubSub;
  models: ModelStaticType;
  dataSources: ReturnType<typeof createDataSources>;
};

// environment variables
dotenv.config({
  path:
    process.env.NODE_ENV === 'production'
      ? '.env.production'
      : process.env.NODE_ENV === 'test'
      ? '.env.test'
      : '.env',
});

const db = createDBConnection();

const schema = loadSchemaSync(path.join(__dirname, 'schemas/schema.graphql'), {
  loaders: [new GraphQLFileLoader()],
});

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
});

export const server = new ApolloServer({
  dataSources: createDataSources,
  schema: schemaWithResolvers,
  context: {
    models: db.models,
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
  },
});

if (process.env.NODE_ENV !== 'test') {
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}
