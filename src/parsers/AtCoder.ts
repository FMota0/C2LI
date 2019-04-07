import cheerio from 'cheerio';
import fetch from 'node-fetch';

class AtCoder implements Parser {
  baseUrl = 'https://atcoder.jp';

  public async parseProblem(problemId: string, contestId: string): Promise<ProblemTests> {
    return Promise.resolve([]);
  }

  public async parseContest(contestId: string): Promise<ContestTests> {
    const response = await fetch(this.buildContestUrl(contestId));
    const html = await response.text();
    const $ = cheerio.load(html);
    const problemIds: string[] = [];
    $('tbody tr td a').each((i, element) => {
      if(i%2 == 0) {
        const url = $(element).attr('href');
        const problemId = url.split('/').slice(-1)[0];
        problemIds.push(problemId);
      }
    });
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
      )
    });
    const contestTests: ContestTests = {};
    const promisesResults: [ProblemTests, ProblemId][] = await Promise.all(problemsPromises);
    promisesResults.forEach(result => contestTests[result[1]] = result[0])
    return contestTests;
  }

  public buildContestUrl(contestId: string): string {
    return `${this.baseUrl}/contests/${contestId}/tasks`;
  }
}

export default AtCoder;