const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const inquirer = require('inquirer')

const log = (msg) => {
  console.log(chalk.white.bgBlack(msg))
}

const promptSignup = () => {
  const questions = [
    {
      message: 'What type of entry are you saving?',
      name: 'action',
      type: 'list',
      choices: ['did', 'task']
    },
    {
      message: 'Entry:',
      name: 'message'
    }
  ];
  return inquirer.prompt(questions)
}


const saveToFile = (entry) => {
  const target = path.join(__dirname, 'data', 'did.txt')
  log(chalk.white.bgBlack(`... saving to did.txt`))
  console.log(entry)
  if (fs.existsSync(target)) {
    return fs.appendFileSync(target, '\n\n' + entry);
  } 
  else {
    return fs.writeFileSync(target, entry);
  }
}

const run = async () => {

  // welcome message
  log(chalk.white.bgBlack('Welcome to did.txt'))

  const { action, message } = await promptSignup();
  const entry = 
    `(${action}) ${new Date()}` + 
    '\n' + 
    `- ${message}`
  saveToFile(entry)
}

run()
