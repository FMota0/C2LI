import fs from 'fs';

export const writeContestTests = (tags: string[], contestTests: ContestTests) => {
  if (!fs.existsSync(tags[1])) {
    fs.mkdirSync(tags[1]);
  }

  const problems = Object.keys(contestTests);
  problems.forEach(problem => writeProblemTests(['', '', problem], contestTests[problem], tags[1]));
};

export const writeProblemTests = (tags: string[],
                                  problemTests: ProblemTests,
                                  directory?: string) => {
  let testsDirectory = null;
  if (directory) {
    testsDirectory = `./${directory}/${tags[2]}`;
  } else {
    testsDirectory = `./${tags[1] + tags[2]}`;
  }

  if (!fs.existsSync(testsDirectory)) {
    fs.mkdirSync(testsDirectory);
  }
  const fileName: string = '/.tests.json';
  fs.writeFileSync(testsDirectory + fileName, JSON.stringify(problemTests));
};

const TESTS_FILE = './.tests.json';

export const hasTests = (): boolean => {
  return fs.existsSync(TESTS_FILE)
}

export const readProblemTests = (): ProblemTests => {
  if (!hasTests()) {
    return [];
  }

  const raw = fs.readFileSync(TESTS_FILE, 'utf8');
  const tests = JSON.parse(raw) as ProblemTests;
  return tests;
};
