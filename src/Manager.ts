import { Codeforces } from './parsers/Codeforces';
import TestWriter from './TestWriter'

export class Manager{
  public parser: Parser;
  public writer: TestWriter;

  constructor(){
    this.parser = new Codeforces()
    this.writer = new TestWriter()
  }

  public parse(problem: string) {
    const prefix: string = problem.slice(0, 2);
    this.chooseParser(prefix);
    const tagProblem: string = problem.slice(2);
    this.chooseParserMode(tagProblem);
  }

  public chooseParser(prefix: string) {
    if (prefix === 'cf') {
      this.parser = new Codeforces();
    }
  }

  public async chooseParserMode(tag: string) {
    if (tag.match(/-(.+)-(.+)/)) {
      const problemTests: ProblemTests = await this.parser.parseProblem(tag)
      this.writer.writeProblemTests(tag, problemTests);
    } else {
      console.log('aqui');
      await this.parser.parseContest(tag);
    }
  }

}
