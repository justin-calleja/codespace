#!/usr/bin/env node

import {
  parseCmdOrThrow,
  getParsedCmdNames,
  getNamedArgvs,
} from 'argv-cmd-lib';
import {
  name,
  fqn as codespaceFqn,
  parseArgv as codespaceCmdParseArgv,
} from './codespaceCmd';
import { subCmds } from './codespaceCmd/subCmds';
import {
  fqn as codespaceNewFqn,
  parseArgv as codespaceNewCmdParseArgv,
} from './codespaceCmd/newCmd';
import {
  fqn as codespaceAddFqn,
  parseArgv as codespaceAddCmdParseArgv,
} from './codespaceCmd/addCmd';

const main = () => {
  const parsedCmd = parseCmdOrThrow({ name, subCmds }, process.argv.slice(2));

  const fullyQualifiedCmdNameToRun = getParsedCmdNames(parsedCmd).join('.');
  const namedArgvs = getNamedArgvs(parsedCmd);
  const namedParsedArgvs = namedArgvs.map(([fqn, argv]) =>
    fqn === codespaceFqn
      ? [fqn, codespaceCmdParseArgv(argv)]
      : fqn === codespaceNewFqn
      ? [fqn, codespaceNewCmdParseArgv(argv)]
      : fqn === codespaceAddFqn
      ? [fqn, codespaceAddCmdParseArgv(argv)]
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
    case codespaceFqn: {
      import('./codespaceCmd/run').then(({ run }) => {
        run(parsedArgvLookup);
      });

      break;
    }
    case codespaceNewFqn: {
      import('./codespaceCmd/newCmd/run').then(({ run }) => {
        run(parsedArgvLookup);
      });

      break;
    }
    case codespaceAddFqn: {
      import('./codespaceCmd/addCmd/run').then(({ run }) => {
        run(parsedArgvLookup);
      });

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
