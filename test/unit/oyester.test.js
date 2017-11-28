import { expect } from 'chai';
import fares from '../fixtures/fares.json';
import stations from '../fixtures/stations.json';
import trip1 from '../fixtures/trip1.json';
import trip2 from '../fixtures/trip2.json';
import trip3 from '../fixtures/trip3.json';
import trip4 from '../fixtures/trip4.json';
import trip5 from '../fixtures/trip5.json';
import { calculateBalance } from '../../src/index';

describe('Balance Calculation from total of £30', () => {
  let balance = 3000;
  it('should calculate the balance of Holborn from Earl\'s Court as £27.50', () => {
    const fare = calculateBalance(balance, fares, stations, trip1);
    expect(fare).to.eql(2750);
  });

  it('should calculate the balance of the trip from Holborn to Wimbledon as £27.00', () => {
    const fare = calculateBalance(balance, fares, stations, trip2);
    expect(fare).to.eql(2700);
  });

  it('should calculate the balance of the trip from Earl\'s Court to Hammersmith as £28.00', () => {
    const fare = calculateBalance(balance, fares, stations, trip3);
    expect(fare).to.eql(2800);
  });

  it('should calculate the balance of the trip from Hammersmith to Wimbledon as £27.75', () => {
    const fare = calculateBalance(balance, fares, stations, trip4);
    expect(fare).to.eql(2775);
  });

  it('should calculate the trip from Hammersmith to Wimbledon as £27.75', () => {
    const fare = calculateBalance(balance, fares, stations, trip4);
    expect(fare).to.eql(2775);
  });

  it('should calculate the trip from Earl\'s Court to Wimbledon as £26.80', () => {
    const fare = calculateBalance(balance, fares, stations, trip5);
    expect(fare).to.eql(2680);
  });
});
