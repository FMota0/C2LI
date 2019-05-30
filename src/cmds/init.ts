import yargs from 'yargs';

export const command: string = 'init <command>';
export const desc: string = 'Init directory structure';

export const builder = (yargs: yargs.Argv) => {
  return yargs.commandDir('init_cmds', {
    extensions: ['js', 'ts'],
  });
};
