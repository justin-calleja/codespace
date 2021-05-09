import { ParsedArgs } from 'minimist';
import inquirer from 'inquirer';
import { getHelp } from './help';
import { fqn } from './index';
import { existsSync } from 'fs';

const workspaceFileSuffix = 'code-workspace';

const promptConfirmOverwriteFile = async (path: string): Promise<boolean> => {
  const { overwrite } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'overwrite',
      message: `${path} already exists. Overwrite?`,
    },
  ]);
  return overwrite;
};

export const run = async (parsedArgvLookup: { [fqn: string]: ParsedArgs }) => {
  const parsedArgs = parsedArgvLookup[fqn];

  if (parsedArgs.help) {
    console.log(getHelp());
    process.exit(0);
  }

  if (parsedArgs._.length === 0) {
    // Prompt user to enter path to workspace.
    const { path: pathUserInput }: { path: string } = await inquirer.prompt([
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

    const pathToWorkspace = pathUserInput.endsWith(`.${workspaceFileSuffix}`)
      ? pathUserInput
      : `${pathUserInput}.${workspaceFileSuffix}`;

    let fileExists: boolean | undefined;

    try {
      fileExists = existsSync(pathToWorkspace);
    } catch (err) {
      console.log('err is:', err.message);
      process.exit(1);
    }

    if (fileExists) {
      const isOkToOverwrite = await promptConfirmOverwriteFile(pathToWorkspace);
      if (isOkToOverwrite) {
        console.log('TODO: overwite file');
        // TODO: call reusable func

        process.exit(0);
      } else {
        process.exit(0);
      }
    }

    console.log('TODO: create file');
    // TODO: call reusable func
  }

  console.log('new:', parsedArgs._);
};
