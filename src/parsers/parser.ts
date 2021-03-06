import chalk from 'chalk';
import { sleep } from '../utils';

abstract class Parser {
  baseUrl: string = '';
  public abstract buildProblemUrl: (problemId: string, contestId?: string) => string;
  public abstract buildContestUrl: (contestId: string) => string;
  public abstract getContestProblems: (contestId: string) => Promise<string[]>;
  public abstract parseProblem: (problemId: string, contestId?: string) => Promise<ProblemTests>;
  public async parseContest(contestId: string): Promise<ContestTests> {
    console.log(`Start to parse ${contestId}`);
    let problemIds: string[]; 
    do {
      await sleep(2500); // try to fetch every 2.5 seconds
      problemIds = await this.getContestProblems(contestId);
      console.log(`Found ${problemIds.length} problems`);
    } while(problemIds.length == 0);
    const problemsPromises = problemIds.map((problemId) => {
      return new Promise<[ProblemTests, ProblemId]>(
        (resolve, reject) => {
          console.log(chalk.blueBright(`Parsing problem ${problemId}`));
          this
          .parseProblem(problemId, contestId)
          .then(
            (problemTests: ProblemTests) => {
              const status = `Parsed ${problemId} with success`;
              const cases = `Found ${problemTests.length} cases`;
              console.log(chalk.green(`${status}. ${cases}`));
              resolve([problemTests, problemId]);
            },
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
