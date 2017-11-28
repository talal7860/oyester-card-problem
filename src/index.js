import { find, includes, union, intersection, without } from 'lodash/fp';
import { TRANSPORTS, JOURNEY_TYPES } from './consts';
import {
  // Journey,
  Fare,
  // Zone,
  Station,
  Trip,
} from './types';

const getBusFare = (fares) =>
  find(fare => fare.journey === JOURNEY_TYPES.ANY_BUS_JOURNEY, fares).pricePennies;

const identifyTubeJourneyType = (fares, stations, trip) => {
  const startStation = find(station => station.name === trip.start, stations);
  const endStation = find(station => station.name === trip.end, stations);
  const zones = union(startStation.zones, endStation.zones);
  if (intersection([1, 2, 3], zones).length === 3) {
    return JOURNEY_TYPES.ANY_THREE_ZONES;
  } else if (zones.length === 1 && includes(zones[0], [2, 3])) {
    return JOURNEY_TYPES.ANY_1_OUTSIDE_ZONE_1;
  } else if (zones.length === 2 && without([1], zones).length === 1) {
    return JOURNEY_TYPES.ANY_TWO_ZONES_INC_ZONE_1;
  }// else if (zones.length === 2 && !includes(1, zones)) {
  return JOURNEY_TYPES.ANY_TWO_ZONES_EXC_ZONE_1;
  // }
};

const getTubeFare = (fares, stations, trip) => {
  const journeyType = identifyTubeJourneyType(fares, stations, trip);
  console.log(journeyType);
  return find(fare => fare.journey === journeyType, fares).pricePennies;
};

const calculateFare = (fares: Fare[], stations: Station[], trips: Trip[]) => {
  let totalFare = 0;
  trips.forEach((trip) => {
    console.log(TRANSPORTS.bus);
    if (trip.transport === TRANSPORTS.bus) {
      totalFare += getBusFare(fares);
    } else {
      console.log('******');
      console.log(stations);
      console.log('******');
      totalFare += getTubeFare(fares, stations, trip);
    }
  });
  return totalFare;
};

export { calculateFare };
