import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { BusStop } from '../../types/BusStop';
import { getAllBusStops, getBusStopByCode, searchBusStops } from '../../api/firebase/busStops';

interface BusStopsState {
  all: BusStop[];
  searchResults: BusStop[];
  selected: BusStop | null;
  loading: boolean;
  error: string | null;
}

const initialState: BusStopsState = {
  all: [],
  searchResults: [],
  selected: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchAllBusStops = createAsyncThunk('busStops/fetchAll', async () => {
  return await getAllBusStops();
});

export const fetchBusStopByCode = createAsyncThunk(
  'busStops/fetchByCode',
  async (code: string) => {
    return await getBusStopByCode(code);
  }
);

export const searchBusStopsThunk = createAsyncThunk(
  'busStops/search',
  async (searchTerm: string) => {
    return await searchBusStops(searchTerm);
  }
);

// Slice
const busStopsSlice = createSlice({
  name: 'busStops',
  initialState,
  reducers: {
    setSelectedBusStop: (state, action: PayloadAction<BusStop | null>) => {
      state.selected = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchAllBusStops.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllBusStops.fulfilled, (state, action: PayloadAction<BusStop[]>) => {
        state.loading = false;
        state.all = action.payload;
      })
      .addCase(fetchAllBusStops.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch bus stops';
      })
      // Fetch by code
      .addCase(fetchBusStopByCode.fulfilled, (state, action: PayloadAction<BusStop | null>) => {
        state.selected = action.payload;
      })
      // Search
      .addCase(searchBusStopsThunk.fulfilled, (state, action: PayloadAction<BusStop[]>) => {
        state.searchResults = action.payload;
      });
  },
});

export const { setSelectedBusStop, clearSearchResults } = busStopsSlice.actions;
export default busStopsSlice.reducer;
