import chalk from 'chalk';
import yargs from 'yargs';

import { readProblemTests, writeNewProblemsTest } from '../utils';

export const command: string = 'remove <caseId>';

export const desc: string = 'Remove a test case';

interface RemoveArgs {
  caseId: number;
}

export const builder = (yargs: yargs.Argv) => {
  return yargs
          .positional('caseId', {
            type: 'number',
          });
};

export const handler = (
  {
    caseId,
  }: RemoveArgs,
) => {
  const problemTests: ProblemTests = readProblemTests();
  if (caseId < 0 || caseId >= problemTests.length) {
    console.log(chalk.red('INVALID CASE ID'));
    return;
  }
  problemTests.splice(caseId, 1);
  writeNewProblemsTest(problemTests);
};
