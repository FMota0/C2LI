import { spawnSync } from 'child_process';

import { DEFAULT_TIMEOUT_MS } from './constants';

abstract class AbstractTester implements Tester {
  public abstract beforeAll: () => void;
  public abstract afterAll: () => void;
  public execute(_: string, test: ProblemTest): ExecutionResult {
    const start = new Date().getTime();
    const { command, args } = this.getExecutionCommand();
    const result = spawnSync(command, args, {
      input: test.input,
      timeout: DEFAULT_TIMEOUT_MS,
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
      expectedOutput: test.output,
      output: result.stdout.toString(),
    };
  }

  public abstract getExecutionCommand: () => ExecutionCommand;
}

export default AbstractTester;
