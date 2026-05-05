import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { loadFavorites } from '../store/slices/favoritesSlice';
import { COLORS } from '../utils/constants';

export const FavoritesScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading } = useSelector((state: RootState) => state.favorites);

  useEffect(() => {
    dispatch(loadFavorites());
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.stopCode}>{item.code}</Text>
            <Text style={styles.stopName}>{item.name}</Text>
            <Text style={styles.stopRoad}>{item.roadName}</Text>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              {loading ? 'Loading...' : 'No favorites yet'}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    backgroundColor: COLORS.card,
  },
  card: {
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: COLORS.card,
    borderRadius: 8,
  },
  stopCode: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  stopName: {
    fontSize: 14,
    color: COLORS.text,
    marginTop: 4,
  },
  stopRoad: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  empty: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
});
