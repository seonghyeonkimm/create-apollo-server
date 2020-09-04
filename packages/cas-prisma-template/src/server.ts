import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';
import { PrismaClient } from '@prisma/client';
import {
  ApolloServer,
  AuthenticationError,
  PubSub,
  UserInputError,
} from 'apollo-server';
import dotenv from 'dotenv';
import path from 'path';

import createDataSources from './datasources';
import createPlugins from './plugins';
import resolvers from './resolvers';

export type TContext = {
  pubsub: PubSub;
  prisma: PrismaClient;
  dataSources: ReturnType<typeof createDataSources>;
};

// environment variables
dotenv.config();

const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === 'production'
      ? undefined
      : ['query', 'info', 'warn', 'error'],
});

const schema = loadSchemaSync(path.join(__dirname, 'schemas/schema.graphql'), {
  loaders: [new GraphQLFileLoader()],
});

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
});

export const server = new ApolloServer({
  plugins: createPlugins(),
  schema: schemaWithResolvers,
  dataSources: createDataSources,
  context: {
    prisma,
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

(async () => {
  if (process.env.NODE_ENV === 'test') return;

  const { url } = await server.listen();
  console.log(`Server ready at ${url} 🚀`);
})();
