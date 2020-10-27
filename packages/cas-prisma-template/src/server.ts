import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';
import {
  ApolloServer,
  AuthenticationError,
  UserInputError,
} from 'apollo-server';
import path from 'path';

import createContext from './context';
import createDataSources from './datasources';
import createPlugins from './plugins';
import resolvers from './resolvers';

const schema = loadSchemaSync(path.join(__dirname, 'schemas/schema.graphql'), {
  loaders: [new GraphQLFileLoader()],
});

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
});

const server = new ApolloServer({
  context: createContext,
  plugins: createPlugins(),
  schema: schemaWithResolvers,
  dataSources: createDataSources,
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

export default server;
