import { BusArrival, BusArrivalResponse } from '../../types/BusArrival';
import { APP_CONSTANTS } from '../../utils/constants';

/**
 * Fetch real-time bus arrivals from LTA DataMall API
 * Note: You'll need an API key from LTA DataMall
 * https://datamall.lta.gov.sg/content/datamall/en/request-for-api.html
 */
export async function getBusArrivals(
  busStopCode: string,
  serviceNo?: string
): Promise<BusArrival[]> {
  try {
    // TODO: Add your LTA DataMall API key
    const API_KEY = 'YOUR_LTA_API_KEY';
    
    let url = `${APP_CONSTANTS.LTA_DATAMALL_BASE_URL}/BusArrivalv2?BusStopCode=${busStopCode}`;
    
    if (serviceNo) {
      url += `&ServiceNo=${serviceNo}`;
    }

    const response = await fetch(url, {
      headers: {
        AccountKey: API_KEY,
        accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch bus arrivals');
    }

    const data: BusArrivalResponse = await response.json();
    return data.services || [];
  } catch (error) {
    console.error('Error fetching bus arrivals:', error);
    throw error;
  }
}

/**
 * Get bus arrivals with auto-refresh
 */
export class BusArrivalService {
  private intervalId: NodeJS.Timeout | null = null;
  private callback: ((arrivals: BusArrival[]) => void) | null = null;

  startAutoRefresh(
    busStopCode: string,
    callback: (arrivals: BusArrival[]) => void,
    intervalMs: number = APP_CONSTANTS.BUS_ARRIVAL_REFRESH_INTERVAL
  ) {
    this.callback = callback;

    // Initial fetch
    this.fetchAndNotify(busStopCode);

    // Set up interval
    this.intervalId = setInterval(() => {
      this.fetchAndNotify(busStopCode);
    }, intervalMs);
  }

  private async fetchAndNotify(busStopCode: string) {
    try {
      const arrivals = await getBusArrivals(busStopCode);
      if (this.callback) {
        this.callback(arrivals);
      }
    } catch (error) {
      console.error('Error in auto-refresh:', error);
    }
  }

  stopAutoRefresh() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.callback = null;
  }
}
