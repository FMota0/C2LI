import { Parser } from './Parser';
import cheerio from 'cheerio';
import request from 'request';
import fs from 'fs';

export class Codeforces implements Parser{
  urlBase = 'https://codeforces.com';

  public async parseProblem(idProblem: string):Promise<void> {
    const urlAux: string = idProblem.replace(/-/g, '/');
    const urlProblemSet: string = '/problemset/problem';
    const finalUrl: string = this.urlBase + urlProblemSet + urlAux;
    const data = await this.getTestsQuestion(finalUrl);
    console.log(data);
    const dataJson = JSON.stringify(data, null, 2);
    fs.writeFileSync('./data', dataJson);
  }

  public parseContest(idContest: string):void {
    const urlAux: string = idContest.replace(/-/g, '/');
    const urlContest: string = '/contest';
    const finalUrl: string = this.urlBase + urlContest + urlAux;
    const data = [];
    request(finalUrl,  (error, response, html) => {
      if (!error && response.statusCode === 200) {
        const $ = cheerio.load(html);
        $('td.id').each((i, element) => {
          const urlProblem: string =  $(element).find('a').attr('href');
          data[i] = this.getTestsQuestion(this.urlBase + urlProblem);
          console.log(data[i]);
          console.log(i);
        });
      }
    });
    const dataJson = JSON.stringify(data, null, 2);
    fs.writeFileSync('./data', dataJson);
  }

  public getTestsQuestion(url: string): Promise<any[]> {
    return new Promise(resolve => request(url, (error, response, html) => {
      const data = [];
      if (!error && response.statusCode === 200) {
        const $ = cheerio.load(html);
        $('div.input').each((i, element) => {
          data[i] = {
            input: $(element).find('pre').text(),
            output: $(element).next().find('pre').text(),
          };
          console.log(data[i]);
        });
      }
      resolve(data);
    }));

  }

}
