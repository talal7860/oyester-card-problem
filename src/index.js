import { find, includes, union, intersection, without } from 'lodash/fp';
import { TRANSPORTS, JOURNEY_TYPES } from './consts';
import type {
  // Journey,
  Fare,
  // Zone,
  Station,
  Trip,
} from './types';

const getBusFare = (fares: Array<Object>) =>
  find(fare => fare.journey === JOURNEY_TYPES.ANY_BUS_JOURNEY, fares).pricePennies;

const identifyTubeJourneyType = (fares: Array<Object>, stations: Array<Object>, trip: Trip) => {
  const startStation = find(station => station.name === trip.start, stations);
  const endStation = find(station => station.name === trip.end, stations);
  const zones = union(startStation.zones, endStation.zones);
  const {
    ZONE_1,
    ANY_1_OUTSIDE_ZONE_1,
    ANY_TWO_ZONES_INC_ZONE_1,
    ANY_TWO_ZONES_EXC_ZONE_1,
    ANY_THREE_ZONES,
    ANY_BUS_JOURNEY,
  } = JOURNEY_TYPES;
  if (intersection([1, 2, 3], zones).length === 3) {
    return ANY_THREE_ZONES;
  } else if (includes(1, startStation.zones) && includes(1, endStation.zones)) {
    return ZONE_1;
  } else if (zones.length === 1 && includes(zones[0], [2, 3])) {
    return ANY_1_OUTSIDE_ZONE_1;
  } else if (zones.length === 2 && without([1], zones).length === 1) {
    return ANY_TWO_ZONES_INC_ZONE_1;
  } // else if (zones.length === 2 && !includes(1, zones)) {
  // }
  return ANY_TWO_ZONES_EXC_ZONE_1;
};

const getTubeFare = (fares: Array<Object>, stations: Array<Object>, trip: Trip) => {
  const journeyType = identifyTubeJourneyType(fares, stations, trip);
  return find(fare => fare.journey === journeyType, fares).pricePennies;
};

const calculateFare = (fares: Array<Object>, stations: Array<Object>, trips: Array<Object>) : number => {
  let totalFare = 0;
  trips.forEach((trip) => {
    if (trip.transport === TRANSPORTS.bus) {
      totalFare += getBusFare(fares);
    } else {
      totalFare += getTubeFare(fares, stations, trip);
    }
  });
  return totalFare;
};

export { calculateFare };
