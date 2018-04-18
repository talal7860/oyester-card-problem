import { expect } from 'chai';
import fares from '../fixtures/fares.json';
import stations from '../fixtures/stations.json';
import trip1 from '../fixtures/trip1.json';
import trip2 from '../fixtures/trip2.json';
import trip3 from '../fixtures/trip3.json';
import trip4 from '../fixtures/trip4.json';
import trip5 from '../fixtures/trip5.json';
import trip6 from '../fixtures/trip6.json';
import tripMain from '../fixtures/trip_main.json';
import { calculateBalance } from '../../src/index';
import { InSufficentBalance } from '../../src/errors';

describe('Balance Calculation from total of £30', () => {
  let balance = 3000;
  it('should calculate the balance of Holborn from Earl\'s Court as £27.00', () => {
    const fare = calculateBalance(balance, fares, stations, trip1, true);
    expect(fare).to.eql(2700);
  });

  it('should calculate the balance of the trip from Holborn to Wimbledon as £27.00', () => {
    const fare = calculateBalance(balance, fares, stations, trip2, true);
    expect(fare).to.eql(2700);
  });

  it('should calculate the balance of the trip from Earl\'s Court to Hammersmith as £27.00', () => {
    const fare = calculateBalance(balance, fares, stations, trip3, true);
    expect(fare).to.eql(2700);
  });

  it('should calculate the balance of the trip from Hammersmith to Wimbledon as £27.75', () => {
    const fare = calculateBalance(balance, fares, stations, trip4, true);
    expect(fare).to.eql(2775);
  });

  it('should calculate the balance of the trip from Hammersmith to Wimbledon as £27.75', () => {
    const fare = calculateBalance(balance, fares, stations, trip4, true);
    expect(fare).to.eql(2775);
  });

  it('should calculate the balance of the trip from Earl\'s Court to Wimbledon as £26.80', () => {
    const fare = calculateBalance(balance, fares, stations, trip5, true);
    expect(fare).to.eql(2680);
  });

  it('should calculate the balance of the trip through a bus as £28.20', () => {
    const fare = calculateBalance(balance, fares, stations, trip6, true);
    expect(fare).to.eql(2820);
  });

  it('should calculate the main trip as £22.20', () => {
    const fare = calculateBalance(balance, fares, stations, tripMain, true);
    expect(fare).to.eql(2220);
  });

  it('should calculate the fare as max if the user does not swipe in', () => {
    const balance = calculateBalance(3000, fares, stations, tripMain, false);
    expect(balance).to.eql(2680);
  });

  it('should allow the user to travel if the balance is sufficient', () => {
    const balance = calculateBalance(300, fares, stations, trip1, true);
    expect(balance).to.eql(0);
  });

  it('should not be allowed to travel if the balance is not sufficient', () => {
    try {
      const balance = calculateBalance(200, fares, stations, trip1, true);
    } catch (e) {
      expect(e).to.be.an.instanceof(InSufficentBalance);
    }
  });

});
