import chalk from 'chalk';
import cliTable from 'cli-table';

import testers from '../testers';
import { hasTests, readProblemTests } from '../utils';

export const command: string = 'test <testerOpt>';
export const desc: string = 'Test code against samples';
export const handler = ({ testerOpt = 'cpp' }: { testerOpt?: string }) => {
  if (!hasTests()) {
    console.log('No tests in current directory');
    return;
  }
  const tester: Tester = testers[testerOpt];
  const tests: ProblemTests = readProblemTests();
  tester.beforeAll();
  const results = tests.map((test: ProblemTest, i) => tester.execute(`${i}`, test));
  tester.afterAll();
  const table = new cliTable(
    {
      head: [
        'Test',
        'Verdict',
        'Input',
        'Output',
        'Expected output',
      ],
    },
  );
  results.forEach((result: ExecutionResult, i) => {
    let verdict = chalk.green('Correct');
    if (result.expectedOutput.trim() !== result.output.trim()) {
      verdict = chalk.red('Incorrect');
    }
    table.push([`#${i}`, verdict, result.input, result.output, result.expectedOutput])
  })
  console.log(table.toString())
};
