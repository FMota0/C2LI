import { Parser } from './Parser';
import cheerio from 'cheerio';
import request from 'request';
import fs from 'fs';

export class Codeforces implements Parser{
  urlBase = 'https://codeforces.com/problemset/problem';
  public parseProblem(urlProblem: string):void {
    const urlAux: string = urlProblem.replace(/-/g, '/');
    const finalUrl: string = this.urlBase + urlAux;
    console.log(finalUrl);
    request(finalUrl, (error, response, html) => {
      if (!error && response.statusCode === 200) {
        const data = [];
        const $ = cheerio.load(html);
        $('div.input').each((i, element) => {
          data[i] = {
            input: $(element).find('pre').text(),
            output: $(element).next().find('pre').text(),
          };
        });
        console.log(data);
        const dataJson = JSON.stringify(data, null, 2);
        fs.writeFileSync('./data', dataJson);
      }
    });
  }

  public parseContest():void {

  }

}
