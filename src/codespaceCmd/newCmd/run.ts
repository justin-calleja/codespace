import { ParsedArgs } from 'minimist';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { getHelp } from './help';
import { fqn } from './index';
import { copyFileSync, existsSync, mkdirSync, writeFileSync } from 'fs';
import { homedir } from 'os';
import {
  newTemplateJSON,
  newTemplatePath,
  templatesDirPath,
  workspaceFileSuffix,
} from '../../utils/config';

const promptInputWorkspacePath = async (): Promise<string> => {
  const { path } = await inquirer.prompt([
    {
      type: 'input',
      name: 'path',
      message: 'Create workspace file at:',
      validate: (path) => {
        if (
          path === undefined ||
          (typeof path.trim === 'function' && path.trim() === '')
        ) {
          return 'Please provide an absolute or relative path to where you want to create your new vscode workspace.';
        }
        return true;
      },
    },
  ]);

  return path;
};

const promptConfirmOverwriteFile = async (path: string): Promise<boolean> => {
  const { overwrite } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'overwrite',
      message: `${path} already exists.\nOverwrite?`,
    },
  ]);
  return overwrite;
};

const userInputToWorkspacePath = (userInput: string) => {
  const path = userInput.trim().replace('~', homedir());

  return path.endsWith(`.${workspaceFileSuffix}`)
    ? path
    : `${path}.${workspaceFileSuffix}`;
};

export const run = async (parsedArgvLookup: { [fqn: string]: ParsedArgs }) => {
  const parsedArgs = parsedArgvLookup[fqn];

  if (parsedArgs.help) {
    console.log(getHelp());
    process.exit(0);
  }

  const workspacePath = userInputToWorkspacePath(
    parsedArgs._.length === 0
      ? await promptInputWorkspacePath()
      : parsedArgs._[0],
  );

  if (existsSync(workspacePath)) {
    const isOkToOverwrite = await promptConfirmOverwriteFile(workspacePath);
    if (!isOkToOverwrite) {
      process.exit(0);
    }
  }

  if (!existsSync(newTemplatePath)) {
    mkdirSync(templatesDirPath, { recursive: true });
    writeFileSync(newTemplatePath, newTemplateJSON);
  }

  copyFileSync(newTemplatePath, workspacePath);
  console.log(
    chalk.blueBright('Info:'),
    `Copied ${newTemplatePath} to ${workspacePath}`,
  );
};
