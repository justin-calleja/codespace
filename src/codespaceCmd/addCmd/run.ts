import { ParsedArgs } from 'minimist';
// import { getHelp } from './getHelp';
import { name } from './index';

export const run = (parsedArgvLookup: { [fqn: string]: ParsedArgs }) => {
  const parsedArgs = parsedArgvLookup[name];

  if (parsedArgs.help) {
    // console.log(getHelp());
  }

  console.log('new:', parsedArgs._);
};
