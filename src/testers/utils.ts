import fs from 'fs';

import { testers } from '../testers';

export const getTesterOption = (): TesterSuffix|undefined => {
  const files = fs.readdirSync('.');
  return testers.find(suffix => !!files.find(file => file.endsWith(suffix)));
};

export const getFileNameBySuffix = (suffix: TesterSuffix): string|undefined => {
  const files = fs.readdirSync('.');
  return files.find(el => el.endsWith(suffix));
};

export const getFileValidSuffix = (filename: string): TesterSuffix|undefined => {
  return testers.find(suffix => filename.endsWith(suffix));
};