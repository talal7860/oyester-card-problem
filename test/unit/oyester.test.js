import { expect } from 'chai';
import fares from '../fixtures/fares.json';
import stations from '../fixtures/stations.json';
import trip1 from '../fixtures/trip1.json';
import trip2 from '../fixtures/trip2.json';
import trip3 from '../fixtures/trip3.json';
import { calculateFare } from '../../src/index';

describe('Fare Calculation', () => {
  it('should calculate the fare of Holborn from Earl\'s Court as $2.50 pennies', () => {
    const fare = calculateFare(fares, stations, trip1);
    expect(fare).to.eql(250);
  });

  it('should calculate the trip from Holborn to Wimbledon as $3.00 pennies', () => {
    const fare = calculateFare(fares, stations, trip2);
    expect(fare).to.eql(300);
  });

  it('should calculate the trip from Earl\'s Court to Hammersmith as $2.00 pennies', () => {
    const fare = calculateFare(fares, stations, trip2);
    expect(fare).to.eql(200);
  });
});
