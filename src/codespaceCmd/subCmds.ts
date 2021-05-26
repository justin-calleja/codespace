import { name as newCmdName } from './newCmd';
import { name as addCmdName } from './addCmd';
import { name as excludeOthersCmdName } from './excludeOthersCmd';

export const subCmds = [
  {
    name: newCmdName,
    subCmds: [],
  },
  {
    name: addCmdName,
    subCmds: [],
  },
  {
    name: excludeOthersCmdName,
    subCmds: [],
  },
];
