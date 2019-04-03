import { Codeforces } from './parsers/Codeforces';
import { writeContestTests, writeProblemTests } from './utils'

class Manager {
  public parser: Parser;

  constructor(){
    this.parser = new Codeforces();
  }

  public parse(code: string) {
    const tags: string[] = code.split('-');
    if (tags.length < 2 || tags.length > 3) {
      throw new Error('Invalid code of parsing');
    }
    this.chooseParser(tags[0]);
    this.chooseParserMode(tags);
  }

  public chooseParser(prefix: string) {
    if (prefix === 'cf') {
      this.parser = new Codeforces();
    }
  }

  public async chooseParserMode(tags: string[]) {
    if (tags.length === 3) {
      const problemTests: ProblemTests = await this.parser.parseProblem(tags[2], tags[1]);
      writeProblemTests(tags, problemTests);
    } else {
      const contestTests: ContestTests = await this.parser.parseContest(tags[1]);
      writeContestTests(tags, contestTests);
    }
  }
}

export default Manager
