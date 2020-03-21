import chalk from 'chalk';

import { getTesterOption, getFileValidSuffix } from '../testers/utils';
import testerBuilder from '../testers';

export const command: string = 'run [source]';

export const desc: string = 'Run code';

interface RunArgs {
  source: string;
};

export const handler = async (
  {
    source
  }: RunArgs
) => {
  const testerOpt = source ? getFileValidSuffix(source) : getTesterOption();
  if (!testerOpt) {
    console.log(chalk.red('NO CODE FOUND'));
    return;
  }
  const tester: Tester = testerBuilder(testerOpt, source);
  tester.spawn({
    stdio: 'inherit',
  });
};
