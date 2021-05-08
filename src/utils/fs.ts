import { existsSync, mkdirSync, writeFileSync } from 'fs';

export const createFile = (filePath: string, content: string): boolean => {
  if (!existsSync(filePath)) {
    writeFileSync(filePath, content);
    return true;
  }
  return false;
};

export const createDir = (dirPath: string): boolean => {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath);
    return true;
  }
  return false;
};

export { readFileSync } from 'fs';
