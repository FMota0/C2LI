import { spawnSync, spawn, ChildProcess, SpawnOptions } from 'child_process';

import { getTimeLimit } from '../conf';
import { getFileNameBySuffix } from './utils';
import chalk from 'chalk';

abstract class AbstractTester implements Tester {
  public child: ChildProcess | null = null;
  public suffix: TesterSuffix;
  public path?: string;
  public bin: string;

  constructor(suffix: TesterSuffix, path?: string){
    this.suffix = suffix;
    this.path = path || getFileNameBySuffix(suffix);
    this.bin = `prg_${Math.floor(Math.random() * 0x1000).toString(16)}`;
  }

  public abstract beforeAll: () => void;
  public abstract afterAll: () => void;

  public execute(test: ProblemTest): Promise<ExecutionResult> {
    return new Promise((resolve, reject) => {
      const start = new Date().getTime();
      const { command, args } = this.getExecutionCommand();
      try {
        const result = spawnSync(command, args, {
          input: test.input,
          timeout: getTimeLimit(),
        });
        const end = new Date().getTime();
        const executionTime = (end - start) / 1000;
        let timedOut = false;
        let runtimeError = false;
        if (result.error) {
          // @ts-ignore
          if (result.error.code === 'ETIMEDOUT') {
            timedOut = true;
          }
        } else if (result.status !== 0) {
          runtimeError = true;
        }
        resolve({
          timedOut,
          runtimeError,
          id: test.id,
          executionTime,
          input: test.input,
          output: test.output,
          executionOutput: result.stdout.toString(),
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  public async executeAll(tests: ProblemTests): Promise<Array<ExecutionResult>> {
    try {
      this.beforeAll();
    } catch (e) {
      console.log(chalk.red('COMPILATION ERROR'));
      console.log(chalk.redBright(e.message));
      return [];
    }
    try {
      const results = await Promise.all(tests.map(t => this.execute(t)));
      this.afterAll();
      return results;
    } catch (e) {
      console.log(chalk.red('ERROR'));
      console.log(e);
    }
    this.afterAll();
    return [];
  }

  public spawn(options: SpawnOptions) {
    try {
      this.beforeAll();
    } catch (e) {
      console.log(chalk.red('COMPILATION ERROR'));
      console.log(chalk.redBright(e.message));
      return;
    }
    const { command, args } = this.getExecutionCommand();
    this.child = spawn(command, args, options);
    this.afterAll();
  }

  public abstract getExecutionCommand: () => ExecutionCommand;
}

export default AbstractTester;
