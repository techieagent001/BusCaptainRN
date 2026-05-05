export const APP_CONSTANTS = {
  // Limits
  FAVORITE_BUS_STOP_LIMIT: 10,
  FAVORITE_ROUTE_LIMIT: 20,
  SCHEDULED_NOTIFICATION_LIMIT: 10,
  NEARBY_BUS_STOPS_LIMIT: 10,
  
  // Distances (in meters)
  NEARBY_RADIUS: 500,
  ALIGHTING_DEFAULT_DISTANCE: 200,
  
  // Refresh intervals (in ms)
  BUS_ARRIVAL_REFRESH_INTERVAL: 30000, // 30 seconds
  LOCATION_UPDATE_INTERVAL: 10000, // 10 seconds
  
  // Map
  DEFAULT_MAP_ZOOM: 15,
  SINGAPORE_CENTER: {
    latitude: 1.3521,
    longitude: 103.8198,
  },
  
  // API
  LTA_DATAMALL_BASE_URL: 'http://datamall2.mytransport.sg/ltaodataservice',
  
  // Storage Keys
  STORAGE_KEYS: {
    FAVORITES: '@bus_captain_favorites',
    NOTIFICATIONS: '@bus_captain_notifications',
    THEME: '@bus_captain_theme',
    USER_SETTINGS: '@bus_captain_settings',
  },
};

export const COLORS = {
  primary: '#FF6B6B',
  secondary: '#4ECDC4',
  background: '#F7F7F7',
  card: '#FFFFFF',
  text: '#333333',
  textSecondary: '#666666',
  border: '#E0E0E0',
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#F44336',
  info: '#2196F3',
};

export const BUS_OPERATORS = {
  SBST: 'SBS Transit',
  SMRT: 'SMRT Corporation',
  TTS: 'Tower Transit Singapore',
  GAS: 'Go-Ahead Singapore',
};
