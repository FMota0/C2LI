import chalk from 'chalk';
import cliTable from 'cli-table';
import yargs from 'yargs';

import testers from '../testers';
import { hasTests, readProblemTests } from '../utils';
import { getTesterOption } from '../testers/utils';

export const command: string = 'test [tester]';
export const desc: string = 'Test code against samples';
export const builder = (yargs: yargs.Argv) => {
  return yargs
        .options({
          l: {
            alias: 'lean',
            boolean: true,
            describe: 'Show lean table',
            default: false,
          },
          t: {
            alias: 'testsPath',
            type: 'string',
            describe: 'Path to tests, by default the tests gonna be searched in current directory',
          },
        });
};

const LEAN_TABLE_CONFIG = {
  chars: { top: '' , 'top-mid': '' , 'top-left': '' , 'top-right': ''
         , bottom: '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': ''
         , left: '' , 'left-mid': '' , mid: '' , 'mid-mid': ''
         , right: '' , 'right-mid': '' , middle: ' ' },
  style: { 'padding-left': 0, 'padding-right': 0 },
};

interface TestArgs {
  testsPath: string;
  lean: boolean;
}

export const handler = (
    {
      testsPath,
      lean,
    }: TestArgs,
  ) => {
  if (!hasTests(testsPath)) {
    console.log(`No tests in ${testsPath}`);
    return;
  }
  const testerOpt = getTesterOption();
  if (!testerOpt) {
    console.log(chalk.red('NO CODE FOUND'));
    return;
  }
  const tester: Tester = testers[testerOpt];
  const tests: ProblemTests = readProblemTests(testsPath);
  tester.beforeAll();
  const results = tests.map((test: ProblemTest, i) => tester.execute(`${i}`, test));
  tester.afterAll();
  const head = [
    'Test',
    'Verdict',
    'Time (ms)',
  ];
  if (!lean) {
    head.push('Input');
    head.push('Output');
    head.push('Expected output');
  }
  const table = new cliTable(
    {
      head: head.map(e => chalk.gray(e)),
      ...(lean ? LEAN_TABLE_CONFIG : {}),
    },
  );
  results.forEach((result: ExecutionResult, i) => {
    let verdict = chalk.green('Correct');
    if (result.timedOut) {
      verdict = chalk.blueBright('TLE');
    } else if (result.runtimeError) {
      verdict = chalk.yellow('RTE');
    } else if (result.expectedOutput.trim() !== result.output.trim()) {
      verdict = chalk.red('Incorrect');
    }
    const line = [`#${i}`, verdict, result.executionTime];
    if (!lean) {
      line.push(result.input);
      line.push(result.output);
      line.push(result.expectedOutput);
    }
    table.push(line);
  });
  console.log(table.toString());
};
