import yargs from 'yargs';

import { parseContest, parseProblem } from '../utils';

export const command: string = 'init <type> <parser> <contestId|problemId>';
export const desc: string = 'Init a directory structure';

export const builder = (yargs: yargs.Argv) => {
  return yargs
            .positional('type', {
              describe: 'Specify if should be initialized contest or problem',
              type: 'string',
              choices: [
                'contest',
                'problem',
              ],
            })
            .positional('parser', {
              describe: 'Parser to be used',
              type: 'string',
              choices: [
                'cf',
                'cfg',
                'atc',
              ],
            })
            .positional('contestId|problemId', {
              describe: 'Id that represents contest or problem',
              type: 'string',
            });
};

interface InitArgs {
  type: string;
  parser: string;
  contestId: string;
  problemId: string;
}

export const handler = (
  {
    type,
    parser,
    contestId,
    problemId,
  }: InitArgs
) => {
  if (type === 'contest') {
    parseContest(parser, contestId);
  } else {
    parseProblem(parser, problemId);
  }
}