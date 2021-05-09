import commandLineUsage from 'command-line-usage';
import { getVersion } from '../utils/pkgJSON';
import { name } from './index';

const mainSection = {
  header: `${name} v${getVersion()}`,
  content:
    'A tool to help you create, manage, and launch vscode workspaces.\n\nFor more info, visit https://github.com/justin-calleja/codespace',
};

export const getShortHelp = (): string => {
  return commandLineUsage([mainSection]);
};

export const getHelp = (): string => {
  return commandLineUsage([
    mainSection,
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
