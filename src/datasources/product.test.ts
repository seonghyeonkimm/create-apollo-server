import ProductAPI from "./product";

describe('[DataSource.Product]' , () => {
  describe('[createProduct]', () => {
    it('should return new Product', async () => {
      const productAPI = new ProductAPI();
      const result = await productAPI.createProduct({ name: 'Product 1' });

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('name');
    });
  })

  describe('[getAllProducts]', () => {
    it('should return products', async () => {
      const productAPI = new ProductAPI();
      const result = await productAPI.getAllProducts();

      expect(result).toHaveProperty('length');
    });
  })
});
