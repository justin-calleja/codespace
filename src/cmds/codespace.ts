import chalk from 'chalk';
import minimist, { ParsedArgs } from 'minimist';
import buildOptions from 'minimist-options';
import * as addCmd from './add';
import { isProd } from '../utils/isProd';

export const name = 'codespace';

export const fqn = name;

export const subCmds = [addCmd];

export const parseArgv = (argv: string[]) =>
  minimist(
    argv,
    buildOptions({
      ...(!isProd && {
        debug: {
          type: 'boolean',
          alias: 'd',
          default: false,
        },
      }),
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
