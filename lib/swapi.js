const CLI = require('clui');
const log = require('console-emoji');
const { request } = require('../utils/request');

const { Spinner } = CLI;

const starShips = [];
let currentPage = 0;
let isMorePages = true;

module.exports = {
  /* eslint-disable consistent-return */
  loadStarShips: async page => {
    const requestUrl = `https://swapi.co/api/starships?page=${page}`;

    try {
      const response = await request(requestUrl);

      if (response.next !== null) {
        const json = await response;
        return json.results;
      }

      isMorePages = false;
    } catch (error) {
      console.log('Could not fetch star ships from SWAPI', error);
    }
  },

  loadAllStarShips: async () => {
    log(
      '\nThis application calculates how many refuel stops a Star Wars :rocket:  has to make in order to cover a given distance.'
    );

    const status = new Spinner('Loading Star Ships ... *Imperial March*');
    status.start();

    while (isMorePages) {
      currentPage += 1;
      /* eslint-disable no-await-in-loop */
      const ships = await module.exports.loadStarShips(currentPage);

      if (ships) {
        starShips.push(...ships);
      }
    }

    status.stop();
    return starShips;
  }
};
