import AbstractTester from './AbstractTester';

class Python extends AbstractTester {
  public beforeAll = () => null;

  public afterAll = () => null;

  public getExecutionCommand = () => {
    return {
      command: 'python',
      args: ['p.py'],
    };
  }
}

export default Python;
