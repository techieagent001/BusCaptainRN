import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_CONSTANTS } from '../utils/constants';
import { BusStop } from '../types/BusStop';
import { ScheduledNotification, AlightingNotification } from '../types/Notification';

/**
 * Storage service for persisting app data locally
 */
export class StorageService {
  // Favorites
  static async getFavorites(): Promise<BusStop[]> {
    try {
      const data = await AsyncStorage.getItem(APP_CONSTANTS.STORAGE_KEYS.FAVORITES);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  }

  static async saveFavorites(favorites: BusStop[]): Promise<void> {
    try {
      await AsyncStorage.setItem(
        APP_CONSTANTS.STORAGE_KEYS.FAVORITES,
        JSON.stringify(favorites)
      );
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }

  static async addFavorite(busStop: BusStop): Promise<void> {
    const favorites = await this.getFavorites();
    
    // Check if already exists
    if (favorites.some((fav) => fav.code === busStop.code)) {
      return;
    }

    // Check limit
    if (favorites.length >= APP_CONSTANTS.FAVORITE_BUS_STOP_LIMIT) {
      throw new Error(
        `You can only save up to ${APP_CONSTANTS.FAVORITE_BUS_STOP_LIMIT} favorites`
      );
    }

    favorites.push({ ...busStop, isFavorite: true });
    await this.saveFavorites(favorites);
  }

  static async removeFavorite(busStopCode: string): Promise<void> {
    const favorites = await this.getFavorites();
    const updated = favorites.filter((fav) => fav.code !== busStopCode);
    await this.saveFavorites(updated);
  }

  static async isFavorite(busStopCode: string): Promise<boolean> {
    const favorites = await this.getFavorites();
    return favorites.some((fav) => fav.code === busStopCode);
  }

  // Notifications
  static async getScheduledNotifications(): Promise<ScheduledNotification[]> {
    try {
      const data = await AsyncStorage.getItem(APP_CONSTANTS.STORAGE_KEYS.NOTIFICATIONS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting notifications:', error);
      return [];
    }
  }

  static async saveScheduledNotifications(
    notifications: ScheduledNotification[]
  ): Promise<void> {
    try {
      await AsyncStorage.setItem(
        APP_CONSTANTS.STORAGE_KEYS.NOTIFICATIONS,
        JSON.stringify(notifications)
      );
    } catch (error) {
      console.error('Error saving notifications:', error);
    }
  }

  // Settings
  static async getSetting(key: string): Promise<any> {
    try {
      const settings = await AsyncStorage.getItem(APP_CONSTANTS.STORAGE_KEYS.USER_SETTINGS);
      if (!settings) return null;
      const parsed = JSON.parse(settings);
      return parsed[key];
    } catch (error) {
      console.error('Error getting setting:', error);
      return null;
    }
  }

  static async saveSetting(key: string, value: any): Promise<void> {
    try {
      const settings = await AsyncStorage.getItem(APP_CONSTANTS.STORAGE_KEYS.USER_SETTINGS);
      const parsed = settings ? JSON.parse(settings) : {};
      parsed[key] = value;
      await AsyncStorage.setItem(
        APP_CONSTANTS.STORAGE_KEYS.USER_SETTINGS,
        JSON.stringify(parsed)
      );
    } catch (error) {
      console.error('Error saving setting:', error);
    }
  }

  // Clear all data
  static async clearAll(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        APP_CONSTANTS.STORAGE_KEYS.FAVORITES,
        APP_CONSTANTS.STORAGE_KEYS.NOTIFICATIONS,
        APP_CONSTANTS.STORAGE_KEYS.USER_SETTINGS,
      ]);
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }
}
