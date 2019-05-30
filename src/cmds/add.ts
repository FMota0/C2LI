import readlineSync from 'readline-sync';
import yargs from 'yargs';

import {
  addProblemTest,
  readProblemTests,
  writeNewProblemsTest,
} from '../utils';

export const command: string = 'add';
export const desc: string = 'add tests for a specific problem';

interface AddArgs {
  'no-out': boolean;
}

export const builder = (yargs: yargs.Argv) => {
  return yargs
          .options({
            n: {
              alias: 'no-out',
              boolean: true,
              describe: 'Add test with unknown output',
              default: false,
            }
          });
};

export const handler = (
  {
    'no-out': inputOnly,
  }: AddArgs,
) => {
  const newTest: ProblemTest = {
    input : '',
  };
  console.log('Type the input of the new test');
  newTest.input = read();
  if (!inputOnly) {
    console.log('Type the output of the new test');
    newTest.output = read();
  }
  let problemTests:ProblemTests = readProblemTests();
  problemTests = addProblemTest(problemTests, newTest);
  writeNewProblemsTest(problemTests);
};

const read = () => {
  let result:string = '';
  while (true) {
    const answer:string = readlineSync.prompt({ prompt: '' });
    const endLine:string = '\n';
    if (answer === '') {
      return result.slice(0, result.length - 1);
    }
    result += answer + endLine;
  }
};
