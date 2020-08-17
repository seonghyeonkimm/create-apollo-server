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

import { ProductOption } from './ProductOption';
import { ProductTag } from './ProductTag';

interface ProductAttributes {
  id: number;
  name: string;
}

type ProductCreationAttributes = Optional<ProductAttributes, 'id'>;

export class Product extends Model<
  ProductAttributes,
  ProductCreationAttributes
> {
  public id!: number;
  public name!: string;

  public readonly craetedAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  public getOptions!: HasManyGetAssociationsMixin<ProductOption>;

  public addOptions!: HasManyAddAssociationMixin<
    ProductOption,
    number | number[]
  >;

  public countOptions!: HasManyCountAssociationsMixin;
  public hasOption!: HasManyHasAssociationMixin<ProductOption, number>;

  public createOption!: HasManyCreateAssociationMixin<ProductOption>;

  public getTags!: HasManyGetAssociationsMixin<ProductTag>;
  public addTags!: HasManyAddAssociationMixin<ProductTag, number | number[]>;

  public countTags!: HasManyCountAssociationsMixin;
  public hasTag!: HasManyHasAssociationMixin<ProductTag, number>;

  public createTag!: HasManyCreateAssociationMixin<ProductTag>;

  // association types
  public readonly options?: ProductOption[];
  public readonly tags?: ProductTag[];

  public static associations: {
    options: Association<Product, ProductOption>;
    tags: Association<Product, ProductTag>;
  };

  public static associate(models: Record<string, ModelStatic<Model>>) {
    const { ProductOption, ProductTag } = models;

    Product.hasMany(ProductOption, {
      foreignKey: 'productId',
      as: 'options',
    });

    Product.belongsToMany(ProductTag, {
      as: 'tags',
      through: 'ProductTagAssoc',
    });
  }
}

export default (sequelize: Sequelize) => {
  Product.init(
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
      modelName: 'Product',
    },
  );

  return Product;
};
