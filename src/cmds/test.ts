import { execSync } from 'child_process'

export const command: string = 'test';
export const desc: string = 'Test code against samples';
export const handler = () => {
  const stdout = execSync('ls', { encoding: 'utf-8' })
  console.log(stdout)
};
