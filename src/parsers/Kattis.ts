import cheerio from 'cheerio';
import nodeFetch from 'node-fetch';
import Parser from "./parser";

class Kattis extends Parser {
  baseUrl = 'https://open.kattis.com';
  public parseProblem = async (problemId: string, contestId: string): Promise<ProblemTests> => {
    const response = await nodeFetch(this.buildProblemUrl(problemId, contestId));
    const html = await response.text();
    const $ = cheerio.load(html);
    const tests: ProblemTests = [];
    let problemTest: ProblemTest = {
      input: '',
      output: ''
    }
    $('pre').each((i, element) => {
      if (i % 2 == 0) {
        problemTest = { input: $(element).text(), output: '' };
      }
      else {
        problemTest = { input: problemTest.input, output: $(element).text() }
        tests[Math.floor(i / 2)] = problemTest;
        problemTest = { input: '', output: '' };
      }
    })
    return tests;
  }

  public getContestProblems = async (contestId: string): Promise<string[]> => {
    const html = await nodeFetch(this.buildContestUrl(contestId));
    const body = await html.text();
    const $ = cheerio.load(body);
    const problemIds: string[] = [];
    $('tbody').find('tr').each((i, trElement) => {
      const data = $(trElement).find('td');
      const url = $(data).find('a').attr('href');
      const problemId = url.split('/').slice(-1)[0];
      problemIds.push(problemId)
    })
    return problemIds;
  }

  public buildContestUrl = (contestId: string): string => {
    return `${this.baseUrl}/contests/${contestId}/problems`;
  }

  public buildProblemUrl = (problemId: string, contestId: string): string => {
    return `${this.buildContestUrl(contestId)}/${problemId}`;
  }

}

export default Kattis;