import { execSync } from 'child_process';

import { getTemplatePath } from '../conf';

export const command: string = 'generate';
export const desc: string = 'Generate template of code in current directory';

export const handler = () => {
  const path = getTemplatePath();
  const fileName = path.split('/').slice(-1)[0];
  execSync(`cp ${path} ${fileName}`);
};
