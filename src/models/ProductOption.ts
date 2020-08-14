import createOrGetSequelize from './db';

import { DataTypes, Model, Optional } from 'sequelize';

interface ProductOptionAttributes {
  id: number;
  name: string;
  productId: number;
}

type ProductOptionCreateAttributes = Optional<ProductOptionAttributes ,'id'>

class ProductOption extends Model<ProductOptionAttributes, ProductOptionCreateAttributes> {
  public id!: number;
  public name!: string;
  public productId!: number;

  public readonly craetedAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

ProductOption.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER.UNSIGNED,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  productId: {
    allowNull: false,
    type: DataTypes.INTEGER.UNSIGNED,
  },
}, {
  sequelize: createOrGetSequelize(),
  paranoid: true,
  modelName: 'ProductOption',
});

export default ProductOption;
