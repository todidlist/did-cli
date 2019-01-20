#!/usr/bin/env node

const args = process.argv.slice(process.execArgv.length + 2);
const command = args[0]

const myLib = require('../lib/index.js');

myLib.run(command)
