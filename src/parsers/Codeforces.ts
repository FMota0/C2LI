import cheerio from 'cheerio';
import fs from 'fs';
import nodeFetch from 'node-fetch';

export class Codeforces implements Parser {
  urlBase = 'https://codeforces.com';

  public async parseProblem(idProblem: string): Promise<ProblemTests> {
    const urlAux: string = idProblem.replace(/-/g, '/');
    const urlProblemSet: string = '/problemset/problem';
    const finalUrl: string = this.urlBase + urlProblemSet + urlAux;
    const data = await this.getTestsProblem(finalUrl);
    return data
  }

  public async parseContest(idContest: string): Promise<ContestTests> {
    const urlAux: string = idContest.replace(/-/g, '/');
    const urlContest: string = '/contest';
    const finalUrl: string = this.urlBase + urlContest + urlAux;
    const data = await this.getContestProblems(finalUrl);
    return data
  }

  public async getTestsProblem(url: string): Promise<ProblemTests> {
    const data: ProblemTests = [];
    const html = await nodeFetch(url);
    const body = await html.text();
    const $ = cheerio.load(body);
    $('div.input').each((i, element) => {
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
      urls.push(this.urlBase + urlProblem);
    });
    const contestTests: ContestTests = {}
    for (const url of urls) {
      const problemTests: ProblemTests = await this.getTestsProblem(url);
      const problemId: ProblemId = url.split('/').slice(-1)[0]
      contestTests[problemId] = problemTests
    }
    return contestTests
  }
}
