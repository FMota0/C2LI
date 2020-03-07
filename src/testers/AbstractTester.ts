import { spawnSync, spawn, ChildProcess } from 'child_process';

import { getTimeLimit } from '../conf';
import { getFileNameBySuffix } from './utils';

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

  public execute(_: string, test: ProblemTest): ExecutionResult {
    const start = new Date().getTime();
    const { command, args } = this.getExecutionCommand();
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
    return {
      timedOut,
      runtimeError,
      executionTime,
      input: test.input,
      output: test.output,
      executionOutput: result.stdout.toString(),
    };
  }

  public spawn() {
    this.beforeAll();
    const { command, args } = this.getExecutionCommand();
    this.child = spawn(command, args, {
      timeout: getTimeLimit(),
    });
  }

  public abstract getExecutionCommand: () => ExecutionCommand;
}

export default AbstractTester;
