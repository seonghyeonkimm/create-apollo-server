import { DataSource, DataSourceConfig } from 'apollo-datasource';

import { TContext } from '..';
import Product from '../models/Product';
import { ProductInput, ProductOptionInput } from '../generated/graphql';

class ProductAPI extends DataSource<TContext> {
  private context: TContext | undefined;

  initialize(config: DataSourceConfig<TContext>) {
    this.context = config.context;
  }

  async createProduct(input: ProductInput) {
    const { name, productOptions } = input;

    const { newProductOptions, exsistingProductOptions } = (productOptions || []).reduce((result, nextOption) => {
      if (!nextOption) return result;

      if (nextOption.id) {
        result.exsistingProductOptions.push(nextOption)
        return result;
      }

      result.newProductOptions.push(nextOption);
      return result;
    }, {
      newProductOptions: [] as ProductOptionInput[],
      exsistingProductOptions: [] as ProductOptionInput[],
    });

    const newProduct = await Product.create({
      name,
      ...(newProductOptions.length > 0 && {
        productOptions: newProductOptions,
      })
    }, { include: [Product.associations.productOptions]})

    if (exsistingProductOptions.length > 0) {
      const promises = exsistingProductOptions.map(async (productOption) => {
        if (!productOption.id) return;

        await newProduct.addProductOptions(productOption.id)
      });

      await Promise.all(promises)
      await newProduct.reload();
    }

    return newProduct;
  }

  async getAllProducts() {
    const products = await Product.findAll();
    return products;
  }
}

export default ProductAPI;
