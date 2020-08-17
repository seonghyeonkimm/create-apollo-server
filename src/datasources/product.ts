/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { DataSource, DataSourceConfig } from 'apollo-datasource';

import { TContext } from '..';
import { ProductInput } from '../generated/graphql';

class ProductAPI extends DataSource<TContext> {
  private context: TContext | undefined;

  initialize(config: DataSourceConfig<TContext>) {
    this.context = config.context;
  }

  async createProduct(input: ProductInput) {
    const { Product, ProductTag } = this.context!.models;
    const { name, options, tags } = input;

    const newProduct = await Product.create(
      {
        name,
        ...(options &&
          options.length > 0 && {
            options,
          }),
      },
      {
        include: [Product.associations.tags, Product.associations.options],
      },
    );

    if (tags && tags.length > 0) {
      const tagIds = await Promise.all(
        tags.map(async (tag) => {
          if (tag?.id) return Promise.resolve(tag.id);
          if (!tag?.name) return;
          const newTag = await ProductTag.create({ name: tag?.name });
          return newTag.id;
        }),
      );

      const ids = tagIds.filter(Boolean) as number[];
      await newProduct.addTags(ids);
      await newProduct.reload();
    }

    return newProduct;
  }

  async getAllProducts() {
    const { Product } = this.context!.models;
    const products = await Product.findAll();
    return products;
  }
}

export default ProductAPI;
