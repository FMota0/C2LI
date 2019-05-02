import cheerio from 'cheerio';
import nodeFetch from 'node-fetch';

import Parser from './Parser';

class AtCoder extends Parser {
  baseUrl = 'https://www.urionlinejudge.com.br';

  public parseProblem = async (problemId: string, contestId?: string): Promise<ProblemTests> => {
    const response = await nodeFetch(this.buildProblemUrl(problemId, contestId));
    const html = await response.text();
    const $ = cheerio.load(html);
    const tests: ProblemTests = [];
    const pre: string[] = [];
    $('table tbody tr td').each((_, element) => {
      pre.push($(element).text());
    });
    pre.forEach((_, i) => {
      if (i % 2 === 0) {
        tests[i / 2] = {
          input: pre[i].trim().replace(new RegExp('\t', 'g'), ''),
          output: pre[i + 1].trim().replace(new RegExp('\t', 'g'), ''),
        };
      }
    });
    return tests;
  }

  public getContestProblems = async (contestId: string): Promise<string[]> => {
    throw new Error('Unhandled operation');
  }

  public buildProblemUrl = (problemId: string, contestId?: string): string => {
    if (!contestId) {
      return `${this.baseUrl}/repository/UOJ_${problemId}.html`;
    } else {
      throw new Error('Unhandled operation');
    }
  }

  public buildContestUrl = (contestId: string): string => {
    throw new Error('Unhandled operation');
  }
}

export default AtCoder;
