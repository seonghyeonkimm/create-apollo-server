import {
  ApolloServer,
  AuthenticationError,
  UserInputError,
} from 'apollo-server';

import createContext from './context';
import createDataSources from './datasources';
import createPlugins from './plugins';
import schema from './schema';

const server = new ApolloServer({
  schema,
  context: createContext,
  plugins: createPlugins(),
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
