import { ProductInput } from '~generated/graphql';

import BaseDataSource from './base';

class ProductAPI extends BaseDataSource {
  async createProduct(input: ProductInput) {
    const { prisma } = this.context!;
    const { name, options, tags } = input;
    const newProduct = await prisma.product.create({
      data: {
        name,
        options: BaseDataSource.connectOrCreate(options),
        tags: BaseDataSource.connectOrCreate(tags),
      },
      include: {
        tags: true,
        options: true,
      },
    });

    return newProduct;
  }

  async getAllProducts() {
    const { prisma } = this.context!;
    const products = await prisma.product.findMany({
      include: { tags: true, options: true },
    });
    return products;
  }
}

export default ProductAPI;
