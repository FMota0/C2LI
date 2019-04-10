import cheerio from 'cheerio';
import nodeFetch from 'node-fetch';

import Parser from './Parser';

class AtCoder extends Parser {
  baseUrl = 'https://atcoder.jp';

  public parseProblem = async (problemId: string, contestId: string): Promise<ProblemTests> => {
    const response = await nodeFetch(this.buildProblemUrl(problemId, contestId));
    const html = await response.text();
    const $ = cheerio.load(html);
    const tests: ProblemTests = [];
    $('.io-style .part').removeClass();
    const pre: string[] = [];
    $('.lang-en .part section pre').each((_, element) => {
      pre.push($(element).text());
    });
    pre.forEach((_, i) => {
      if (i % 2 === 0) {
        tests[i / 2] = {
          input: pre[i],
          output: pre[i + 1],
        };
      }
    });
    return tests;
  }

  public getContestProblems = async (contestId: string): Promise<string[]> => {
    const response = await nodeFetch(this.buildContestUrl(contestId));
    const html = await response.text();
    const $ = cheerio.load(html);
    const problemIds: string[] = [];
    $('tbody tr td a').each((i, element) => {
      if (i % 2 === 0) {
        const url = $(element).attr('href');
        const problemId = url.split('/').slice(-1)[0];
        problemIds.push(problemId);
      }
    });
    return problemIds;
  }

  public buildProblemUrl = (problemId: string, contestId: string): string => {
    return `${this.buildContestUrl(contestId)}/${problemId}`;
  }

  public buildContestUrl = (contestId: string): string => {
    return `${this.baseUrl}/contests/${contestId}/tasks`;
  }
}

export default AtCoder;
