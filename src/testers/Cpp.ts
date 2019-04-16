import { execSync } from 'child_process';

import AbstractTester from './AbstractTester';

class CPP extends AbstractTester {
  public beforeAll = () => {
    execSync('g++ -std=c++17 code.cpp -o program');
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
