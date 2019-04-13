import readlineSync from 'readline-sync';

import {
  addProblemTest,
  readProblemTests,
  writeNewProblemsTest,
} from '../utils';

export const command: string = 'add';
export const desc: string = 'add tests for a specific problem';
export const handler = () => {
  const manager = new Manager();
  const newTest:ProblemTest = {
    input : '',
    output: '',
  };
  console.log('Type the input of the new test');
  newTest.input = read();
  console.log('Type the output of the new test');
  newTest.output = read();
  manager.addTest(newTest);
};

const read = () => {
  let result:string = '';
  while (true) {
    const answer:string = readlineSync.prompt();
    const endLine:string = '\n';
    if (answer === '') {
      return result;
    }
    result += answer + endLine;
  }
};
