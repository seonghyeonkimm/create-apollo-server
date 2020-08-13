import { Resolvers } from "../generated/graphql";

const resolver: Resolvers = {
  Query: {
    products: async (_, __, { dataSources }) => {
      return await dataSources.productAPI.getAllProducts();
    },
  },
  Mutation: {
    createProduct: async (_, args, { dataSources }) => {
      if (!args.input) {
        throw new Error('input arguments is required');
      }

      return await dataSources.productAPI.createProduct(args.input);
    },
  },
}

export default resolver;
