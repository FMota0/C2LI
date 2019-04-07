import cliTable from 'cli-table';

import { readProblemTests } from '../utils';

export const command: string = 'show';
export const desc: string = 'Show tests in current directory';
export const handler = () => {
  const tests: ProblemTests = readProblemTests();
  const table = new cliTable(
    {
      head: [
        'Test',
        'Input',
        'Output',
      ],
    },
  );
  tests.forEach((test: ProblemTest, i) => table.push([`#${i}`, test.input, test.output]));
  console.log(table.toString());
};
