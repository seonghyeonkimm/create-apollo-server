import type { NexusGenInputs } from '~generated/nexusTypes.gen';

import BaseDataSource from './base';

class ProductAPI extends BaseDataSource {
  async createProduct(input: NexusGenInputs['ProductInput']) {
    const { prisma } = this.context!;
    const { name, options, tags } = input;
    const newProduct = await prisma.product.create({
      data: {
        name,
        tags: BaseDataSource.connectOrCreate(tags),
        options: BaseDataSource.connectOrCreate(options),
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
    return { results: products, cursor: null };
  }
}

export default ProductAPI;
