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
import createDBConnection, { ModelStaticType } from './models';
import createDataSources from './datasources';

export type TContext = {
  pubsub: PubSub;
  models: ModelStaticType;
  dataSources: ReturnType<typeof createDataSources>;
};

// environment variables
dotenv.config();

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
