import AbstractTester from './AbstractTester';
import { getFileNameBySuffix } from './utils';

class Python extends AbstractTester {
  public beforeAll = () => null;

  public afterAll = () => null;

  public getExecutionCommand = () => {
    return {
      command: 'python',
      args: [
        getFileNameBySuffix('.py')!,
      ],
    };
  }
}

export default Python;
