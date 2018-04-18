import { find, includes, union, intersection, without, maxBy, minBy, filter } from 'lodash/fp';
import { TRANSPORTS, JOURNEY_TYPES } from './consts';
import type {
  Fare,
  Station,
} from './types';

const tripMap = {};
tripMap[TRANSPORTS.bus] = BusTrip;
tripMap[TRANSPORTS.tube] = TubeTrip;

class Trip {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  static tripFromObject(tripObj) {
    return new tripMap[trip.transport](tripObj.start, tripObj.end);
  }
}

class BusTrip extends Trip {
  getFare(fares) {
    return find(fare => fare.journey === JOURNEY_TYPES.ANY_BUS_JOURNEY, fares).pricePennies;
  }
}

class TubeTrip extends Trip {
  getFare(fares, stations) {
    const journeyType = this.identifyTubeJourneyType(fares, stations);
    return find(fare => fare.journey === journeyType, fares).pricePennies;
  }

  identifyTubeJourneyType(fares: Array<Object>, stations: Array<Object>) {
    console.log(stations);
    console.log(this);
    const startStation = find(station => station.name === this.start, stations);
    const endStation = find(station => station.name === this.end, stations);
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
    } else if (startStation.zones.length === 1 && startStation.zones[0] === 1 && endStation.zones.length === 1 && endStation[0] === 1) {
      return ZONE_1;
    } else if ((includes(1, startStation.zones) || includes(1, endStation.zones)) && (startStation.zones.length > 1 || endStation.zones.length > 1)) {
      return ANY_TWO_ZONES_INC_ZONE_1;
    } else if (without([1], startStation.zones).length === 1 && without([1], endStation.zones).length === 1 && without([1], zones).length === 1) {
      return ANY_1_OUTSIDE_ZONE_1;
    } else if (zones.length === 2 && without([1], zones).length === 1) {
      return ANY_TWO_ZONES_INC_ZONE_1;
    } // else if (zones.length === 2 && !includes(1, zones)) {
    // }
    return ANY_TWO_ZONES_EXC_ZONE_1;
  }
}
export {
  Trip,
  BusTrip,
  TubeTrip,
}
