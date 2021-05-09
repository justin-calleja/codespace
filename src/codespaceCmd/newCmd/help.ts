import commandLineUsage from 'command-line-usage';
import { name } from './index';

export const getHelp = (): string => {
  return commandLineUsage([
    {
      header: name,
      content: `Creates a new workspace.`,
    },
    {
      header: 'Options',
      optionList: [
        {
          name: 'help',
          description: `Display this usage guide.`,
          alias: 'h',
          type: Boolean,
        },
      ],
    },
    {
      header: 'Arguments',
      content: [
        {
          name: '<path-to-workspace>',
          summary: `The path of the new workspace to create.`,
        },
      ],
    },
  ]);
};
