import { resolve } from 'path';
import { readFileSync } from 'fs';

let pkgJSON: { [key: string]: any } | undefined;

export const getVersion = (): string => {
  if (pkgJSON === undefined) {
    pkgJSON = JSON.parse(
      readFileSync(resolve(__dirname, '..', '..', 'package.json')).toString(),
    );
  }

  return (pkgJSON as { [key: string]: any }).version;
};
