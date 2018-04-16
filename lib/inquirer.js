const inquirer = require('inquirer');
const calculate = require('./calculate');
const log = require('console-emoji');

module.exports = {
  // Prompt user to provide distance in MGLT
  askUserForDistance: (questions, starShips) =>
    inquirer
      .prompt(questions[0])
      .then(answer => {
        const { distance } = answer;
        calculate.stopsForEachShip(distance, starShips);
      })
      .then(() => {
        inquirer.prompt(questions[1]).then(answer => {
          // Check whether user would like to enter another distance, else exit
          if (answer.askAgain) {
            module.exports.askUserForDistance(questions, starShips);
          } else {
            log('May the force be with you :wave:');
          }
        });
      })
      .catch(error => {
        log('Could not get distance from user :confused:', error);
      })
};
