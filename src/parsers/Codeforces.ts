import { Parser } from './Parser';
import cheerio from 'cheerio';
import request from 'request';
import fs from 'fs';
import nodeFetch from 'node-fetch';

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

  public async getTestsProblem(url: string) {
    const data = [];
    const html = await nodeFetch(url);
    const body = await html.text();
    console.log(body);
    const $ = cheerio.load(body);
    $('div.input').each((i, element) => {
      data[i] = {
        input: $(element).find('pre').text(),
        output: $(element).next().find('pre').text(),
      };
    });
    console.log(data);
    return data;
  }

  public async getContestProblems(url: string): Promise<any[]> {
    return new Promise((resolve, reject) => request(url,async (error, response, html) => {
      console.log('to aqui');
      const data = [];
      if (!error && response.statusCode === 200) {
        console.log('vo pegar o parser');
        const $ = cheerio.load(html);
        const urls:string = [];
        $('td.id').each(async(i, element) =>  {
          const urlProblem: string =  $(element).find('a').attr('href');
          console.log(urlProblem);
          urls.push(this.urlBase + urlProblem);
        });
        for (let e of urls) {
          data.push(await this.getTestsProblem(e));
        }
        resolve(data);
      } else {
        console.log('deu errado');
        reject();
      }
    }));
  }

}