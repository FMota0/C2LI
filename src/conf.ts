import configstore from 'configstore';
import { name } from '../package.json';

const store = new configstore(name);

export const setTemplatePath = (path: string) => store.set('templatePath', path);

export const getTemplatePath = (): string => store.get('templatePath');

export const setters: Record<string, (x: any) => void> = {
  template: setTemplatePath,
};

export const getters: Record<string, () => any> = {
  template: getTemplatePath,
};
