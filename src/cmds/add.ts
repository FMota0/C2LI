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
  const endLine:string = '\n';
  const newTest:ProblemTest = {
    input : '',
    output: '',
  };
  console.log('Type the input of the new test');
  while (true) {
    const answer:string = readlineSync.prompt();
    if (answer === '') {
      console.log(newTest);
      break;
    }
    newTest.input += answer + endLine;
  }
};
