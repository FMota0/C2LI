import AtCoder from './AtCoder';
import Codeforces from './Codeforces';

const parsers: Record<string, Parser> = {
  atc: new AtCoder(),
  cf: new Codeforces(),
};

export default parsers;
