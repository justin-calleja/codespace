import chalk from 'chalk';
import minimist, { ParsedArgs } from 'minimist';
import buildOptions from 'minimist-options';

export const name = 'add';

export const fqn = 'codespace.add';

export const subCmds = [];

export const parseArgv = (argv: string[]) =>
  minimist(
    argv,
    buildOptions({
      help: {
        type: 'boolean',
        alias: 'h',
        default: false,
      },
    }),
  );

export const run = (parsedArgvLookup: { [fqn: string]: ParsedArgs }) => {
  console.log(`Running ${fqn}...`);
};
