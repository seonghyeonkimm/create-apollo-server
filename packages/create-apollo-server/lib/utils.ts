export type ParamsType = {
  dbDialect: 'mysql' | 'postgresql';
  dbHost: string;
  dbName: string;
  dbUsername: string;
  dbPassword: string;
  usePrisma: boolean;
  apolloKey: string;
};

export const generateAppConfig = (answers: ParamsType) => {
  return `# database
DATABASE_HOST=${answers.dbHost}
DATABASE_NAME=${answers.dbName}
DATABASE_USERNAME=${answers.dbUsername}
DATABASE_PASSWORD=${answers.dbPassword}
DATABASE_DIALECT=${answers.dbDialect}
`;
};

export const generatePrismaConfig = (answers: ParamsType) => {
  const port = answers.dbDialect === 'postgresql' ? '5432' : '3306';
  return `# database
DATABASE_URL=${answers.dbDialect}://${answers.dbUsername}${answers.dbPassword ? `:${answers.dbPassword}` : ''}@${answers.dbHost}:${port}/${answers.dbName}
`;
};

export const generateApolloConfig = (apolloKey: string) => {
  return `
# apollo
APOLLO_KEY=${apolloKey}`;
};


export const generateGitignore = () => {
  return `# packages
node_modules

# logs
yarn-error.log

# env
.env`;
};