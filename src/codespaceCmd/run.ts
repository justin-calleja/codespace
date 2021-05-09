import commandLineUsage from 'command-line-usage';
import { ParsedArgs } from 'minimist';
import { getVersion } from '../utils/pkgJSON';
import { getHelp, getShortHelp } from './help';
import { fqn } from './index';

export const run = (parsedArgvLookup: { [fqn: string]: ParsedArgs }) => {
  const parsedArgs = parsedArgvLookup[fqn];

  if (parsedArgs.version) {
    console.log(getVersion());
    process.exit(0);
  }

  if (parsedArgs.help) {
    console.log(getHelp());
    process.exit(0);
  }

  console.log(getShortHelp());
  process.exit(0);
};
