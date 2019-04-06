import Manager from '../Manager';
import inquirer from 'inquirer';
export const command:string = ('add');
export const desc:string = ('add tests for a specific problem');
export const handler = (argv:any) => {
  const manager = new Manager();
  const question = [
    { type: 'input' , name : 'input', message:'Type the input of the new tests' },
    { type:'input', name:'output', message:'type the expected output of the new tests' },
  ];
  inquirer
          .prompt(question)
          .then((answers) => {
            manager.addTest(<ProblemTest> answers);
          });
};
