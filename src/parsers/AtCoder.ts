import cheerio from 'cheerio';
import fetch from 'node-fetch';

class AtCoder implements Parser {
  baseUrl = 'https://atcoder.jp'

  public async parseProblem(problemId: string, contestId: string): Promise<ProblemTests> {
    return Promise.resolve([])
  }

  public async parseContest(contestId: string): Promise<ContestTests> {
    const response = await fetch(this.buildContestUrl(contestId))
    const html = await response.text()
    const $ = cheerio.load(html)
    $('tbody tr').each((i, element) => {
      
    })
    return Promise.resolve({})
  }

  public buildContestUrl(contestId: string): string {
    return `${this.baseUrl}/${contestId}/tasks`
  }
}

export default AtCoder