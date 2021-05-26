import { ParsedArgs } from 'minimist';
import inquirer from 'inquirer';
import chalk from 'chalk';
// import { getHelp } from './help';
import { fqn } from './index';
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from 'fs';
import { homedir } from 'os';
import {
  newTemplateJSON,
  newTemplatePath,
  templatesDirPath,
  workspaceFileSuffix,
} from '../../utils/config';
import { basename, resolve } from 'path';

export const run = async (parsedArgvLookup: { [fqn: string]: ParsedArgs }) => {
  const parsedArgs = parsedArgvLookup[fqn];

  // if (parsedArgs.help) {
  //   console.log(getHelp());
  //   process.exit(0);
  // }

  if (parsedArgs._.length < 1) {
    console.log(chalk.redBright('Error:'), 'Requires at least 1 argument');
    process.exit(1);
  }

  const workspaceFilePath = parsedArgs._[0];
  const workspaceFileName = basename(workspaceFilePath);

  if (!existsSync(workspaceFilePath)) {
    console.log(
      chalk.redBright('Error:'),
      `${workspaceFilePath} does not exist.`,
    );
    process.exit(1);
  }

  const workspaceJSON = JSON.parse(readFileSync(workspaceFilePath).toString());

  const workspaceFiles = readdirSync(resolve(workspaceFilePath, '..'), {
    withFileTypes: true,
  })
    .filter(
      (item) =>
        !item.isDirectory() &&
        item.name.endsWith('code-workspace') &&
        item.name !== workspaceFileName,
    )
    .map((item) => item.name);

  const { settings } = workspaceJSON;

  for (const file of workspaceFiles) {
    settings['files.exclude'][file] = true;
  }

  writeFileSync(workspaceFilePath, JSON.stringify(workspaceJSON, null, 2));
};
