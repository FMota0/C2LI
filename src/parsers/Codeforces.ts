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
    const data = await this.getTestsProblem(finalUrl);
    console.log(data);
    const dataJson = JSON.stringify(data, null, 2);
    fs.writeFileSync('./data', dataJson);
  }

  public async parseContest(idContest: string): Promise<void> {
    const urlAux: string = idContest.replace(/-/g, '/');
    const urlContest: string = '/contest';
    const finalUrl: string = this.urlBase + urlContest + urlAux;
    const data = await this.getContestProblems(finalUrl);
    const dataJson = JSON.stringify(data, null, 2);
    fs.writeFileSync('./data', dataJson);
  }

  public getTestsProblem(url: string): Promise<any[]> {
    return new Promise((resolve, reject) => request(url, (error, response, html) => {
      const data = [];
      if (!error && response.statusCode === 200) {
        const $ = cheerio.load(html);
        $('div.input').each((i, element) => {
          data[i] = {
            input: $(element).find('pre').text(),
            output: $(element).next().find('pre').text(),
          };
        });
        resolve(data);

      } else {
        console.log('deu errado');
        reject();
      }
    }));

  }

  public async getContestProblems(url: string): Promise<any[]> {
    return new Promise((resolve, reject) => request(url,async (error, response, html) => {
      console.log('to aqui');
      const data = [];
      if (!error && response.statusCode === 200) {
        console.log('vo pegar o parser');
        const $ = cheerio.load(html);
        const urls = [];
        $('td.id').each(async(i, element) =>  {
          const urlProblem: string =  $(element).find('a').attr('href');
          console.log(urlProblem);
          urls.push(this.urlBase + urlProblem);
          data[i] = await this.getTestsProblem(this.urlBase + urlProblem);
          console.log(data[i]);
        });
        resolve(data);
      } else {
        console.log('deu errado');
        reject();
      }
    }));
  }

}
