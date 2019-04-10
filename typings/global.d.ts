interface ProblemTest {
  input: string;
  output: string;
}

type ProblemTests = ProblemTest[];

type ProblemId = string;

type ContestTests = Record<ProblemId, ProblemTests>;

type ExecutionResult = ProblemTest & { expectedOutput: string; };

interface Tester {
  beforeAll: () => void;
  execute: (id: string, x: ProblemTest) => ExecutionResult;
  afterAll: () => void;
}
