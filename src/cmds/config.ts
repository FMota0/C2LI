import yargs from 'yargs';

export const command: string = 'config <command>';
export const desc: string = 'Manage c2li variables';

export const builder = (yargs: yargs.Argv) => {
  return yargs.commandDir('config_cmds', {
    extensions: ['js', 'ts'],
  });
};