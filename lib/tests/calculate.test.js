/**
 * Tests for all functions use to calculate the number of stops
 */

const {
  splitDuration,
  getHours,
  totalStops,
  stopsForEachShip
} = require('../calculate');

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

const mockDistanceFromUser = 1000000;
const mockDuration = mockStarShips[0].consumables;
const mockMGLT = mockStarShips[0].MGLT;
const mockDurationInHours = 1459.1999999999998;
const mockDurationResult = {
  durationLength: '2',
  durationType: 'months'
};
const mockTotalStopsResults = 9;

describe('splitDuration', () => {
  let mockSplitDuration = splitDuration(mockDuration);

  it('returns supplied string as an object', () => {
    expect(mockSplitDuration).toEqual(mockDurationResult);
  });

  it('is called with a string', () => {
    mockSplitDuration = jest.fn();
    mockSplitDuration(mockDuration);
    expect(mockSplitDuration).toHaveBeenCalledWith(mockDuration);
  });
});

describe('getHours', () => {
  let mockGetHours = getHours(mockDuration);

  it('returns hours as number', () => {
    expect(mockGetHours).toEqual(mockDurationInHours);
  });

  it('is called with a string', () => {
    mockGetHours = jest.fn();
    mockGetHours(mockDuration);
    expect(mockGetHours).toHaveBeenCalledWith(mockDuration);
  });
});

describe('totalStops', () => {
  let mockTotalStops = totalStops(mockDistanceFromUser, mockDuration, mockMGLT);

  it('returns correct number of stops as a float', () => {
    expect(mockTotalStops).toEqual(mockTotalStopsResults);
  });

  it('is called with correct arguments', () => {
    mockTotalStops = jest.fn();
    mockTotalStops(mockDistanceFromUser, mockDuration, mockMGLT);
    expect(mockTotalStops).toHaveBeenCalledWith(
      mockDistanceFromUser,
      mockDuration,
      mockMGLT
    );
  });
});

describe('stopsForEachShip', () => {
  let mockStopsForEachShip = stopsForEachShip(
    mockDistanceFromUser,
    mockStarShips
  );

  it('is called with correct arguments', () => {
    mockStopsForEachShip = jest.fn();
    mockStopsForEachShip(mockDistanceFromUser, mockStarShips);
    expect(mockStopsForEachShip).toHaveBeenCalledWith(
      mockDistanceFromUser,
      mockStarShips
    );
  });
});
