import chalk from 'chalk';
import minimist, { ParsedArgs } from 'minimist';
import buildOptions from 'minimist-options';
import * as addCmd from './add';
import * as newCmd from './new';

export const name = 'codespace';

export const fqn = name;

export const subCmds = [addCmd, newCmd];

export const parseArgv = (argv: string[]) =>
  minimist(
    argv,
    buildOptions({
      help: {
        type: 'boolean',
        alias: 'h',
        default: false,
      },
      version: {
        type: 'boolean',
        alias: 'v',
        default: false,
      },
    }),
  );

export const run = (parsedArgvLookup: { [fqn: string]: ParsedArgs }) => {
  console.log(`Running ${fqn}...`);
};
