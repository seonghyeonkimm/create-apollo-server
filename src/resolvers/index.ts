import { QueryResolvers, MutationResolvers } from '../generated/graphql';

export default {
  Query: {
    products: async (_, __, { dataSources }) => {
      return await dataSources.productAPI.getAllProducts();
    },
  },
  Mutation: {
    createProduct: async (_, args, { dataSources }) => {
      if (!args.input) return [];

      return await dataSources.productAPI.createProduct(args.input);
    },
  },
} as { Query: QueryResolvers; Mutation: MutationResolvers; }
