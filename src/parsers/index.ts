import AtCoder from './AtCoder';
import Codeforces from './Codeforces';
import CodeforcesGym from './CodeforcesGym';
import parser from './parser';
import Kattis from './Kattis';

const parsers: Record<string, Parser> = {
  atc: new AtCoder(),
  cf: new Codeforces(),
  cfg: new CodeforcesGym(),
  kt: new Kattis(),
};

export default parsers;
