import { Sequelize, Dialect } from 'sequelize';

let sequelize: Sequelize | undefined; 

export default () => {
  if (sequelize) return sequelize;

  sequelize = new Sequelize({
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    dialect: process.env.DATABASE_DIALECT as Dialect,
  });

  // TODO: This task should be done by migration scripts later
  sequelize.sync({ alter: true, match:  /-dev$/ });

  return sequelize;
};
