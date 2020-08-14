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
    const { name, productOptions } = input;

    const newProduct = await Product.create(
      {
        name,
        ...(productOptions &&
          productOptions.length > 0 && {
            productOptions: productOptions,
          }),
      },
      { include: [Product.associations.productOptions] },
    );

    return newProduct;
  }

  async getAllProducts() {
    const products = await Product.findAll();
    return products;
  }
}

export default ProductAPI;
