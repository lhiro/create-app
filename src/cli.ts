import cac from 'cac';
import { createApp } from './create-app';
import inquirer from 'inquirer';
import chalk from 'chalk';
import path from 'path';

const cli = cac();

cli.option('-t, --template [template]', 'Choose you project tempalte');

cli.help();
cli.version('0.0.1');
const parsed = cli.parse();

const directory = parsed.args[0];
const template = parsed.options['template'];

const questions: inquirer.QuestionCollection[] = [];

if (!directory) {
  questions.push({
    type: 'input',
    name: 'directory',
    message: 'Input Directory',
    default: '.'
  });
}

if (!template) {
  questions.push({
    type: 'list',
    name: 'template',
    message: 'Select a template',
    choices: [
      { name: chalk.green('SSR-React-Midway'), value: 'ssr-react-midway' },
      { name: chalk.green('Midway'), value: 'midway'},
      { name: chalk.green('Koa'), value: 'koa'},
      { name: chalk.blue('Umi'), value: 'umi' },
      { name: chalk.blue('Taro'), value: 'taro' },
      { name: chalk.blue('Flutter'), value: 'flutter' },
      { name: chalk.green('Electron'), value: 'electron' }
    ]
  });
}

setTimeout(async () => {
  console.log(chalk.cyanBright('You are creating an application.'));
  const anwsers = {
    template,
    directory,
    ...(await inquirer.prompt(questions))
  }
  const cwd = process.cwd();
  const targetPath = path.join(cwd, anwsers.directory);
  createApp(anwsers.template, targetPath);
  console.log(`\nDone. Now run: \n`);
  if (targetPath !== cwd) {
    console.log(` cd ${path.relative(cwd, targetPath)}`);
  }
  console.log(` npm install (or yarn install)`);
  console.log(` npm run dev (or yarn dev)`);
  console.log();
}, 0);

