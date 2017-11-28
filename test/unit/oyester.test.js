import { expect } from 'chai';
import fares from '../fixtures/fares.json';
import stations from '../fixtures/stations.json';
import trip1 from '../fixtures/trip1.json';
import { calculateFare } from '../../src/index';

describe('Fare Calculation', () => {
  it('should calculate the fare of zone 1 only journey successfully', () => {
    console.log(fares);
    const fare = calculateFare(fares, stations, trip1);
    console.log(fare);
    expect(0).to.eql(4);
  });
});
