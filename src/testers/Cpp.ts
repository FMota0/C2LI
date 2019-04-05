import { execSync } from 'child_process'
import { readFileSync, writeFileSync } from 'fs'

class CPP implements Tester {
  public beforeAll = () => {
    execSync('g++ -std=c++17 code.cpp -o program')
  }

  public execute = (id: string, test: ProblemTest): ExecutionResult => {
    writeFileSync(`tmp_in${id}`, test.input)
    execSync(`./program <tmp_in${id} >tmp_out${id}`)
    const output = readFileSync(`tmp_out${id}`, 'utf-8')
    return {
      expectedOutput: test.output,
      input: test.input,
      output,
    }
  }

  public afterAll = () => {
    execSync('rm program')
  }
}

export default CPP