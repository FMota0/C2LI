import fs from 'fs';

import testers from '../testers';

export const getTesterOption = (): string|undefined => {
  const files = fs.readdirSync('.');
  const suffixes = Object.keys(testers);
  return suffixes.find(suffix => !!files.find(file => file.endsWith(suffix)));
};

export const getFileNameBySuffix = (suffix: string): string|undefined => {
  const files = fs.readdirSync('.');
  return files.find(el => el.endsWith(suffix));
};

export const getFileValidSuffix = (filename: string): string|undefined => {
  const suffixes = Object.keys(testers);
  return suffixes.find(suffix => filename.endsWith(suffix));
};