'use strict';

module.exports = {
  async up(queryInterface, { DataTypes }) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('Product', {
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

      await queryInterface.createTable('ProductOption', {
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
            model: 'Product',
          },
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE,
      });

      await queryInterface.createTable('ProductTag', {
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
            model: 'Product',
          },
        },
        ProductTagId: {
          primaryKey: true,
          type: DataTypes.INTEGER.UNSIGNED,
          references: {
            key: 'id',
            model: 'ProductTag',
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
      await queryInterface.dropTable('ProductTag');
      await queryInterface.dropTable('ProductOption');
      await queryInterface.dropTable('Product');
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
