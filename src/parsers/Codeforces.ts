import cheerio from 'cheerio';
import nodeFetch from 'node-fetch';

import Parser from './Parser';

class Codeforces extends Parser {
  baseUrl = 'https://codeforces.com';

  public parseProblem = async (problemId: string, contestId: string): Promise<ProblemTests> => {
    const response = await nodeFetch(this.buildProblemUrl(problemId, contestId));
    const html = await response.text();
    const $ = cheerio.load(html);
    const tests: ProblemTests = [];
    $('div.input').each((i, element) => {
      $(element).find('br').replaceWith('\n');
      tests[i] = {
        input: $(element).find('pre').text(),
        output: $(element).next().find('pre').text(),
      };
    });
    return tests;
  }

  public getContestProblems = async (contestId: string): Promise<string[]> => {
    const html = await nodeFetch(this.buildContestUrl(contestId));
    const body = await html.text();
    const $ = cheerio.load(body);
    const problemIds: string[] = [];
    $('td.id').each((i, element) =>  {
      const url: string =  $(element).find('a').attr('href');
      const problemId = url.split('/').slice(-1)[0];
      problemIds.push(problemId);
    });
    return problemIds;
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

  public buildProblemUrl = (problemId: string, contestId: string): string => {
    return `${this.buildContestUrl(contestId)}/problem/${problemId}`;
  }

  public buildContestUrl = (contestId: string): string => {
    return `${this.baseUrl}/contest/${contestId}`;
  }
}

export default Codeforces;
