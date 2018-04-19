import { find, union, sortBy } from 'lodash/fp';
import { TRANSPORTS, JOURNEY_TYPES } from './consts';
import {
  predicateDefaultTrue,
  predicateAnyThreeZones,
  predicateZone1,
  predicateAnyTwoZones,
  predicateAnyOneOutsideZone1,
  predicateAnyTwoZonesDefault,
} from './journey_type_predicates';

const tripMap = {};

class Trip {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  static tripFromObject(tripObj) {
    return new tripMap[tripObj.transport](tripObj.start, tripObj.end);
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
    const startStation = find(station => station.name === this.start, stations);
    const endStation = find(station => station.name === this.end, stations);
    const zones = union(startStation.zones, endStation.zones);

    const predicates = [
      predicateAnyThreeZones,
      predicateZone1,
      predicateAnyTwoZones,
      predicateAnyOneOutsideZone1,
      predicateAnyTwoZonesDefault,
      predicateDefaultTrue,
    ];

    const sorted = sortBy('p')(predicates);
    const predicateObj = find((predicate => predicate.f(startStation, endStation, zones)), sorted);
    return predicateObj.t;
  }
}

tripMap[TRANSPORTS.bus] = BusTrip;
tripMap[TRANSPORTS.tube] = TubeTrip;


export {
  Trip,
  BusTrip,
  TubeTrip,
};
