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

  const workspacePath = parsedArgs._[0];
  const folderPathToAdd = isAbsolute(parsedArgs._[1])
    ? parsedArgs._[1]
    : resolve(process.cwd(), parsedArgs._[1]);

  const workspaceJSON = JSON.parse(readFileSync(workspacePath).toString());

  if (
    workspaceJSON.folders.find(({ path }: { path: string }) => {
      const testPath = isAbsolute(path)
        ? path
        : resolve(workspacePath, '..', path);
      return testPath === folderPathToAdd;
    }) !== undefined
  ) {
    console.log(
      chalk.yellowBright('Warning:'),
      `${folderPathToAdd} already exists as a folder in ${workspacePath}`,
    );
    process.exit(0);
  }

  workspaceJSON.folders.push({ path: folderPathToAdd });

  writeFileSync(workspacePath, JSON.stringify(workspaceJSON, null, 2));

  console.log(
    chalk.blueBright('Info:'),
    `Added ${folderPathToAdd} to ${workspacePath}`,
  );
};
