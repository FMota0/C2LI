export interface Parser {
  urlBase: string;
  parseProblem(urlProblem: string): void;
  parseContest(): void;
}
