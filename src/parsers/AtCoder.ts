import cheerio from 'cheerio';
import fetch from 'node-fetch';

class AtCoder implements Parser {
  baseUrl = 'https://atcoder.jp';

  public async parseProblem(problemId: string, contestId: string): Promise<ProblemTests> {
    const response = await fetch(this.buildProblemUrl(problemId, contestId));
    const html = await response.text();
    const $ = cheerio.load(html);
    const tests: ProblemTests = [];
    $('.io-style .part').removeClass();
    const pre: string[] = [];
    $('.lang-en .part section pre').each((_, element) => {
      pre.push($(element).text());
    });
    pre.forEach((_, i) => {
      if (i%2 == 0) {
        tests[i/2] = {
          input: pre[i],
          output: pre[i+1],
        }
      }
    });
    return tests
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

  public buildProblemUrl(problemId: string, contestId: string): string {
    return `${this.buildContestUrl(contestId)}/${problemId}`
  }

  public buildContestUrl(contestId: string): string {
    return `${this.baseUrl}/contests/${contestId}/tasks`;
  }
}

export default AtCoder;