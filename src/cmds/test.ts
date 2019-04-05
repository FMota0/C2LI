import CPP from '../testers/Cpp'
import { hasTests, readProblemTests } from '../utils'

export const command: string = 'test';
export const desc: string = 'Test code against samples';
export const handler = () => {
  if (!hasTests()) {
    console.log('No tests in current directory');
    return;
  }
  const cpp: Tester = new CPP();
  const tests: ProblemTests = readProblemTests();
  cpp.beforeAll();
  const results = tests.map((test: ProblemTest, i) => cpp.execute(`${i}`, test));
  cpp.afterAll();
  for(const i in results) {
    if(results[i].expectedOutput.trim() != results[i].output.trim()) {
      console.log(`Wrong answer for test ${i}`)
      console.log('INPUT:')
      console.log(results[i].input)
      console.log('EXPECTED:')
      console.log(results[i].expectedOutput)
      console.log('OUTPUT:')
      console.log(results[i].output)
    } else {
      console.log(`Correct answer for test ${i}`)
    }
  }
};
