import type { ApolloServerPlugin } from 'apollo-server-plugin-base';
import chalk from 'chalk';
import util from 'util';

import type { TContext } from '../server';

const LoggingPlugin = {
  requestDidStart({ request }) {
    // ignore graphiql playground request
    if (request.operationName === 'IntrospectionQuery') return {};

    console.log(chalk.underline('Request started:'), chalk.inverse(new Date()));
    console.log(chalk.bgCyan('Query:\n'), request.query);

    return {
      willSendResponse({ response }) {
        const { errors, data } = response;
        if (errors) {
          console.log(
            chalk.bgRed('Error:\n'),
            util.inspect(errors, { depth: 4 }),
          );
          return;
        }

        console.log(
          chalk.bgGreen('Response:\n'),
          util.inspect(data, { depth: 4 }),
        );
      },
    };
  },
} as ApolloServerPlugin<TContext>;

export default LoggingPlugin;
