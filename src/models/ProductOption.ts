import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface ProductOptionAttributes {
  id: number;
  name: string;
  productId: number;
}

type ProductOptionCreateAttributes = Optional<ProductOptionAttributes, 'id'>;

export class ProductOption extends Model<
  ProductOptionAttributes,
  ProductOptionCreateAttributes
> {
  public id!: number;
  public name!: string;
  public productId!: number;

  public readonly craetedAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

export default (sequelize: Sequelize) => {
  ProductOption.init(
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      productId: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: 'ProductOption',
    },
  );

  return ProductOption;
};
