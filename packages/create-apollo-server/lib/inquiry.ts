import inquirer, { QuestionCollection } from 'inquirer';
import { ParamsType } from './utils';

export default async () => {
  return inquirer.prompt(questions).then((answers) => {
    return answers;
  });
};

const questions = [
  {
    type: 'list',
    name: 'dbDialect',
    message: 'Choose database dialect which you will use for this project',
    choices: ['postgresql', 'mysql'],
  },
  {
    type: 'input',
    name: 'dbHost',
    message: "What's your database host?",
    default: () => {
      return 'localhost';
    },
  },
  {
    type: 'input',
    name: 'dbName',
    message: "What's your database name?",
    default: () => {
      return 'cas-dev';
    },
  },
  {
    type: 'input',
    name: 'dbUsername',
    message: "What's your database username?",
    default: function () {
      return 'root';
    },
  },
  {
    type: 'input',
    name: 'dbPassword',
    message: "What's your database password?",
  },
  {
    type: 'confirm',
    name: 'usePrisma',
    message:
      'Do you want to use prisma? (Prisma includes features which are still experimental)',
    default: function () {
      return false;
    },
  },
  {
    type: 'input',
    name: 'apolloKey',
    message: 'If you want to use apollo-stdio, please enter your apollo-key',
    when: function ({ usePrisma }) {
      return usePrisma;
    },
  },
] as QuestionCollection<ParamsType>;
