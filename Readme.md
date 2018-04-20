# The Oyster Card Problem

[![CircleCI](https://circleci.com/gh/talal7860/oyester-card-problem.svg?style=svg)](https://circleci.com/gh/talal7860/oyester-card-problem)
[![Coverage Status](https://coveralls.io/repos/github/talal7860/oyester-card-problem/badge.svg?branch=master)](https://coveralls.io/github/talal7860/oyester-card-problem?branch=master)

This problem models the following fare card system which is a limited version of
London’s Oyster card system. At the end of the test, the tests written demonstrates a user
 loading a card with £30, and taking the following trips, and then viewing the balance.

- Tube Holborn to Earl’s Court
- 328 bus from Earl’s Court to Chelsea
- Tube Earl’s court to Hammersmith

## Operation

When the user passes through the inward barrier at the station, their oyster card is charged
the maximum fare.
When they pass out of the barrier at the exit station, the fare is calculated and the maximum
fare transaction removed and replaced with the real transaction (in this way, if the user
doesn’t swipe out, they are charged the maximum fare).


All bus journeys are charged at the same price.
The system should favour the customer where more than one fare is possible for a given
journey. E.g. Holburn to Earl’s Court is charged at £2.50.
For the purposes of this test use the following data:

## Stations and zones:

**Station Zone(s)**  
Holborn 1  
Earl’s Court 1, 2  
Wimbledon 3  
Hammersmith 2  

## Fares:

**Journey Fare**  
Anywhere in Zone 1 £2.  
Any one zone outside zone 1 £2.  
Any two zones including zone 1 £3.  
Any two zones excluding zone 1 £2.  
Any three zones £3.  
Any bus journey £1.  
The maximum possible fare is therefore £3.20.

## Setting up instructions
```shell
nvm use 6.1.0
yarn install
yarn run test
```
