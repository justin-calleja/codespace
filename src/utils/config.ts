import { existsSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';

export const configDirPath = existsSync(join(homedir(), '.config'))
  ? join(homedir(), '.config', 'codespace')
  : join(homedir(), '.codespace');

export const configPath = join(configDirPath, 'config.json');

export const templatesDirPath = join(configDirPath, 'templates');

export const newTemplatePath = join(templatesDirPath, 'new.json');

export const newTemplateJSON = `{
  "folders": [
    {
      "path": "."
    }
  ],
  "settings": {
  }
}
`;

export const workspaceFileSuffix = 'code-workspace';
