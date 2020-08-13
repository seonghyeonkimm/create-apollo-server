import { Sequelize } from 'sequelize';

let sequelize: Sequelize | undefined; 

export default () => {
  if (sequelize) return sequelize;

  sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    database: 'cas-dev',
  });

  // Only in development mode, sequelize try to sync db with models
  // This task should be done by migration scripts later
  sequelize.sync({ alter: true, match:  /_dev$/ });

  return sequelize;
};
