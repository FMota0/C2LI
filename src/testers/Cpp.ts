import { execSync } from 'child_process';

import AbstractTester from './AbstractTester';
import { CompilationError } from '../errors';

class CPP extends AbstractTester {
  public beforeAll = () => {
    if (!this.path) {
      throw `[${this.suffix}] Path to source code not found.`;
    }
    try {
      execSync(`g++ -std=c++17 ${this.path} -o ${this.bin}`, {
        stdio: [null, null, null],
      });
    } catch (e) {
      throw new CompilationError(e.message);
    }
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
