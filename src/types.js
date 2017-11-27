import { JOURNEY_TYPES } from './consts';

const {
  ANY_1_OUTSIDE_ZONE_1,
  ANY_TWO_ZONES_INC_ZONE_1,
  ANY_TWO_ZONES_EXC_ZONE_1,
  ANY_THREE_ZONES,
  ANY_BUS_JOURNEY,
} = JOURNEY_TYPES;

export type Journey = ANY_1_OUTSIDE_ZONE_1 |
           ANY_TWO_ZONES_INC_ZONE_1 |
           ANY_TWO_ZONES_EXC_ZONE_1 |
           ANY_THREE_ZONES |
           ANY_BUS_JOURNEY;

export type Fare = {
  pricePennies: number,
  journey: Journey,
};


export type Zone = {
  name: string,
};

export type Station = {
  name: string,
  zones: Array<Zone>,
};
