import { includes, without, intersection } from 'lodash/fp';
import { JOURNEY_TYPES } from './consts';

const {
  ZONE_1,
  ANY_1_OUTSIDE_ZONE_1,
  ANY_TWO_ZONES_INC_ZONE_1,
  ANY_TWO_ZONES_EXC_ZONE_1,
  ANY_THREE_ZONES,
} = JOURNEY_TYPES;

export const predicateAnyThreeZones = {
  f: (startStation, endStation, zones) => intersection([1, 2, 3], zones).length === 3,
  t: ANY_THREE_ZONES,
  p: 1,
};

export const predicateZone1 = {
  f: (startStation, endStation) =>
      startStation.zones.length === 1 &&
      startStation.zones[0] === 1 &&
      endStation.zones.length === 1 &&
      endStation[0] === 1,
  t: ZONE_1,
  p: 2,
};

export const predicateAnyTwoZones = {
  f: (startStation, endStation) =>
      (includes(1, startStation.zones) || includes(1, endStation.zones)) &&
      (startStation.zones.length > 1 || endStation.zones.length > 1),
  t: ANY_TWO_ZONES_INC_ZONE_1,
  p: 3,
};

export const predicateAnyOneOutsideZone1 = {
  f: (startStation, endStation, zones) => (
      without([1], startStation.zones).length === 1 &&
      without([1], endStation.zones).length === 1 &&
      without([1], zones).length === 1
  ),
  t: ANY_1_OUTSIDE_ZONE_1,
  p: 4,
};

export const predicateAnyTwoZonesDefault = {
  f: (startStation, endStation, zones) => (
    zones.length === 2 && without([1], zones).length === 1
  ),
  t: ANY_TWO_ZONES_INC_ZONE_1,
  p: 5,
};

export const predicateDefaultTrue = {
  f: () => true,
  t: ANY_TWO_ZONES_EXC_ZONE_1,
  p: 6,
};
