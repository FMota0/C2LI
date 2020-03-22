import chalk from "chalk";

export class CompilationError extends Error {
    constructor(message: string){
        super(message);
    }
}

export const handleErrors = (_: string, err: Error) => {
    if (err instanceof CompilationError) {
        console.log(chalk.red('COMPILATION ERROR'));
        console.log(chalk.redBright(err.message));
        return;
    }

    throw err;
}