'use strict';

module.exports = {
  async up(queryInterface, { DataTypes }) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('Products', {
        id: {
          primaryKey: true,
          autoIncrement: true,
          type: DataTypes.INTEGER.UNSIGNED,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE,
      });

      await queryInterface.createTable('ProductOptions', {
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
          references: {
            key: 'id',
            model: 'Products',
          },
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE,
      });

      await queryInterface.createTable('ProductTags', {
        id: {
          primaryKey: true,
          autoIncrement: true,
          type: DataTypes.INTEGER.UNSIGNED,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE,
      });

      await queryInterface.createTable('ProductTagAssoc', {
        ProductId: {
          primaryKey: true,
          type: DataTypes.INTEGER.UNSIGNED,
          references: {
            key: 'id',
            model: 'Products',
          },
        },
        ProductTagId: {
          primaryKey: true,
          type: DataTypes.INTEGER.UNSIGNED,
          references: {
            key: 'id',
            model: 'ProductTags',
          },
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  async down(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable('ProductTagAssoc');
      await queryInterface.dropTable('ProductTags');
      await queryInterface.dropTable('ProductOptions');
      await queryInterface.dropTable('Products');
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
