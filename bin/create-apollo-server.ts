import chalk from 'chalk';
import { execSync } from 'child_process';
import commander from 'commander';
import fs from 'fs';
import path from 'path';

import packageJSON from '../package.json';
import inquiry from './inquiry';
import { generateApolloConfig, generateAppConfig } from './utils';

let projectDir: string | undefined;
const main = async () => {
  const program = new commander.Command(packageJSON.name);

  program
    .version(packageJSON.version)
    .usage(`${chalk.green('<project-directory>')} [options]`)
    .arguments('<project-directory>')
    .action(function (dir) {
      projectDir = dir;
    })
    .allowUnknownOption()
    .parse(process.argv);

  if (!projectDir) {
    process.exit(1);
  }

  const answers = await inquiry();
  const rootPath = path.resolve(projectDir);
  console.log(`Clone apollo-server template to ${chalk.green(rootPath)} 🖐`);
  execSync(`git clone ${packageJSON.repository} ${rootPath}`, {
    stdio: 'inherit',
  });

  console.log(`Install ${chalk.green('dependencies')} 🙏`);
  execSync(`cd ${rootPath}`);
  execSync(`yarn`, { stdio: 'inherit' });

  console.log(`Generate ${chalk.green('graphql node and resolver types')} 👀`);
  execSync(`yarn codegen`, { stdio: 'inherit' });

  console.log(`Generate ${chalk.green('app configuration')} 🛰`);
  const appConfig = generateAppConfig(answers);
  fs.writeFileSync(path.join(rootPath, '.env'), appConfig.dev);
  fs.writeFileSync(path.join(rootPath, '.env.test'), appConfig.test);
  fs.writeFileSync(
    path.join(rootPath, '.env.production'),
    appConfig.production,
  );

  if (answers.apolloKey) {
    const apolloConfig = generateApolloConfig(answers.apolloKey);
    await new Promise((resolve) =>
      fs.appendFile(path.join(rootPath, '.env'), apolloConfig, resolve),
    );
    await new Promise((resolve) =>
      fs.appendFile(
        path.join(rootPath, '.env.production'),
        apolloConfig,
        resolve,
      ),
    );
  }

  if (answers.usePrisma) {
    // TODO: prisma init and generate config
    // TODO: prisma datasources
  } else {
    // sequelize settings
    console.log(`Migrate database using ${chalk.green('sequelize-cli')} 🚀`);
    execSync('yarn sql:migrate', { stdio: 'inherit' });
  }

  // TODO: Remove code which is unnecessary to start working on new template
  // TODO: Reset git history and make one

  console.log();
  console.log(
    `Done. start to build your own ${chalk.green('apollo-server')} 🏠`,
  );
};

main();
