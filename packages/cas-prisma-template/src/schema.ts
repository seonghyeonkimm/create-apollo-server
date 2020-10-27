import { makeSchema } from '@nexus/schema';
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema';
import path from 'path';

import * as types from './types';

const nexsusSchema = makeSchema({
  types,
  plugins: [nexusSchemaPrisma()],
  shouldGenerateArtifacts: !process.env.NODE_ENV,
  outputs: {
    schema: path.join(__dirname, 'generated/schema.gen.graphql'),
    typegen: path.join(__dirname, 'generated/nexusTypes.gen.ts'),
  },
  typegenAutoConfig: {
    contextType: 'Context.TContext',
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
  },
});

export default nexsusSchema;
