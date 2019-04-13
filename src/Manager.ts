import parsers from './parsers';
import { writeContestTests, writeProblemTests,
  readProblemTests, addProblemTest, writeNewProblemsTest } from './utils';

import Parser from './parsers/parser';

class Manager {
  public parser: Parser | null;

  constructor() {
    this.parser = null;
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
    this.parser = parsers[prefix];
  }
  
  public async chooseParserMode(tags: string[]) {
    if (tags.length === 3) {
      const problemTests: ProblemTests = await this.parser!.parseProblem(tags[2], tags[1]);
      writeProblemTests(tags, problemTests);
    } else {
      const contestTests: ContestTests = await this.parser!.parseContest(tags[1]);
      writeContestTests(tags, contestTests);
    }
  }

  public addTest(newTest: ProblemTest) {
    let problemTests:ProblemTests = readProblemTests();
    problemTests = addProblemTest(problemTests, newTest);
    writeNewProblemsTest(problemTests);
  }

}

export default Manager;
