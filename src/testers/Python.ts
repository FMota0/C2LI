import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';

class Python implements Tester {
  public beforeAll = () => null;

  public execute = (id: string, test: ProblemTest): ExecutionResult => {
    writeFileSync(`tmp_in${id}`, test.input);
    execSync(`python p.py <tmp_in${id} >tmp_out${id}`);
    const output = readFileSync(`tmp_out${id}`, 'utf-8');
    execSync(`rm tmp_in${id} tmp_out${id}`);
    return {
      output,
      expectedOutput: test.output,
      input: test.input,
    };
  }

  public afterAll = () => null;
}

export default Python;
