import dotenv from 'dotenv';
import { Sequelize, Dialect } from 'sequelize';
import Umzug from 'umzug';
import { argv } from 'yargs';

dotenv.config({
  path:
    process.env.NODE_ENV === 'production'
      ? '.env.production'
      : process.env.NODE_ENV === 'test'
      ? '.env.test'
      : '.env',
});

const sequelize = new Sequelize({
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  dialect: process.env.DATABASE_DIALECT as Dialect,
});

const umzug = new Umzug({
  storage: 'sequelize',
  storageOptions: {
    sequelize,
  },
  migrations: {
    path: './migrations',
    params: [sequelize.getQueryInterface(), sequelize.constructor],
  },
});

function cmdMigrate() {
  return umzug.up();
}

function cmdUndoMigrate(id?: string | 0) {
  const option = typeof id !== 'undefined' ? { to: id } : undefined;
  return umzug.down(option);
}

(async () => {
  const { name, id } = argv;
  if (!name) throw new Error('Command name should be provided');

  switch (name) {
    case 'migrate':
      await cmdMigrate();
      return;
    case 'migrate:undo':
      await cmdUndoMigrate(typeof id === 'string' ? id : 0);
      return;
    default:
      throw new Error('No matched commands');
  }
})();
