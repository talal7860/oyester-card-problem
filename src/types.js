import { JOURNEY_TYPES, TRANSPORTS } from './consts';

const {
  ZONE_1,
  ANY_1_OUTSIDE_ZONE_1,
  ANY_TWO_ZONES_INC_ZONE_1,
  ANY_TWO_ZONES_EXC_ZONE_1,
  ANY_THREE_ZONES,
  ANY_BUS_JOURNEY,
} = JOURNEY_TYPES;

export type Journey = ZONE_1 |
           ANY_1_OUTSIDE_ZONE_1 |
           ANY_TWO_ZONES_INC_ZONE_1 |
           ANY_TWO_ZONES_EXC_ZONE_1 |
           ANY_THREE_ZONES |
           ANY_BUS_JOURNEY;

export type Fare = {
  pricePennies: number,
  journey: Journey,
};


export type Zone = 1 | 2 | 3;

export type Station = {
  name: string,
  zones: Array<Zone>,
};

export type Transport = TRANSPORTS.bus | TRANSPORTS.tube;

export type Trip = {
  start: string,
  end: string,
  transport: Transport,
};

