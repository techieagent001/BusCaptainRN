export interface BusRoute {
  serviceNo: string;
  operator: string;
  direction: number;
  stopSequence: number;
  busStopCode: string;
  distance: number;
  wdFirstBus: string;
  wdLastBus: string;
  satFirstBus: string;
  satLastBus: string;
  sunFirstBus: string;
  sunLastBus: string;
}

export interface BusService {
  serviceNo: string;
  operator: string;
  originCode: string;
  destinationCode: string;
  loopDescription?: string;
}
