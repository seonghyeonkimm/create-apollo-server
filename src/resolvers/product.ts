import { Resolvers } from '../generated/graphql';
import { UserInputError } from 'apollo-server';

const resolver: Resolvers = {
  Query: {
    products: async (_, __, { dataSources }) => {
      return await dataSources.productAPI.getAllProducts();
    },
  },
  Mutation: {
    createProduct: async (_, args, { pubsub, dataSources }) => {
      if (!args.input) {
        throw new UserInputError('input arguments is required');
      }

      const newProduct = await dataSources.productAPI.createProduct(args.input);
      pubsub.publish(PRODUCT_ADDED, { productAdded: newProduct });
      return newProduct;
    },
  },
  Subscription: {
    productAdded: {
      subscribe: (_, args, { pubsub }) => pubsub.asyncIterator([PRODUCT_ADDED]),
    },
  },
};

// Subscription event labels
const PRODUCT_ADDED = 'PRODUCT_ADDED';

export default resolver;
