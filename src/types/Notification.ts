export interface ScheduledNotification {
  id: string;
  busStopCode: string;
  busStopName: string;
  serviceNo: string;
  minutesBefore: number;
  enabled: boolean;
  createdAt: string;
}

export interface AlightingNotification {
  id: string;
  busStopCode: string;
  busStopName: string;
  distanceThreshold: number; // meters
  enabled: boolean;
  serviceNo?: string;
  createdAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  expiresAt?: string;
  priority: 'low' | 'medium' | 'high';
}
