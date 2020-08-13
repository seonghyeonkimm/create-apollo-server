import { mergeResolvers } from '@graphql-tools/merge';

import Product from './product';

const resolvers = [
  Product,
];

export default mergeResolvers(resolvers);
