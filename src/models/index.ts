import { Dialect, Model, ModelCtor, Sequelize } from 'sequelize';

import initProduct, { Product } from './Product';
import initiProductOption, { ProductOption } from './ProductOption';
import initProductTag, { ProductTag } from './ProductTag';

let sequelize: Sequelize | undefined;
const MODELS = [initProduct, initProductTag, initiProductOption];
export type ModelStaticType = {
  Product: typeof Product;
  ProductTag: typeof ProductTag;
  ProductOption: typeof ProductOption;
};

export default () => {
  if (sequelize) return sequelize;

  sequelize = new Sequelize({
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    dialect: process.env.DATABASE_DIALECT as Dialect,
  });

  MODELS.forEach((initModel) => {
    if (!sequelize) return;
    initModel(sequelize);
  });

  const models = sequelize.models;
  Object.keys(models).forEach((key) => {
    const model = models[key] as ModelCtor<Model> & {
      associate: (models: unknown) => void;
    };
    if (!model.associate) return;
    model.associate(models);
  });

  return sequelize;
};
