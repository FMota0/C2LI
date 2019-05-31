import configstore from 'configstore';
import { name } from '../package.json';

import { DEFAULT_TIMEOUT_MS } from './testers/constants';

const store = new configstore(name);

export const setTemplatePath = (path: string) => store.set('templatePath', path);

export const getTemplatePath = (): string => store.get('templatePath');

export const setTimeLimit = (timeLimit: string) => store.set('TIME_LIMIT', timeLimit);

export const getTimeLimit = (): number => parseInt(store.get('TIME_LIMIT')) || DEFAULT_TIMEOUT_MS;

export const setters: Record<string, (x: any) => void> = {
  template: setTemplatePath,
  tl: setTimeLimit,
};

export const getters: Record<string, () => any> = {
  template: getTemplatePath,
  tl: getTimeLimit,
};
