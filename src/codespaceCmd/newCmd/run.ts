import { ParsedArgs } from 'minimist';
import { getHelp } from './help';
import { fqn } from './index';

export const run = (parsedArgvLookup: { [fqn: string]: ParsedArgs }) => {
  const parsedArgs = parsedArgvLookup[fqn];

  if (parsedArgs.help) {
    console.log(getHelp());
    process.exit(0);
  }

  // TODO: if given path doesn't end in .code-workspace, you add it.
  // .code-workspace

  if (parsedArgs._.length === 0) {
    // TODO: prompt user to enter path to workspace
  }

  console.log('new:', parsedArgs._);
};
