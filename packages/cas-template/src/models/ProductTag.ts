import {
  Association,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  Model,
  ModelStatic,
  Optional,
  Sequelize,
} from 'sequelize';

import { Product } from './Product';

interface ProductTagAttributes {
  id: number;
  name: string;
}

type ProductTagCreationAttributes = Optional<ProductTagAttributes, 'id'>;

export class ProductTag extends Model<
  ProductTagAttributes,
  ProductTagCreationAttributes
> {
  public id!: number;
  public name!: string;

  public readonly craetedAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  public getProducts!: HasManyGetAssociationsMixin<Product>;
  public addProducts!: HasManyAddAssociationMixin<Product, number>;

  public hasProducts!: HasManyHasAssociationMixin<Product, number>;

  public countProducts!: HasManyCountAssociationsMixin;
  public createProducts!: HasManyCreateAssociationMixin<Product>;

  // association types
  public readonly products?: Product[];

  public static associations: {
    products: Association<ProductTag, Product>;
  };

  public static associate(models: Record<string, ModelStatic<Model>>) {
    const { Product } = models;

    ProductTag.belongsToMany(Product, {
      through: 'ProductTagAssoc',
    });
  }
}

export default (sequelize: Sequelize) => {
  ProductTag.init(
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
    },
    {
      sequelize,
      paranoid: true,
      modelName: 'ProductTag',
      freezeTableName: true,
    },
  );

  return ProductTag;
};
