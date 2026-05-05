export interface BusStop {
  code: string;
  name: string;
  roadName: string;
  latitude: number;
  longitude: number;
  distance?: number; // Distance from user in meters
  isFavorite?: boolean;
}

export interface NearbyBusStop extends BusStop {
  distance: number;
}
