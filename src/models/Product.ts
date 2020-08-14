import createOrGetSequelize from './db';

import { DataTypes, Model, Optional } from 'sequelize';

interface ProductAttributes {
  id: number;
  name: string;
}

type ProductCreationAttributes = Optional<ProductAttributes ,'id'>

class Product extends Model<ProductAttributes, ProductCreationAttributes> {
  public id!: number;
  public name!: string;

  public readonly craetedAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Product.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER.UNSIGNED,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize: createOrGetSequelize(),
  paranoid: true,
  modelName: 'Product',
});

export default Product;
