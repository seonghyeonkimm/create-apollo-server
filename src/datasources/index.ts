import ProductAPI from './product';

export default () => {
  return {
    productAPI: new ProductAPI(),
  };
}
