import inquirer, { QuestionCollection } from 'inquirer';

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
    choices: ['mysql'],
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
      return 'cas';
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
] as QuestionCollection<{
  dbDialect: 'mysql';
  dbHost: string;
  dbName: string;
  dbUsername: string;
  dbPassword: string;
  usePrisma: boolean;
  apolloKey: string;
}>;
