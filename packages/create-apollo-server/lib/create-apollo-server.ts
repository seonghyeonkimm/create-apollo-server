#!/usr/bin/env node

import chalk from 'chalk';
import { execSync } from 'child_process';
import commander from 'commander';
import fs from 'fs';
import path from 'path';

import packageJSON from '../package.json';
import inquiry from './inquiry';
import { generateApolloConfig, generateAppConfig, generatePrismaConfig } from './utils';


let projectDir: string | undefined;
const DEFAULT_TEMPLATE = {
  version: '0.0.4',
  name: '@seonghyeonkimm/cas-template',
};

const PRIMSA_TEMPLATE = {
  version: '0.0.2',
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
  console.log(`Make folder in provided path 🏠`);
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

  console.log(`Install ${chalk.green('dependencies')} 🙏`);
  execSyncInProjectDir(`yarn`, { stdio: 'inherit' });

  console.log(`Generate ${chalk.green('graphql node and resolver types')} 👀`);
  execSyncInProjectDir(`yarn codegen`, { stdio: 'inherit' });

  console.log(`Generate ${chalk.green('app configuration')} 🛰`);
  fs.writeFileSync(path.join(rootPath, '.env'), '');

  if (answers.usePrisma) {
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
  console.log(`Migrate database using ${chalk.green(ormName)} 🚀`);
  execSyncInProjectDir('yarn migrate', { stdio: 'inherit' });

  execSyncInProjectDir('git init');
  execSyncInProjectDir('git add .');
  execSyncInProjectDir('git commit -m "Initial commit by create-apollo-server script"');

  console.log();
  console.log(
    `Done. start to build your own ${chalk.green('apollo-server')} 🏠`,
  );

  process.exit(0);
};

main();
