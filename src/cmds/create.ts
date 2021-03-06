import chalk from 'chalk';
import yargs from 'yargs';

import {
  writeContestTests,
  writeProblemTests,
} from '../utils';

interface CreateArgs {
  name: string;
  problems: number;
}

export const command: string = 'create <name>';
export const desc: string = 'Create directory structure for adding tests';

export const builder = (yargs: yargs.Argv) => {
  return yargs
          .positional('name', {
            describe: 'Name of directory to be created',
            type: 'string',
          })
          .option('p', {
            alias: 'problems',
            describe: 'Number of problems, if the directory shgould represent a contest',
            type: 'number',
            default: 0,
          });
};

export const handler = (
  {
    name,
    problems,
  }: CreateArgs,
) => {
  if (problems < 0) {
    console.log(chalk.red('Invalid number of problems'));
    process.exit(0);
  }

  if (problems > 0) {
    const contestTests: ContestTests = {};
    Array(problems).fill(0).forEach((_, i) => contestTests[String.fromCharCode(i + 65)] = []);
    writeContestTests(name, contestTests);
  } else {
    writeProblemTests(name, []);
  }
};
