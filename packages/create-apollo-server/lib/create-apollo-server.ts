#!/usr/bin/env node

import chalk from 'chalk';
import { execSync } from 'child_process';
import commander from 'commander';
import fs from 'fs';
import path from 'path';

import packageJSON from '../package.json';
import inquiry from './inquiry';
import { generateApolloConfig, generateAppConfig, generatePrismaConfig, generateGitignore } from './utils';


let projectDir: string | undefined;
const DEFAULT_TEMPLATE = {
  version: '0.0.7',
  name: '@seonghyeonkimm/cas-template',
};

const PRIMSA_TEMPLATE = {
  version: '0.0.5',
  name: '@seonghyeonkimm/cas-prisma-template',
};


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
  console.log(`Making folder in provided path 🏠`);
  execSync(`mkdir ${rootPath}`);

  const execSyncInProjectDir = (cmd: string, options?: Record<string, any>) => execSync(cmd, { cwd: rootPath, ...options });
  const template = answers.usePrisma ? PRIMSA_TEMPLATE : DEFAULT_TEMPLATE;
  const tgzName = `${template.name.replace('@', '').replace('/', '-')}-${template.version}.tgz`;

  console.log();
  console.log(`Downloading ${chalk.green(template.name)} 👊`);
  execSyncInProjectDir(`npm pack ${template.name}@${template.version}`, { stdio: 'ignore' });
  execSyncInProjectDir(`tar -xvf ${tgzName}`, { stdio: 'ignore' });

  execSyncInProjectDir(`mv package/* .`);
  execSyncInProjectDir(`rm ${tgzName}`)

  console.log(`Installing ${chalk.green('dependencies')} 🙏`);
  execSyncInProjectDir(`yarn`, { stdio: 'inherit' });

  if (!answers.usePrisma) {
    switch (answers.dbDialect) {
      case 'postgresql':
        execSyncInProjectDir(`yarn add pg pg-hstore`, { stdio: "inherit" });
      default:
        execSyncInProjectDir(`yarn add mysql2`, { stdio: 'inherit' });
    }
  }

  console.log(`Generating ${chalk.green('graphql node and resolver types')} 👀`);
  execSyncInProjectDir(`yarn codegen`, { stdio: 'inherit' });

  console.log(`Generating ${chalk.green('app configuration')} 🛰`);
  fs.writeFileSync(path.join(rootPath, '.env'), '');

  if (answers.usePrisma) {
    if (answers.dbDialect === 'postgresql') {
      execSyncInProjectDir(`rm ./prisma/schema.mysql.prisma`);
    } else {
      execSyncInProjectDir(`mv ./prisma/schema.mysql.prisma ./prisma/schema.prisma`);
    }

    console.log(`Generating ${chalk.green('Prisma')} migrations 🌝`);
    execSyncInProjectDir(`yarn makemigration --name init-tables`);
    await new Promise((resolve) =>
      fs.appendFile(
        path.join(rootPath, '.env'),
        generatePrismaConfig(answers),
        resolve,
      ),
    );
  } else {
    await new Promise((resolve) =>
      fs.appendFile(
        path.join(rootPath, '.env'),
        generateAppConfig(answers),
        resolve,
      ),
    );
  }

  if (answers.apolloKey) {
    const apolloConfig = generateApolloConfig(answers.apolloKey);
    await new Promise((resolve) =>
      fs.appendFile(path.join(rootPath, '.env'), apolloConfig, resolve),
    );
  }

  const ormName = answers.usePrisma ? 'prisma' : 'sequelize-cli'
  console.log(`Migrating database using ${chalk.green(ormName)} 🚀`);
  execSyncInProjectDir('yarn migrate', { stdio: 'inherit' });

  console.log(`Making Initial Commit ${chalk.green(ormName)} 🚀`);
  fs.writeFileSync(path.join(rootPath, '.gitignore'), generateGitignore());
  execSyncInProjectDir('git init', { stdio: 'inherit' });
  execSyncInProjectDir('git add .', { stdio: 'inherit' });
  execSyncInProjectDir('git commit -m "Initial commit by create-apollo-server script"', { stdio: 'inherit' });

  console.log();
  console.log(
    `Done. start to build your own ${chalk.green('apollo-server')} 🏠`,
  );

  process.exit(0);
};

main();
