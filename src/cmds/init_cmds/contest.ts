import yargs from 'yargs';

import { parseContest } from '../../utils';

export const command: string = 'contest <parser> <contestId>';
export const desc: string = 'Init a directory structure for contest';

export const builder = (yargs: yargs.Argv) => {
  return yargs
            .positional('parser', {
              describe: 'Parser to be used',
              type: 'string',
              choices: [
                'cf',
                'cfg',
                'atc',
                'uri',
              ],
            })
            .positional('contestId', {
              describe: 'Id that represents contest',
              type: 'string',
            });
};

interface InitArgs {
  parser: string;
  contestId: string;
}

export const handler = (
  {
    parser,
    contestId,
  }: InitArgs,
) => {
  parseContest(parser, contestId);
};
