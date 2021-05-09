import minimist from 'minimist';
import buildOptions from 'minimist-options';

export const name = 'codespace';

export const fqn = name;

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
