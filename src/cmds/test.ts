import testers from '../testers';
import { hasTests, readProblemTests } from '../utils';

export const command: string = 'test <testerOpt>';
export const desc: string = 'Test code against samples';
export const handler = ({ testerOpt = 'cpp' }: { testerOpt?: string }) => {
  if (!hasTests()) {
    console.log('No tests in current directory');
    return;
  }
  const tester: Tester = testers[testerOpt];
  const tests: ProblemTests = readProblemTests();
  tester.beforeAll();
  const results = tests.map((test: ProblemTest, i) => tester.execute(`${i}`, test));
  tester.afterAll();
  for (const i in results) {
    if (results[i].expectedOutput.trim() !== results[i].output.trim()) {
      console.log(`Wrong answer for test ${i}`);
      console.log('INPUT:');
      console.log(results[i].input);
      console.log('EXPECTED:');
      console.log(results[i].expectedOutput);
      console.log('OUTPUT:');
      console.log(results[i].output);
    } else {
      console.log(`Correct answer for test ${i}`);
    }
  }
};
