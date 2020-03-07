import { execSync } from 'child_process';

import AbstractTester from './AbstractTester';

class CPP extends AbstractTester {
  public beforeAll = () => {
    if (!this.path) {
      throw `[${this.suffix}] Path to source code not found.`;
    }
    execSync(`g++ -std=c++17 ${this.path} -o ${this.bin}`);
  }

  public afterAll = () => {
    execSync(`rm ${this.bin}`);
  }

  public getExecutionCommand = () => {
    return {
      command: `./${this.bin}`,
      args: [],
    };
  }
}

export default CPP;
