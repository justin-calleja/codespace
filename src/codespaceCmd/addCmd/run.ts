import chalk from 'chalk';
import { readFileSync, writeFileSync } from 'fs';
import { ParsedArgs } from 'minimist';
import { isAbsolute, resolve } from 'path';
import { getHelp } from './help';
import { fqn } from './index';

export const run = (parsedArgvLookup: { [fqn: string]: ParsedArgs }) => {
  const parsedArgs = parsedArgvLookup[fqn];

  if (parsedArgs.help) {
    console.log(getHelp());
    process.exit(0);
  }

  if (parsedArgs._.length < 2) {
    console.log(chalk.redBright('Error:'), 'Requires at least 2 arguments');
    process.exit(1);
  }

  const workspacePath = parsedArgs._[0];
  const workspaceJSON = JSON.parse(readFileSync(workspacePath).toString());

  const absPathDict = workspaceJSON.folders.reduce(
    (acc: { [key: string]: boolean }, { path }: { path: string }) => {
      const absPath = isAbsolute(path)
        ? path
        : resolve(workspacePath, '..', path);

      acc[absPath] = true;
      return acc;
    },
    {},
  );

  const folderPathsToAdd = parsedArgs._.slice(1);

  const [newPathsToAdd, pathsAlreadyInWorkspace] = folderPathsToAdd.reduce(
    (acc: [string[], string[]], pathToAdd) => {
      const absPathToAdd = isAbsolute(pathToAdd)
        ? pathToAdd
        : resolve(process.cwd(), pathToAdd);

      if (absPathDict[absPathToAdd] === true) {
        acc[1].push(absPathToAdd);
      } else {
        acc[0].push(absPathToAdd);
      }

      return acc;
    },
    [[], []],
  );

  for (const path of pathsAlreadyInWorkspace) {
    console.log(
      chalk.yellowBright('Warning:'),
      `${path} already exists as a folder in ${workspacePath}`,
    );
  }

  // TODO: filter out any duplicates in newPathsToAdd...
  // e.g. codespace add ./tmp.code-workspace ../github/a ../github/b  ../github/a
  // should only add ../github/a once.

  workspaceJSON.folders = [
    ...workspaceJSON.folders,
    ...newPathsToAdd.map((path) => ({ path })),
  ];
  writeFileSync(workspacePath, JSON.stringify(workspaceJSON, null, 2));

  for (const path of newPathsToAdd) {
    console.log(chalk.blueBright('Info:'), `Added ${path} to ${workspacePath}`);
  }
};
