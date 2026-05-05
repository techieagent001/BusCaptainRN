export interface BusArrival {
  serviceNo: string;
  operator: string;
  nextBus: NextBus;
  nextBus2: NextBus;
  nextBus3: NextBus;
}

export interface NextBus {
  originCode: string;
  destinationCode: string;
  estimatedArrival: string; // ISO string
  latitude: number;
  longitude: number;
  visitNumber: number;
  load: BusLoad;
  feature: BusFeature;
  type: BusType;
}

export enum BusLoad {
  SEA = 'Seats Available',
  SDA = 'Standing Available',
  LSD = 'Limited Standing',
}

export enum BusFeature {
  WAB = 'Wheelchair Accessible',
}

export enum BusType {
  SD = 'Single Deck',
  DD = 'Double Deck',
  BD = 'Bendy',
}

export interface BusArrivalResponse {
  busStopCode: string;
  services: BusArrival[];
}
