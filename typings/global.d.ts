interface ProblemTest {
  input: string;
  output: string;
}

type ProblemTests = ProblemTest[];

type ProblemId = string;

type ContestTests = Record<ProblemId, ProblemTests>;

interface ExecutionCommand {
  command: string;
  args: string[];
}

interface ExecutionResult extends ProblemTest {
  expectedOutput: string;
  timedOut: boolean;
  runtimeError: boolean;
  executionTime: number;
}

interface Tester {
  beforeAll: () => void;
  execute: (id: string, x: ProblemTest) => ExecutionResult;
  afterAll: () => void;
  spawn: () => void;
}
