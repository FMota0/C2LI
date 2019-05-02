import AtCoder from './AtCoder';
import Codeforces from './Codeforces';
import CodeforcesGym from './CodeforcesGym';
import Parser from './Parser';
import URI from './URI';

const parsers: Record<string, Parser> = {
  atc: new AtCoder(),
  cf: new Codeforces(),
  cfg: new CodeforcesGym(),
  uri: new URI(),
};

export default parsers;
