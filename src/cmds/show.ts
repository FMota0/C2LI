import { readProblemTests } from '../utils';

export const command: string = 'show';
export const desc: string = 'Show tests in current directory';
export const handler = () => {
  const tests: ProblemTests = readProblemTests();
  const out = tests.reduce(
    (acc: string, test: ProblemTest, i) => {
      const statement = `\nTEST ${i}\nInput:\n${test.input}\nOutput:\n${test.output}\n`;
      return acc + statement;
    },
    '',
  );
  console.log(out);
};
