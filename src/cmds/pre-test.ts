import yargs from 'yargs';

import testerBuilder from '../testers';

export const command: string = 'pre-test [tester]';
export const desc: string = 'Execute beforeAll tester scrips';

export const builder = (yargs: yargs.Argv) => {
  return yargs
          .positional('tester', {
            describe: 'Tester that should be used to run beforeAll scripts',
            default: 'cpp',
            type: 'string',
          });
};

interface PreTestArgs {
  tester: string;
}

export const handler = (
  {
    tester: testerOpt,
  }: PreTestArgs,
) => {
  const tester = testerBuilder(testerOpt as TesterSuffix);
  tester.beforeAll();
};
