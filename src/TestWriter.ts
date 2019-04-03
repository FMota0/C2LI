import fs from 'fs'

class TestWriter {

  public writeContestTests (contestTests: ContestTests) {

  }

  public writeProblemTests (problemId: string, problemTests: ProblemTests) {
    fs.writeFileSync(`./${problemId}.json`, JSON.stringify(problemTests))
  }
}

export default TestWriter