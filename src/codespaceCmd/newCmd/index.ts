import minimist from 'minimist';
import buildOptions from 'minimist-options';
import { name as parentCmdName } from '../index';

export const name = 'new';

export const fqn = `${parentCmdName}.${name}`;

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
