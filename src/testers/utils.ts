import fs from 'fs';

import testers from '../testers';

export const getTesterOption = (): string|undefined => {
  const files = fs.readdirSync('.');
  const suffixs = Object.keys(testers);
  return suffixs.find(suffix => !!files.find(file => file.endsWith(suffix)));
};

export const getFileNameBySuffix = (suffix: string): string|undefined => {
  const files = fs.readdirSync('.');
  return files.find(el => el.endsWith(suffix));
};
