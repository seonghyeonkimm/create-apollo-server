import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';
import {
  ApolloServer,
  AuthenticationError,
  PubSub,
  UserInputError,
} from 'apollo-server';
import chalk from 'chalk';
import dotenv from 'dotenv';
import path from 'path';
import Umzug from 'umzug';

import createDataSources from './datasources';
import createDBConnection, { ModelStaticType } from './models';
import resolvers from './resolvers';

export type TContext = {
  pubsub: PubSub;
  models: ModelStaticType;
  dataSources: ReturnType<typeof createDataSources>;
};

// environment variables
dotenv.config();

const db = createDBConnection();

const umzug = new Umzug({
  storage: 'sequelize',
  storageOptions: {
    sequelize: db,
  },
  migrations: {
    path: './migrations',
    params: [db.getQueryInterface(), db.constructor],
  },
});

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

(async () => {
  if (process.env.NODE_ENV === 'test') return;
  const pending = await umzug.pending();
  if (pending.length > 0) {
    console.log();
    console.error(
      `${chalk.red(
        `${pending.length} pending migrations`,
      )} exists. Run ${chalk.green('yarn migrate')} before starting server 🚀`,
    );
    return;
  }

  const { url } = await server.listen();
  console.log(`Server ready at ${url} 🚀`);
})();
