import { DataSource, DataSourceConfig } from 'apollo-datasource';

import Product from '../models/Product';
import { TContext } from '..';
import { ProductInput } from '../generated/graphql';

class ProductAPI extends DataSource<TContext> {
  private context: TContext | undefined;

  initialize(config: DataSourceConfig<TContext>) {
    this.context = config.context;
  }

  async createProduct(input: ProductInput) {
    const newProduct = await Product.create(input);
    return newProduct;
  }

  async getAllProducts() {
    const products = await Product.findAll();
    return products;
  }
}

export default ProductAPI;
