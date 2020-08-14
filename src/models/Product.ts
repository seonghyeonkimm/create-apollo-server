import createOrGetSequelize from './db';

import { DataTypes, Model, Optional, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyHasAssociationMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, Association } from 'sequelize';
import ProductOption from './ProductOption';

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

  public getProductOptions!: HasManyGetAssociationsMixin<ProductOption>;
  public addProductOptions!: HasManyAddAssociationMixin<ProductOption, number>;
  public hasProductOptions!: HasManyHasAssociationMixin<ProductOption, number>;
  public countProductOptionss!: HasManyCountAssociationsMixin;
  public createProductOptions!: HasManyCreateAssociationMixin<ProductOption>;

  // association types
  public readonly productOptions?: ProductOption[];

  public static associations: {
    productOptions: Association<Product, ProductOption>;
  };
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

// associations
Product.hasMany(ProductOption, {
  sourceKey: 'id',
  foreignKey: 'productId',
  as: 'productOptions',
});

export default Product;
