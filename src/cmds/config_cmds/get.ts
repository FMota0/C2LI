import yargs from 'yargs';

import { getters } from '../../conf';

export const command: string = 'get <key>';
export const desc: string = 'Manage c2li variables';

interface GetArgs {
  key: string;
}

export const builder = (yargs: yargs.Argv) => {
  return yargs
          .positional('key', {
            type: 'string',
            desc: 'Variable to be set',
            choices: Object.keys(getters),
          });
};

export const handler = (
  {
    key,
  }: GetArgs,
) => {
  console.log(getters[key]());
};
