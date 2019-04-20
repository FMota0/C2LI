import yargs from 'yargs';

import { setters } from '../../conf';

export const command: string = 'set <key> <value>';
export const desc: string = 'Manage c2li variables';

interface SetArgs {
  key: string;
  value: string;
}

export const builder = (yargs: yargs.Argv) => {
  return yargs
          .positional('key', {
            type: 'string',
            desc: 'Variable to be set',
            choices: Object.keys(setters),
          })
          .positional('value', {
            type: 'string',
            desc: 'Value that variable should receive',
          });
}

export const handler = (
  {
    key,
    value,
  }: SetArgs,
) => {
  setters[key](value);
};