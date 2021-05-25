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

  const absPaths = workspaceJSON.folders.map(({ path }: { path: string }) =>
    isAbsolute(path) ? path : resolve(workspacePath, '..', path),
  );

  const folderPaths = parsedArgs._.slice(1);

  const [newPaths, existingPaths] = folderPaths.reduce<
    [Set<string>, Set<string>]
  >(
    (acc, pathToAdd): [Set<string>, Set<string>] => {
      const absPath = isAbsolute(pathToAdd)
        ? pathToAdd
        : resolve(process.cwd(), pathToAdd);

      acc[absPaths.includes(absPath) ? 1 : 0].add(absPath);
      return acc;
    },
    [new Set(), new Set()],
  );

  for (const path of existingPaths) {
    console.log(
      chalk.yellowBright('Warning:'),
      `${path} already exists as a folder in ${workspacePath}`,
    );
  }

  workspaceJSON.folders = [
    ...workspaceJSON.folders,
    ...Array.from(newPaths).map((path) => ({ path })),
  ];
  writeFileSync(workspacePath, JSON.stringify(workspaceJSON, null, 2));

  for (const path of newPaths) {
    console.log(chalk.blueBright('Info:'), `Added ${path} to ${workspacePath}`);
  }
};
