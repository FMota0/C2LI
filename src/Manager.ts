import { Parser } from './parsers/Parser';
import { Codeforces } from './parsers/Codeforces';

export class Manager{
  public static parser: Parser;

  public static parse(problem: string): void {
    const prefix: string = problem.slice(0, 2);
    this.chooseParser(prefix);
    const urlProblem: string = problem.slice(2);
    Manager.parser.parseProblem(urlProblem);
  }

  public static chooseParser(prefix: string): void {
    if (prefix === 'cf') {
      Manager.parser = new Codeforces();
    }
  }

}
