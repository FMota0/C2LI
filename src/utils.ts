import chalk from 'chalk';
import fs from 'fs';

import parsers from './parsers';

export const writeContestTests = (contestId: string, contestTests: ContestTests) => {
  if (!fs.existsSync(contestId)) {
    fs.mkdirSync(contestId);
  }

  const problems = Object.keys(contestTests);
  problems.forEach(problem => writeProblemTests(problem, contestTests[problem], contestId));
};

const tests2string = (tests: ProblemTests) => JSON.stringify(tests, null, 2);

export const writeProblemTests = (problemId: string,
                                  problemTests: ProblemTests,
                                  directory?: string) => {
  let testsDirectory = null;
  if (directory) {
    testsDirectory = `./${directory}/${problemId}`;
  } else {
    testsDirectory = `./${problemId}`;
  }

  if (!fs.existsSync(testsDirectory)) {
    fs.mkdirSync(testsDirectory);
  }
  const fileName: string = '/.tests.json';
  fs.writeFileSync(testsDirectory + fileName, tests2string(problemTests));
};

const TESTS_FILE = './.tests.json';

export const hasTests = (): boolean => {
  return fs.existsSync(TESTS_FILE);
};

export const readProblemTests = (): ProblemTests => {
  if (!hasTests()) {
    return [];
  }

  const raw = fs.readFileSync(TESTS_FILE, 'utf8');
  const tests = JSON.parse(raw) as ProblemTests;
  return tests;
};

export const addProblemTest = (problemTests:ProblemTests, newTest:ProblemTest) => {
  problemTests.push(newTest);
  return problemTests;
};

export const writeNewProblemsTest = (problemTests:ProblemTests) => {
  fs.writeFileSync(TESTS_FILE, tests2string(problemTests));
};

export const parseContest = async (chosenParser: string, contestId: string) => {
  const parser = parsers[chosenParser];
  const contestTests: ContestTests = await parser.parseContest(contestId);
  writeContestTests(contestId, contestTests);
};

export const parseProblem = async (chosenParser: string, problemId: string) => {
  const parser = parsers[chosenParser];
  const problemTests: ProblemTests = await parser.parseProblem(problemId);
  writeProblemTests(chosenParser + problemId, problemTests);
};

export const handleInvalidContestId = (contestId: string | undefined) => {
  if (!contestId) {
    console.log(chalk.red('Not possible to get problem using only problemId'));
    process.exit(0);
  }
}