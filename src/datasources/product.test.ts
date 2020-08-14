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
        name: 'New product With newly created options',
        productOptions: [
          {
            name: 'Option 1',
          },
        ],
      });

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('productOptions');
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
