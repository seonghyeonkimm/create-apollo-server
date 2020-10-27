import ProductAPI from './product';

export type TDatasource = {
  productAPI: ProductAPI;
};

export default () => {
  return {
    productAPI: new ProductAPI(),
  };
};
