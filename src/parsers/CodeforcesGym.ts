import Codeforces from './Codeforces';

class CodeforcesGym extends Codeforces {
  public buildContestUrl = (contestId: string): string => {
    return `${this.baseUrl}/gym/${contestId}`;
  }
}

export default CodeforcesGym;
