/**
 * Test the request function
 */

/* eslint-env browser */
let { loadStarShips, loadAllStarShips } = require('../swapi');
let { request } = require('../../utils/request');

let mockPage = 1;
const mockUrl = `https://swapi.co/api/starships/?page=${mockPage}`;
let starShips = [];

const mockStarShips = [
  {
    name: 'Millennium Falcon',
    consumables: '2 months',
    MGLT: '75'
  },
  {
    name: 'Death Star',
    consumables: '3 years',
    MGLT: '10'
  }
];

const mockResponse = {
  count: 2,
  next: 'https://swapi.co/api/starships/?page=2',
  previous: null,
  results: mockStarShips
};

describe('SWAPI', () => {
  beforeEach(() => {
    loadAllStarShips = jest.fn();
    loadStarShips = jest.fn();
    request = jest.fn();
    starShips = [];
    mockPage = 1;
  });

  describe('loadStarShips', () => {
    beforeEach(() => {
      loadStarShips.mockImplementation(async page => {
        const response = request(
          `https://swapi.co/api/starships/?page=${page}`
        );
        const json = await response;
        return json.results;
      });

      request.mockReturnValue(mockResponse);
    });

    it('should call request with url', async () => {
      const loadShips = await loadStarShips(mockPage);
      expect(request).toBeCalledWith(mockUrl);
      expect(loadShips).toEqual(mockStarShips);
    });
  });

  describe('loadAllStarShips', () => {
    beforeEach(() => {
      loadAllStarShips.mockImplementation(async morePages => {
        if (morePages) {
          mockPage += 1;
          /* eslint-disable no-await-in-loop */
          const ships = await loadStarShips(mockPage);

          if (ships) {
            starShips.push(...ships);
          }
        }

        return starShips;
      });

      loadStarShips.mockReturnValue(mockStarShips);
    });

    it('should call loadStarShips with page number if true', async () => {
      const allStarShips = await loadAllStarShips(true);
      expect(loadStarShips).toBeCalledWith(mockPage);
      expect(allStarShips).toEqual(mockStarShips);
    });

    it('should not call loadStarShips if there are no more pages', async () => {
      const allStarShips = await loadAllStarShips(false);
      expect(loadStarShips).not.toBeCalled();
      expect(allStarShips).toEqual([]);
    });
  });
});
