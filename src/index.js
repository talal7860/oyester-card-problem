import { maxBy, sumBy } from 'lodash/fp';
import { InSufficentBalance } from './errors';
import {
  Trip,
} from './trip';

const getMaxFare = (fares: Array<Object>) =>
  maxBy(fare => fare.pricePennies, fares).pricePennies;

const getTripObjs = (trips: Array<Object>) =>
  trips.map(trip => Trip.tripFromObject(trip));

const calculateFare = (
  fares: Array<Object>,
  stations: Array<Object>,
  trips: Array<Object>,
  swipedIn: boolean,
) : number => {
  let totalFare = 0;
  if (swipedIn === true) {
    totalFare = sumBy((trip) => trip.getFare(fares, stations), getTripObjs(trips));
  } else {
    totalFare = getMaxFare(fares);
  }
  return totalFare;
};


const calculateBalance = (
  balance: number,
  fares: Array<Object>,
  stations: Array<Object>,
  trips: Array<Object>,
  swipedIn: boolean,
) => {
  const remainingBalance = balance - calculateFare(fares, stations, trips, swipedIn);
  if (remainingBalance < 0) {
    throw new InSufficentBalance();
  } else {
    return remainingBalance;
  }
};

export {
  calculateBalance,
  calculateBalance as default,
};
