import chalk from 'chalk';
import yargs from 'yargs';

import testBuilder from '../testers';
import { getFileValidSuffix } from '../testers/utils';

export const command: string = 'interact <interactor> <source>';

export const desc: string = 'Let source interact with interactor';

export const builder = (yargs: yargs.Argv) => {
    return yargs.options({
        d: {
            alias: 'debug',
            boolean: true,
            default: false,
        }
    });
}

interface InteractArgs {
    interactor: string;
    source: string;
    debug: boolean;
}

export const handler = ({interactor, source, debug}: InteractArgs) => {
    const interactorSuffix = getFileValidSuffix(interactor);
    const sourceSuffix = getFileValidSuffix(source);
    if(!interactorSuffix || !sourceSuffix){
        console.log('INVALID');
        return;
    }
    const interactorTester: Tester = testBuilder(interactorSuffix, interactor);
    const sourceTester: Tester = testBuilder(sourceSuffix, source);
    const start = new Date().getTime();
    const getSeconds = () => (new Date().getTime() - start) / 1000;
    interactorTester.spawn({});
    sourceTester.spawn({});
    if(!interactorTester.child || !sourceTester.child){
        return;
    }

    interactorTester.child.stdout!.on('data', data => {
        if(debug){
            console.log(chalk.gray(`[INTERACTOR] [${getSeconds()} s] ${data}`));
        }
        sourceTester.child!.stdin!.write(data)
    });
    sourceTester.child.stdout!.on('data', data => {
        if(debug){
            console.log(chalk.yellow(`[SOURCE] [${getSeconds()} s] ${data}`));
        }
        interactorTester.child!.stdin!.write(data);
    });
    interactorTester.child.on('exit', code => {
        interactorTester.afterAll();
        if(code !== 0){
            console.log(chalk.red(`Interactor finished with code ${code}.`));
            return;
        }
        console.log(chalk.green('Interactor finished successfully.'));
    });
    sourceTester.child.on('exit', code => {
        sourceTester.afterAll();
        if(code !== 0){
            console.log(chalk.red(`Source finished with code ${code}.`));
            return;
        }
        console.log(chalk.green('Source finished successfully.'));
    });
}