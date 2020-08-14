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

  // TODO: Delete later when migration scripts task is done
  if (process.env.NODE_ENV !== 'test') {
    sequelize.sync({ force: true, match: /-dev$/ });
  }

  return sequelize;
};
