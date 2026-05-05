import * as Location from 'expo-location';
import { calculateDistance } from '../utils/distance';
import { BusStop, NearbyBusStop } from '../types/BusStop';
import { APP_CONSTANTS } from '../utils/constants';

export interface UserLocation {
  latitude: number;
  longitude: number;
}

/**
 * Service for handling location-related functionality
 */
export class LocationService {
  private static watchId: Location.LocationSubscription | null = null;

  /**
   * Request location permissions
   */
  static async requestPermissions(): Promise<boolean> {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
  }

  /**
   * Get current location
   */
  static async getCurrentLocation(): Promise<UserLocation | null> {
    try {
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) {
        throw new Error('Location permission denied');
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    } catch (error) {
      console.error('Error getting location:', error);
      return null;
    }
  }

  /**
   * Watch location changes
   */
  static async startWatchingLocation(
    callback: (location: UserLocation) => void
  ): Promise<void> {
    const hasPermission = await this.requestPermissions();
    if (!hasPermission) {
      throw new Error('Location permission denied');
    }

    this.watchId = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Balanced,
        timeInterval: APP_CONSTANTS.LOCATION_UPDATE_INTERVAL,
        distanceInterval: 50, // Update every 50 meters
      },
      (location) => {
        callback({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      }
    );
  }

  /**
   * Stop watching location
   */
  static stopWatchingLocation(): void {
    if (this.watchId) {
      this.watchId.remove();
      this.watchId = null;
    }
  }

  /**
   * Get nearby bus stops from a list
   */
  static getNearbyBusStops(
    userLocation: UserLocation,
    allBusStops: BusStop[],
    radiusMeters: number = APP_CONSTANTS.NEARBY_RADIUS
  ): NearbyBusStop[] {
    return allBusStops
      .map((stop) => {
        const distance = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          stop.latitude,
          stop.longitude
        );

        return {
          ...stop,
          distance,
        };
      })
      .filter((stop) => stop.distance <= radiusMeters)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, APP_CONSTANTS.NEARBY_BUS_STOPS_LIMIT);
  }

  /**
   * Request background location permission
   */
  static async requestBackgroundPermission(): Promise<boolean> {
    const { status } = await Location.requestBackgroundPermissionsAsync();
    return status === 'granted';
  }
}
