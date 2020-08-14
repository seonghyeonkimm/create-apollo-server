import { DataSource, DataSourceConfig } from 'apollo-datasource';

import { TContext } from '..';
import Product from '../models/Product';
import { ProductInput } from '../generated/graphql';

class ProductAPI extends DataSource<TContext> {
  private context: TContext | undefined;

  initialize(config: DataSourceConfig<TContext>) {
    this.context = config.context;
  }

  async createProduct(input: ProductInput) {
    const { name, productOptions, tags } = input;

    const newProduct = await Product.create(
      {
        name,
        ...(productOptions &&
          productOptions.length > 0 && {
            productOptions,
          }),
        ...(tags &&
          tags.length > 0 && {
            tags,
          }),
      },
      {
        include: [
          Product.associations.productOptions,
          Product.associations.tags,
        ],
      },
    );

    return newProduct;
  }

  async getAllProducts() {
    const products = await Product.findAll();
    return products;
  }
}

export default ProductAPI;
