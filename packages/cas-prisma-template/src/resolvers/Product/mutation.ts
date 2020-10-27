import { arg, mutationField } from '@nexus/schema';

import { PRODUCT_ADDED } from './subscription';

export const createProduct = mutationField('createProduct', {
  type: 'Product',
  description: 'Create Product',
  args: {
    input: arg({
      nullable: false,
      type: 'ProductInput',
    }),
  },
  resolve: async (_, args, { dataSources, pubsub }) => {
    const newProduct = await dataSources.productAPI.createProduct(args.input);
    pubsub.publish(PRODUCT_ADDED, { productAdded: newProduct });
    return newProduct;
  },
});
