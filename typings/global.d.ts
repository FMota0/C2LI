interface ProblemTest {
  input: string;
  output: string;
}

type ProblemTests = ProblemTest[];

type ProblemId = string;

type ContestTests = Record<ProblemId, ProblemTests>;

interface Parser {
  baseUrl: string;
  parseProblem: (idProblem: string, idcontest: string) => Promise<ProblemTests>;
  parseContest: (idContest: string) => Promise<ContestTests>;
}

type ExecutionResult = ProblemTest & { expectedOutput: string; };

interface Tester {
  beforeAll: () => void;
  execute: (id: string, x: ProblemTest) => ExecutionResult;
  afterAll: () => void;
}
