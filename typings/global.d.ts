interface ProblemTest {
  input: string;
  output: string;
}

type ProblemTests = ProblemTest[];

type ProblemId = string;

type ContestTests = Record<ProblemId, ProblemTests>;

interface Parser {
  urlBase: string;
  parseProblem: (idProblem: string, idcontest: string) => Promise<ProblemTests>;
  parseContest: (idContest: string) => Promise<ContestTests>;
}
