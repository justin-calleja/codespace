import commandLineUsage from 'command-line-usage';
import { name } from './index';

export const getHelp = (): string => {
  return commandLineUsage([
    {
      header: name,
      content: `Adds a new folder to a workspace`,
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
          summary: `The relative or absolute path of the workspace to add a folder to.`,
        },
        {
          name: '<paths-to-new-folders>...',
          summary: `The relative or absolute path/s of the new folder/s to add to the workspace.`,
        },
      ],
    },
  ]);
};
