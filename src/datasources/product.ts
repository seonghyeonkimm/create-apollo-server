import { DataSource, DataSourceConfig } from 'apollo-datasource';

import Product from '../models/Product';

type TContext = any;
class ProductAPI extends DataSource<TContext> {
  private context: TContext;

  constructor() {
    super();
  }

  initialize(config: DataSourceConfig<TContext>) {
    this.context = config.context;
  }

  async createProduct(input: any) {
    const theProduct = await Product.create(input);
    return theProduct;
  }

  async getAllProducts() {
    const products = await Product.findAll();
    return products;
  }
}

export default ProductAPI;
