import chalk from 'chalk';

import { getTesterOption } from '../testers/utils';
import testerBuilder from '../testers';

export const command: string = 'run';

export const desc: string = 'Run code';

export const handler = () => {
  const testerOpt = getTesterOption();
  if (!testerOpt) {
    console.log(chalk.red('NO CODE FOUND'));
    return;
  }
  const tester: Tester = testerBuilder(testerOpt);
  tester.spawn();
};
