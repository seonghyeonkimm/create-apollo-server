import { PrismaClient } from '@prisma/client';
import { DataSourceConfig } from 'apollo-datasource';
import { TContext } from 'server';

import ProductAPI from './product';

describe('[DataSource.Product]', () => {
  let productAPI: ProductAPI | undefined;

  beforeAll(() => {
    productAPI = new ProductAPI();
    productAPI.initialize({
      context: { prisma: new PrismaClient() },
    } as DataSourceConfig<TContext>);
  });

  describe('[createProduct]', () => {
    let tagId: number | undefined;

    it('should return new Product', async () => {
      const result = await productAPI?.createProduct({ name: 'New product' });

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('name');
    });

    it('should return new Product with ProductOptions', async () => {
      const result = await productAPI?.createProduct({
        name: 'New product with newly created options',
        options: [
          {
            name: 'Option 1',
          },
        ],
      });

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('options');
    });

    it('should return new Product with newly created ProductTags', async () => {
      const result = await productAPI?.createProduct({
        name: 'New product with newly created tags',
        tags: [
          {
            name: 'Tag 1',
          },
        ],
      });

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('tags');
      tagId = result?.tags[0].id;
    });

    it('should return new Product with exsisting ProductTags', async () => {
      const result = await productAPI?.createProduct({
        name: 'New product with newly created tags',
        tags: [
          {
            id: tagId,
            name: 'Tag 1',
          },
        ],
      });

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('tags');
      expect((result?.tags || [])[0]).toHaveProperty('id', tagId);
    });
  });

  describe('[getAllProducts]', () => {
    it('should return products', async () => {
      const result = await productAPI?.getAllProducts();

      expect(result).toHaveProperty('length');
    });
  });
});
