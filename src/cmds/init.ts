import { Manager } from '../Manager';

export const command: string = ('init <problem>');
export const desc: string = ('parse a problem');
export const builder = (yargs:any) => {
  return yargs;
};
export const handler = (argv:any) => {
  Manager.parse(argv.problem);
};
