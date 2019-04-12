import yargs from 'yargs';

import {
  parseProblem,
  parseContest,
} from '../utils';

interface InitArgs {
  judge: string;
  contest: string;
  problem?: string;
}

export const command: string = 'init <judge> <contest> [problem]';
export const desc: string = 'parse a problem';

export const builder = (yargs: yargs.Argv) => {
  return yargs
          .positional('judge', {
            describe: 'Judge',
            type: 'string',
          })
          .positional('contest', {
            describe: 'Contest id',
            type: 'string',
          })
          .positional('problem', {
            describe: 'Problem id',
            type: 'string',
          });
};

export const handler = (
  {
    judge,
    contest,
    problem,
  }: InitArgs,
) => {
  if (problem) {
    parseProblem(judge, contest, problem);
  } else {
    parseContest(judge, contest);
  }
};
