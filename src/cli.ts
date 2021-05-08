#!/usr/bin/env node

import chalk from 'chalk';
import {
  parseCmdOrThrow,
  getParsedCmdNames,
  getNamedArgvs,
} from 'argv-cmd-lib';
import * as codespaceCmd from './cmds/codespace';
import * as addCmd from './cmds/add';
import * as newCmd from './cmds/new';

const main = () => {
  const parsedCmd = parseCmdOrThrow(codespaceCmd, process.argv.slice(2));

  const fullyQualifiedCmdNameToRun = getParsedCmdNames(parsedCmd).join('.');
  const namedArgvs = getNamedArgvs(parsedCmd);
  const namedParsedArgvs = namedArgvs.map(([fqn, argv]) =>
    fqn === codespaceCmd.fqn
      ? [fqn, codespaceCmd.parseArgv(argv)]
      : fqn === addCmd.fqn
      ? [fqn, addCmd.parseArgv(argv)]
      : fqn === newCmd.fqn
      ? [fqn, newCmd.parseArgv(argv)]
      : // otherwise, don't parse argv:
        [fqn, argv],
  );

  const parsedArgvLookup = Object.fromEntries(namedParsedArgvs);

  //   console.log(
  //     chalk.blue('fullyQualifiedCmdNameToRun:'),
  //     fullyQualifiedCmdNameToRun,
  //   );
  //   console.log(
  //     chalk.blue('parsedArgvLookup:'),
  //     JSON.stringify(parsedArgvLookup, null, 2),
  //   );

  switch (fullyQualifiedCmdNameToRun) {
    case codespaceCmd.fqn: {
      codespaceCmd.run(parsedArgvLookup);
      break;
    }
    case addCmd.fqn: {
      addCmd.run(parsedArgvLookup);
      break;
    }
    case newCmd.fqn: {
      newCmd.run(parsedArgvLookup);
      break;
    }
    default: {
      throw new Error(
        `Failed to implement command with fully qualified name of: ${fullyQualifiedCmdNameToRun}`,
      );
    }
  }
};

main();
