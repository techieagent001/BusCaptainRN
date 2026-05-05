import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { LocationService, UserLocation } from '../services/locationService';
import { BusStop, NearbyBusStop } from '../types/BusStop';
import { BusArrival } from '../types/BusArrival';
import { getBusArrivals } from '../api/firebase/busArrivals';
import { formatDistance } from '../utils/distance';
import { formatArrivalTime } from '../utils/formatting';
import { COLORS } from '../utils/constants';

export const HomeScreen = () => {
  const dispatch = useDispatch();
  const { all: allBusStops } = useSelector((state: RootState) => state.busStops);

  const [location, setLocation] = useState<UserLocation | null>(null);
  const [nearbyStops, setNearbyStops] = useState<NearbyBusStop[]>([]);
  const [selectedStop, setSelectedStop] = useState<NearbyBusStop | null>(null);
  const [arrivals, setArrivals] = useState<BusArrival[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Get user location
  useEffect(() => {
    LocationService.getCurrentLocation().then(setLocation);
  }, []);

  // Get nearby bus stops when location changes
  useEffect(() => {
    if (location && allBusStops.length > 0) {
      const nearby = LocationService.getNearbyBusStops(location, allBusStops);
      setNearbyStops(nearby);
      
      // Auto-select first nearby stop
      if (nearby.length > 0 && !selectedStop) {
        setSelectedStop(nearby[0]);
      }
    }
  }, [location, allBusStops]);

  // Fetch bus arrivals when stop is selected
  useEffect(() => {
    if (selectedStop) {
      fetchArrivals();
    }
  }, [selectedStop]);

  const fetchArrivals = async () => {
    if (!selectedStop) return;

    setLoading(true);
    try {
      const data = await getBusArrivals(selectedStop.code);
      setArrivals(data);
    } catch (error) {
      console.error('Error fetching arrivals:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchArrivals();
    setRefreshing(false);
  };

  const renderNearbyStop = ({ item }: { item: NearbyBusStop }) => (
    <TouchableOpacity
      style={[
        styles.nearbyStopCard,
        selectedStop?.code === item.code && styles.nearbyStopCardSelected,
      ]}
      onPress={() => setSelectedStop(item)}
    >
      <Text style={styles.stopCode}>{item.code}</Text>
      <Text style={styles.stopName} numberOfLines={2}>
        {item.name}
      </Text>
      <Text style={styles.stopDistance}>{formatDistance(item.distance)}</Text>
    </TouchableOpacity>
  );

  const renderArrival = ({ item }: { item: BusArrival }) => (
    <View style={styles.arrivalCard}>
      <View style={styles.arrivalHeader}>
        <Text style={styles.serviceNo}>{item.serviceNo}</Text>
        <Text style={styles.operator}>{item.operator}</Text>
      </View>
      <View style={styles.arrivalTimes}>
        <Text style={styles.arrivalTime}>
          {item.nextBus?.estimatedArrival
            ? formatArrivalTime(item.nextBus.estimatedArrival)
            : 'N/A'}
        </Text>
        <Text style={styles.arrivalTime}>
          {item.nextBus2?.estimatedArrival
            ? formatArrivalTime(item.nextBus2.estimatedArrival)
            : '-'}
        </Text>
        <Text style={styles.arrivalTime}>
          {item.nextBus3?.estimatedArrival
            ? formatArrivalTime(item.nextBus3.estimatedArrival)
            : '-'}
        </Text>
      </View>
    </View>
  );

  if (!location) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Getting your location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Nearby Bus Stops Carousel */}
      <View style={styles.nearbySection}>
        <Text style={styles.sectionTitle}>Nearby Bus Stops</Text>
        <FlatList
          horizontal
          data={nearbyStops}
          renderItem={renderNearbyStop}
          keyExtractor={(item) => item.code}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.nearbyList}
        />
      </View>

      {/* Selected Bus Stop Info */}
      {selectedStop && (
        <View style={styles.selectedStopInfo}>
          <Text style={styles.selectedStopName}>{selectedStop.name}</Text>
          <Text style={styles.selectedStopRoad}>{selectedStop.roadName}</Text>
          <Text style={styles.selectedStopCode}>Stop {selectedStop.code}</Text>
        </View>
      )}

      {/* Bus Arrivals */}
      <FlatList
        data={arrivals}
        renderItem={renderArrival}
        keyExtractor={(item) => item.serviceNo}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {loading ? 'Loading arrivals...' : 'No buses arriving soon'}
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  nearbySection: {
    paddingVertical: 16,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  nearbyList: {
    paddingHorizontal: 16,
  },
  nearbyStopCard: {
    width: 120,
    padding: 12,
    marginRight: 12,
    backgroundColor: COLORS.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  nearbyStopCardSelected: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  stopCode: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  stopName: {
    fontSize: 12,
    color: COLORS.text,
    marginBottom: 4,
  },
  stopDistance: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  selectedStopInfo: {
    padding: 16,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  selectedStopName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  selectedStopRoad: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  selectedStopCode: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  arrivalCard: {
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: COLORS.card,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  arrivalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  serviceNo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  operator: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  arrivalTimes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  arrivalTime: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.success,
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
});
