import fs from 'fs';

import parsers from './parsers';

export const writeContestTests = (contestId: string, contestTests: ContestTests) => {
  if (!fs.existsSync(contestId)) {
    fs.mkdirSync(contestId);
  }

  const problems = Object.keys(contestTests);
  problems.forEach(problem => writeProblemTests(problem, contestTests[problem], contestId));
};

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
  fs.writeFileSync(testsDirectory + fileName, JSON.stringify(problemTests));
};

const TESTS_FILE = '.tests.json';

export const hasTests = (path: string = './'): boolean => {
  return fs.existsSync(`${path}/${TESTS_FILE}`);
};

export const readProblemTests = (path: string = './'): ProblemTests => {
  if (!hasTests(path)) {
    return [];
  }

  const raw = fs.readFileSync(`${path}/${TESTS_FILE}`, 'utf8');
  const tests = JSON.parse(raw) as ProblemTests;
  return tests;
};

export const addProblemTest = (problemTests:ProblemTests, newTest:ProblemTest) => {
  problemTests.push(newTest);
  return problemTests;
};

export const writeNewProblemsTest = (problemTests:ProblemTests) => {
  fs.writeFileSync(TESTS_FILE, JSON.stringify(problemTests));
};

export const parseContest = async (judge: string, contestId: string) => {
  const parser = parsers[judge];
  const contestTests: ContestTests = await parser.parseContest(contestId);
  writeContestTests(contestId, contestTests);
};

export const parseProblem = async (judge: string, contestId: string, problemId: string) => {
  const parser = parsers[judge];
  const problemTests: ProblemTests = await parser.parseProblem(problemId, contestId);
  writeProblemTests(contestId + problemId, problemTests);
};
