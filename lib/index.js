const fs = require('fs')
const path = require('path')
const readline = require('readline');
const chalk = require('chalk')
const inquirer = require('inquirer')

const DATA_PATH = path.join(__dirname, '../data/did.txt')

const log = (msg) => {
  console.log(chalk.white.bgBlack(msg))
}

const promptEntry = () => {
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
  log(chalk.white.bgBlack(`... saving to did.txt`))
  console.log(entry)
  if (fs.existsSync(DATA_PATH)) {
    return fs.appendFileSync(DATA_PATH, '\n\n' + entry);
  } 
  else {
    return fs.writeFileSync(DATA_PATH, entry);
  }
}

const recordEntry = async () => {
    const { action, message } = await promptEntry();
    const entry = 
      `(${action}) ${new Date()}` + 
      '\n' + 
      `- ${message}`
    saveToFile(entry)
}


const listLastLines = () => {
  const rl = readline.createInterface({
    input: fs.createReadStream(DATA_PATH),
    crlfDelay: Infinity
  });

  const lines = [];

  rl.on('line', (line) => lines.push(line));

  rl.on('close', function() {
    const lastLines = lines.slice(-9)
    lastLines.forEach((line) => {
      console.log(line)
    })
  });
}

const run = (command) => {

  // welcome message
  log(chalk.white.bgBlack('Welcome to did.txt'))

  switch(command) {
    case 'list':
      listLastLines()
    default:
      recordEntry()
  }

}

exports.run = run
