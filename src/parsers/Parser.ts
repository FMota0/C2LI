export interface Parser {
  urlBase: string;
  parseProblem(idProblem: string): void;
  parseContest(idContest: string): void;
}
