import { Parser } from './parsers/Parser';
import { Codeforces } from './parsers/Codeforces';

export class Manager{
  public static parser: Parser;

  public static parse(problem: string): void {
    const prefix: string = problem.slice(0, 2);
    this.chooseParser(prefix);
    const tagProblem: string = problem.slice(2);
    this.chooseParserMode(tagProblem);
  }

  public static chooseParser(prefix: string): void {
    if (prefix === 'cf') {
      Manager.parser = new Codeforces();
    }
  }

  public static chooseParserMode(tag: string): void {
    if (tag.match(/-(.+)-(.+)/)) {
      Manager.parser.parseProblem(tag);
    }else {
      Manager.parser.parseContest(tag);
    }
  }

}
