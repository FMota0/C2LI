import readlineSync from 'readline-sync';

import {
  addProblemTest,
  readProblemTests,
  writeNewProblemsTest,
} from '../utils';

export const command: string = 'add';
export const desc: string = 'add tests for a specific problem';
export const handler = () => {
  const newTest:ProblemTest = {
    input : '',
    output: '',
  };
  console.log('Type the input of the new test');
  newTest.input = read();
  console.log('Type the output of the new test');
  newTest.output = read();
  let problemTests:ProblemTests = readProblemTests();
  problemTests = addProblemTest(problemTests, newTest);
  writeNewProblemsTest(problemTests);
};

const read = () => {
  let result:string = '';
  while (true) {
    const answer:string = readlineSync.prompt({prompt: ''});
    const endLine:string = '\n';
    if (answer === '') {
      return result.slice(0, result.length - 1);
    }
    result += answer + endLine;
  }
};
