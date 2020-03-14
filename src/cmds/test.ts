import chalk from 'chalk';
import cliTable from 'cli-table';
import yargs from 'yargs';

import testerBuilder from '../testers';
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
          ids: {
            type: 'array',
            describe: "Specify the exact tests you want to run, splitting their positions in spaces"
          }
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
  ids: number[];
}

export const handler = (
    {
      testsPath,
      lean,
      ids,
    }: TestArgs,
  ) => {
  if (!hasTests(testsPath)) {
    console.log(`No tests in ${testsPath}`);
    return;
  }
  const testerOpt: TesterSuffix|undefined = getTesterOption();
  if (!testerOpt) {
    console.log(chalk.red('NO CODE FOUND'));
    return;
  }
  let shouldSelectTests = false;
  if (ids && ids.length > 0){
    shouldSelectTests = true;
    ids = ids.sort((a,b) => a-b);
    if (ids[0] < 0){
      console.log('You should only insert non-negative integers at the exact tests flag numbers');
      return;
    }
  }
  const tester: Tester = testerBuilder(testerOpt);
  const tests: ProblemTests = readProblemTests(testsPath);
  tester.beforeAll();
  const results = tests.filter((e,i) => { //filtering unselected tests in case of flag passed
    if (shouldSelectTests)
      return ids.includes(i)  
    return true
    })
    .map((test: ProblemTest, i) => {
      return tester.execute(`${i}`, test)
    });
  tester.afterAll();
  const head = [
    'Test',
    'Verdict',
    'Time (ms)',
  ];
  if (!lean) {
    head.push('Input');
    head.push('Expected output');
    head.push('Your output');
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
    } else if (!result.output) {
      verdict = chalk.gray('UNKNOWN');
    } else if (result.executionOutput.trim() !== result.output.trim()) {
      verdict = chalk.red('Incorrect');
    }
    const line = [`#${i}`, verdict, result.executionTime];
    if (!lean) {
      line.push(result.input);
      line.push(result.output || '');
      line.push(result.executionOutput);
    }
    table.push(line);
  });
  console.log(table.toString());
};
