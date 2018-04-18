
export const 
if (intersection([1, 2, 3], zones).length === 3) {
    return ANY_THREE_ZONES;
  } else if (startStation.zones.length === 1 && startStation.zones[0] === 1 && endStation.zones.length === 1 && endStation[0] === 1) {
    return ZONE_1;
  } else if ((includes(1, startStation.zones) || includes(1, endStation.zones)) && (startStation.zones.length > 1 || endStation.zones.length > 1)) {
    return ANY_TWO_ZONES_INC_ZONE_1;
  } else if (without([1], startStation.zones).length === 1 && without([1], endStation.zones).length === 1 && without([1], zones).length === 1) {
    return ANY_1_OUTSIDE_ZONE_1;
  } else if (zones.length === 2 && without([1], zones).length === 1) {
    return ANY_TWO_ZONES_INC_ZONE_1;
  } // else if (zones.length === 2 && !includes(1, zones)) {
  // }

