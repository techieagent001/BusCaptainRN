import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

/**
 * Format arrival time to minutes
 */
export function formatArrivalTime(isoString: string): string {
  const now = dayjs();
  const arrivalTime = dayjs(isoString);
  const diffMinutes = arrivalTime.diff(now, 'minute');

  if (diffMinutes <= 0) {
    return 'Arr';
  } else if (diffMinutes === 1) {
    return '1 min';
  } else {
    return `${diffMinutes} mins`;
  }
}

/**
 * Format bus stop code for display
 */
export function formatBusStopCode(code: string): string {
  return code.padStart(5, '0');
}

/**
 * Format time to HH:mm
 */
export function formatTime(date: Date | string): string {
  return dayjs(date).format('HH:mm');
}

/**
 * Format date to readable string
 */
export function formatDate(date: Date | string): string {
  return dayjs(date).format('DD MMM YYYY');
}

/**
 * Get relative time (e.g., "2 hours ago")
 */
export function getRelativeTime(date: Date | string): string {
  return dayjs(date).fromNow();
}
