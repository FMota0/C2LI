import fs from 'fs'

class TestWriter {

  public writeContestTests (tags: string[], contestTests: ContestTests) {
    console.log(tags, contestTests)
  }

  public writeProblemTests (tags: string[], problemTests: ProblemTests) {
    // fs.writeFileSync(`./A/${problemId}.json`, JSON.stringify(problemTests))
    console.log(tags, problemTests)
  }
}

export default TestWriter