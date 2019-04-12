abstract class Parser {
  baseUrl: string = '';
  public abstract buildProblemUrl: (problemId: string, contestId: string) => string;
  public abstract buildContestUrl: (contestId: string) => string;
  public abstract getContestProblems: (contestId: string) => Promise<string[]>;
  public abstract parseProblem: (problemId: string, contestId: string) => Promise<ProblemTests>;
  public async parseContest(contestId: string): Promise<ContestTests> {
    const problemIds: string[] = await this.getContestProblems(contestId);
    const problemsPromises = problemIds.map((problemId) => {
      return new Promise<[ProblemTests, ProblemId]>(
        (resolve, reject) => {
          this
          .parseProblem(problemId, contestId)
          .then(
            (problemTests: ProblemTests) => resolve([problemTests, problemId]),
          )
          .catch(
            reject,
          );
        },
      );
    });
    const contestTests: ContestTests = {};
    const promisesResults: [ProblemTests, ProblemId][] = await Promise.all(problemsPromises);
    promisesResults.forEach(result => contestTests[result[1]] = result[0]);
    return contestTests;
  }
}

export default Parser;
