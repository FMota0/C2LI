import Cpp from './Cpp';
import Python from './Python';

const testers: Record<string, Tester> = {
  cpp: new Cpp(),
  py: new Python(),
};

export default testers;
