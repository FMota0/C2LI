import yargs from 'yargs';

import { parseContest } from '../../utils';

export const command: string = 'init contest <judge> <contestId>';

export const desc: string = 'Parse contest tests';

interface ContestArgs {
  judge: string;
  contestId: string;
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
          .positional('contestId', {
            describe: 'Identifier of contest',
            type: 'string',
          });
}

export const handler = (
  {
    contestId,
    judge,
  }: ContestArgs,
) => {
  parseContest(judge, contestId);
};
