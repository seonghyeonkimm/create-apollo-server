import { queryField } from '@nexus/schema';

export const products = queryField('products', {
  type: 'ProductConnection',
  description: 'Return Product Connections',
  resolve: async (_, args, { dataSources }) => {
    return await dataSources.productAPI.getAllProducts();
  },
});
