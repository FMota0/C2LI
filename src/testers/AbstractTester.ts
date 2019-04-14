import { spawnSync } from "child_process";

abstract class AbstractTester implements Tester {
  public abstract beforeAll: () => void;
  public abstract afterAll: () => void;
  public execute(id: string, test: ProblemTest): ExecutionResult {
    const start = new Date().getTime();
    const { command, args } = this.getExecutionCommand();
    const result = spawnSync(command, args, {
      input: test.input,
      timeout: 1000,
    });
    const end = new Date().getTime();
    const executionTime = (end - start)/1000;
    if (result.error) {
      console.log(result.error);
      process.exit(0);
    }
    return {
      input: test.input,
      expectedOutput: test.output,
      output: result.stdout.toString(),
      timedOut: false,
      executionTime,
    };
  };
  public abstract getExecutionCommand: () => ExecutionCommand;
}

export default AbstractTester;