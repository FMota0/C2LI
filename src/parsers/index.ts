import AtCoder from './AtCoder';
import Codeforces from './Codeforces';

import Parser from './Parser';

const parsers: Record<string, Parser> = {
  atc: new AtCoder(),
  cf: new Codeforces(),
};

export default parsers;
