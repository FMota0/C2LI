import AbstractTester from './AbstractTester';

class Python extends AbstractTester {
  
  public beforeAll = () => null;
  public afterAll = () => null;

  public getExecutionCommand = () => {
    if (!this.path) {
      throw `[${this.suffix}] Path to source code not found.`;
    }
    return {
      command: 'python',
      args: [
        this.path,
      ],
    };
  }
}

export default Python;
