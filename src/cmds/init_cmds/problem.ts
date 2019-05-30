import yargs from 'yargs';

import { parseProblem } from '../../utils';

export const command: string = 'problem <parser> <problemId>';
export const desc: string = 'Init a directory structure for a problem';

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
            .positional('problemId', {
              describe: 'Id that represents problem',
              type: 'string',
            });
};

interface InitArgs {
  parser: string;
  problemId: string;
}

export const handler = (
  {
    parser,
    problemId,
  }: InitArgs,
) => {
  parseProblem(parser, problemId);
};
