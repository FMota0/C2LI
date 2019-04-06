import Manager from '../Manager';

export const command: string = 'init <problem>';
export const desc: string = 'parse a problem';
export const handler = (argv:any) => {
  const manager = new Manager();
  manager.parse(argv.problem);
};
