type ParamsType = {
  dbDialect: 'mysql';
  dbHost: string;
  dbName: string;
  dbUsername: string;
  dbPassword: string;
  usePrisma: boolean;
  apolloKey: string;
};

export const generateAppConfig = (answers: ParamsType) => {
  return {
    dev: `# database
DATABASE_HOST=${answers.dbHost}
DATABASE_NAME=${answers.dbName}-dev
DATABASE_USERNAME=${answers.dbUsername}
DATABASE_PASSWORD=${answers.dbPassword}
DATABASE_DIALECT=${answers.dbDialect}
`,
    test: `# database
DATABASE_HOST=${answers.dbHost}
DATABASE_NAME=${answers.dbName}-test
DATABASE_USERNAME=${answers.dbUsername}
DATABASE_PASSWORD=${answers.dbPassword}
DATABASE_DIALECT=${answers.dbDialect}
`,
    production: `# database
DATABASE_HOST=${answers.dbHost}
DATABASE_NAME=${answers.dbName}-production
DATABASE_USERNAME=${answers.dbUsername}
DATABASE_PASSWORD=${answers.dbPassword}
DATABASE_DIALECT=${answers.dbDialect}
`,
  };
};

export const generateApolloConfig = (apolloKey: string) => {
  return `
# apollo
APOLLO_KEY=${apolloKey}`;
};
