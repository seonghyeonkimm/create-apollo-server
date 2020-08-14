import ProductAPI from './product';

describe('[DataSource.Product]', () => {
  describe('[createProduct]', () => {
    it('should return new Product', async () => {
      const productAPI = new ProductAPI();
      const result = await productAPI.createProduct({ name: 'New product' });

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('name');
    });

    it('should return new Product with ProductOptions', async () => {
      const productAPI = new ProductAPI();
      const result = await productAPI.createProduct({
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
      const productAPI = new ProductAPI();
      const result = await productAPI.createProduct({
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
    });

    it('should return new Product with exsisting ProductTags', async () => {
      const productAPI = new ProductAPI();
      const result = await productAPI.createProduct({
        name: 'New product with newly created tags',
        tags: [
          {
            id: 1,
          },
        ],
      });

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('tags');
      expect((result.tags || [])[0]).toHaveProperty('id', 1);
    });
  });

  describe('[getAllProducts]', () => {
    it('should return products', async () => {
      const productAPI = new ProductAPI();
      const result = await productAPI.getAllProducts();

      expect(result).toHaveProperty('length');
    });
  });
});
