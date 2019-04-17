import yargs from 'yargs';

import { parseProblem } from '../../utils';

export const command: string = 'init problem <judge> <problemId>';

export const desc: string = 'Parse problem tests';

interface ContestArgs {
  judge: string;
  problemId: string;
}

export const builder = (yargs: yargs.Argv) => {
  return yargs.
          positional('judge', {
            describe: 'Judge that the contest belongs',
            type: 'string',
            choices: [
              'cf',
              'cfg',
              'atc',
            ],
          })
          .positional('problemId', {
            describe: 'Identifier of problem',
            type: 'string',
          });
}

export const handler = (
  {
    judge,
    problemId,
  }: ContestArgs,
) => {
  parseProblem(judge, problemId);
};
