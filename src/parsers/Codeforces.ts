import cheerio from 'cheerio';
import nodeFetch from 'node-fetch';

class Codeforces implements Parser {
  baseUrl = 'https://codeforces.com';

  public async parseProblem(idProblem: string, idContest: string): Promise<ProblemTests> {
    const requestUrl: string = `${this.baseUrl}/contest/${idContest}/problem/${idProblem}`;
    const data = await this.getTestsProblem(requestUrl);
    return data;
  }

  public async parseContest(idContest: string): Promise<ContestTests> {
    const contestUrl: string = `${this.baseUrl}/contest/${idContest}`;
    const data = await this.getContestProblems(contestUrl);
    return data;
  }

  public async getTestsProblem(url: string): Promise<ProblemTests> {
    const data: ProblemTests = [];
    const html = await nodeFetch(url);
    const body = await html.text();
    const $ = cheerio.load(body);
    $('div.input').each((i, element) => {
      $(element).find('br').replaceWith('\n');
      data[i] = {
        input: $(element).find('pre').text(),
        output: $(element).next().find('pre').text(),
      };
    });
    return data;
  }

  public async getContestProblems(url: string): Promise<ContestTests> {
    const data: ProblemTests = [];
    const html = await nodeFetch(url);
    const body = await html.text();
    const $ = cheerio.load(body);
    const urls: string[] = [];
    $('td.id').each((i, element) =>  {
      const urlProblem: string =  $(element).find('a').attr('href');
      urls.push(this.baseUrl + urlProblem);
    });
    const problemsPromises = urls.map((url) => {
      const problemId: ProblemId = url.split('/').slice(-1)[0];
      return new Promise<[ProblemTests, ProblemId]>(
        (resolve, reject) => {
          this
          .getTestsProblem(url)
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

export default Codeforces;
