import inquirer from 'inquirer';

import { 
  addProblemTest, 
  readProblemTests,
  writeNewProblemsTest,
} from '../utils'

export const command: string = 'add';
export const desc: string = 'add tests for a specific problem';
export const handler = () => {
  const question = [
    {
      type: 'input',
      name : 'input',
      message:'Type the input of the new tests',
    },
    {
      type:'input',
      name:'output',
      message:'type the expected output of the new tests',
    },
  ];
  inquirer
    .prompt(question)
    .then((newTest) => {
      let problemTests: ProblemTests = readProblemTests();
      problemTests = addProblemTest(problemTests, newTest as ProblemTest);
      writeNewProblemsTest(problemTests);
    });
};
