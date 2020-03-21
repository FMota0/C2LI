import chalk from 'chalk';
import yargs from 'yargs';

import testerBuilder from '../testers';
import { getFileValidSuffix } from '../testers/utils';

export const command: string = 'compile [source]';
export const desc: string = 'Execute beforeAll tester scrips';

export const builder = (yargs: yargs.Argv) => {
  return yargs
          .positional('source', {
            describe: 'Source where before all should be executed',
            type: 'string',
          });
};

interface CompileArgs {
  source: string;
}

export const handler = async (
  {
    source,
  }: CompileArgs,
) => {
  const suffix = getFileValidSuffix(source);
  if (!suffix) {
    console.log(chalk.red('Invalid source file type'));
    return;
  }
  const tester = testerBuilder(suffix, source);
  tester.beforeAll();
  console.log(chalk.green(`Runnable: ${tester.bin}`));
};
