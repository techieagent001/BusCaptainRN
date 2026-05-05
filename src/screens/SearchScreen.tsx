import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { searchBusStopsThunk } from '../store/slices/busStopsSlice';
import { COLORS } from '../utils/constants';

export const SearchScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchResults } = useSelector((state: RootState) => state.busStops);
  const [searchText, setSearchText] = useState('');

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text.length >= 2) {
      dispatch(searchBusStopsThunk(text));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by bus stop name, code, or road..."
          value={searchText}
          onChangeText={handleSearch}
          autoCapitalize="none"
        />
      </View>
      
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <View style={styles.resultCard}>
            <Text style={styles.stopCode}>{item.code}</Text>
            <Text style={styles.stopName}>{item.name}</Text>
            <Text style={styles.stopRoad}>{item.roadName}</Text>
          </View>
        )}
        ListEmptyComponent={
          searchText.length > 0 ? (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>No results found</Text>
            </View>
          ) : null
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
  searchBar: {
    padding: 16,
    backgroundColor: COLORS.card,
  },
  searchInput: {
    padding: 12,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    fontSize: 16,
  },
  resultCard: {
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 4,
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
