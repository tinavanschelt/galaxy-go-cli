#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const log = require('console-emoji');

const swapi = require('./lib/swapi');
const inquirer = require('./lib/inquirer');

// Clear terminal window and print app title as large text
clear();
console.log(
  chalk.yellow(figlet.textSync('Galaxy Go!', { horizontalLayout: 'full' }))
);

let starShips = [];
const questions = [
  {
    name: 'distance',
    type: 'input',
    message: 'Please provide the distance in MGLT:',
    validate(value) {
      if (value.length) {
        return true;
      }

      log('Please provide the distance in MGLT :point_up_2:');
      return false;
    }
  },
  {
    name: 'askAgain',
    type: 'confirm',
    message:
      'Would you like to find the number of stops for another given distance?',
    default: false
  }
];

const run = async () => {
  // Load ships upfront (debateable whether this is the smartest route)
  starShips = await swapi.loadAllStarShips();
  // Fire off the inquirer
  await inquirer.askUserForDistance(questions, starShips);
};

run();
