import { maxBy } from 'lodash/fp';
import {
  // Journey,
  Fare,
  // Zone,
  // Station,
} from './types';

const getMaximumFare = (fares: Array<Fare>) =>
  maxBy(fare => fare.pricePennies, fares);
