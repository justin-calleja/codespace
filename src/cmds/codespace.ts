import chalk from 'chalk';
import commandLineUsage from 'command-line-usage';
import minimist, { ParsedArgs } from 'minimist';
import buildOptions from 'minimist-options';
import { getVersion } from '../utils/pkgJSON';
import * as addCmd from './add';
import * as newCmd from './new';

export const name = 'codespace';

export const fqn = name;

export const subCmds = [addCmd, newCmd];

export const getHelp = (): string => {
  return commandLineUsage([
    { header: `codespace v${getVersion()}`, content: 'TODO...' },
    {
      header: 'Options',
      optionList: [
        {
          name: 'help',
          description: `Display this usage guide. Each command has it's own help option if you want to know more about a given command.`,
          alias: 'h',
          type: Boolean,
        },
        {
          name: 'version',
          description: 'Display only the version number',
          alias: 'v',
          type: Boolean,
        },
      ],
    },
    {
      header: 'Commands',
      content: [
        { name: 'new', summary: `TODO...` },
        { name: 'add', summary: `TODO...` },
      ],
    },
  ]);
};

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
  const opts = parsedArgvLookup[name];

  if (opts.version) {
    console.log(getVersion());
    process.exit(0);
  }

  if (opts.help) {
    console.log(getHelp());
  }

  //   console.log(`Running ${fqn}...`, help, version);
};
