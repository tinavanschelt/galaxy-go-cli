module.exports = {
  splitDuration: duration => {
    const durationArray = duration.split(' ');
    const durationLength = durationArray[0];
    const durationType = durationArray[1];

    return { durationLength, durationType };
  },

  getHours: duration => {
    const { durationLength, durationType } = module.exports.splitDuration(
      duration
    );

    // Convert any duration type to hours
    if (durationType) {
      if (durationType.includes('hour')) {
        return durationLength;
      } else if (durationType.includes('day')) {
        return durationLength * 24;
      } else if (durationType.includes('week')) {
        return durationLength * 7 * 24;
      } else if (durationType.includes('month')) {
        return durationLength * 30.4 * 24;
      } else if (durationType.includes('year')) {
        return durationLength * 365 * 24;
      }
      return -1;
    }
    return -1;
  },

  totalStops: (distanceFromUser, stopFrequency, MGLTperHour) => {
    // Calculate the total number of stops for a star ship
    const hoursBetweenStops = module.exports.getHours(stopFrequency);

    if (hoursBetweenStops > -1 && MGLTperHour !== 'unknown') {
      const distanceBetweenStops = hoursBetweenStops * MGLTperHour;
      return Math.round(distanceFromUser / distanceBetweenStops);
    }
    return 'N/A';
  },

  stopsForEachShip: (distanceFromUser, starShips) => {
    // Get and then log the total number of stops for each ship
    /* eslint-disable array-callback-return */
    starShips.map(ship => {
      const { name, consumables, MGLT } = ship;
      const stopFrequency = consumables;
      const MGLTperHour = MGLT;

      const totalStopsRequired = module.exports.totalStops(
        distanceFromUser,
        stopFrequency,
        MGLTperHour
      );

      console.log(`${name}: ${totalStopsRequired}`);
    });
  }
};
