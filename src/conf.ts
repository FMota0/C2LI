import Configstore from 'configstore';
import { name } from '../package.json';

const store = new Configstore(name);

export const setTemplatePath = (path: string) => store.set('templatePath', path);

export const getTemplatePath = () => store.get('templatePath');
