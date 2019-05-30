import { execSync } from 'child_process';

import AbstractTester from './AbstractTester';
import { getFileNameBySuffix } from './utils';

class CPP extends AbstractTester {
  public beforeAll = () => {
    execSync(`g++ -std=c++17 ${getFileNameBySuffix('.cpp')} -o program`);
  }

  public afterAll = () => {
    execSync('rm program');
  }

  public getExecutionCommand = () => {
    return {
      command: './program',
      args: [],
    };
  }
}

export default CPP;
