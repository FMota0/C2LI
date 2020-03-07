import Cpp from './Cpp';
import Python from './Python';

export const testers = [TesterSuffix.CPP, TesterSuffix.PY];

const testerBuilder = (suffix: TesterSuffix, path?: string): Tester => {
  if (suffix == TesterSuffix.CPP) 
    return new Cpp(suffix, path);
  if (suffix == TesterSuffix.PY)
    return new Python(suffix, path);
  throw "Incorrect tester suffix";
};

export default testerBuilder;
