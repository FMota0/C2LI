import CPP from '../testers/Cpp'
import { readProblemTests } from '../utils'

export const command: string = 'test';
export const desc: string = 'Test code against samples';
export const handler = () => {
  const cpp: Tester = new CPP();
  const tests: ProblemTests = readProblemTests()
  cpp.beforeAll();
  const results = tests.map((test: ProblemTest, i) => cpp.execute(`${i}`, test))
  cpp.afterAll();
  for(const result of results) {
    console.log(result)
  }
};
