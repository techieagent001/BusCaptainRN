import { ref, get, query, orderByChild, equalTo } from 'firebase/database';
import { database } from './config';
import { BusStop } from '../../types/BusStop';

/**
 * Get all bus stops from Firebase
 */
export async function getAllBusStops(): Promise<BusStop[]> {
  const busStopsRef = ref(database, 'BusStops');
  const snapshot = await get(busStopsRef);

  if (!snapshot.exists()) {
    return [];
  }

  const data = snapshot.val();
  return Object.keys(data).map((key) => ({
    code: data[key].BusStopCode,
    name: data[key].Description,
    roadName: data[key].RoadName,
    latitude: data[key].Latitude,
    longitude: data[key].Longitude,
  }));
}

/**
 * Get bus stop by code
 */
export async function getBusStopByCode(code: string): Promise<BusStop | null> {
  const busStopsRef = ref(database, 'BusStops');
  const busStopQuery = query(busStopsRef, orderByChild('BusStopCode'), equalTo(code));
  const snapshot = await get(busStopQuery);

  if (!snapshot.exists()) {
    return null;
  }

  const data = snapshot.val();
  const key = Object.keys(data)[0];
  const busStop = data[key];

  return {
    code: busStop.BusStopCode,
    name: busStop.Description,
    roadName: busStop.RoadName,
    latitude: busStop.Latitude,
    longitude: busStop.Longitude,
  };
}

/**
 * Search bus stops by name, code, or road name
 */
export async function searchBusStops(searchTerm: string): Promise<BusStop[]> {
  const busStops = await getAllBusStops();
  const term = searchTerm.toLowerCase();

  return busStops.filter(
    (stop) =>
      stop.name.toLowerCase().includes(term) ||
      stop.code.includes(term) ||
      stop.roadName.toLowerCase().includes(term)
  );
}
