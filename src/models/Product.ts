import createOrGetSequelize from './db';
import {
  DataTypes,
  Model,
  Optional,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Association,
} from 'sequelize';
import ProductOption from './ProductOption';
import ProductTag from './ProductTag';

interface ProductAttributes {
  id: number;
  name: string;
}

type ProductCreationAttributes = Optional<ProductAttributes, 'id'>;

class Product extends Model<ProductAttributes, ProductCreationAttributes> {
  public id!: number;
  public name!: string;

  public readonly craetedAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  public getProductOptions!: HasManyGetAssociationsMixin<ProductOption>;
  public addProductOptions!: HasManyAddAssociationMixin<ProductOption, number>;
  public hasProductOptions!: HasManyHasAssociationMixin<ProductOption, number>;
  public countProductOptions!: HasManyCountAssociationsMixin;
  public createProductOptions!: HasManyCreateAssociationMixin<ProductOption>;

  public getTags!: HasManyGetAssociationsMixin<ProductTag>;
  public addTags!: HasManyAddAssociationMixin<ProductTag, number>;
  public hasTags!: HasManyHasAssociationMixin<ProductTag, number>;
  public countTags!: HasManyCountAssociationsMixin;
  public createTags!: HasManyCreateAssociationMixin<ProductTag>;

  // association types
  public readonly productOptions?: ProductOption[];
  public readonly tags?: ProductTag[];

  public static associations: {
    productOptions: Association<Product, ProductOption>;
    tags: Association<Product, ProductTag>;
  };
}

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
    sequelize: createOrGetSequelize(),
    paranoid: true,
    tableName: 'product',
    modelName: 'Product',
  },
);

// associations
Product.hasMany(ProductOption, {
  foreignKey: 'productId',
  as: 'productOptions',
});

ProductTag.belongsToMany(Product, {
  through: 'ProductTagAssoc',
});

Product.belongsToMany(ProductTag, {
  through: 'ProductTagAssoc',
});

export default Product;
