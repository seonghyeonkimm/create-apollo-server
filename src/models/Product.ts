import createOrGetSequelize from './db';
import { DataTypes, Model, Optional } from 'sequelize';

interface ProductAttributes {
  id: number;
  name: string;
}

interface ProductCreationAttributes extends Optional<ProductAttributes ,'id'> {}

class Product extends Model<ProductAttributes, ProductCreationAttributes> {
  public id!: number;
  public name!: string;

  public readonly craetedAt!: Date;
  public readonly updatedAt!: Date;
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
  modelName: 'Product',
  sequelize: createOrGetSequelize(),
});

export default Product;
