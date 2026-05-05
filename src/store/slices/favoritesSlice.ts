import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { BusStop } from '../../types/BusStop';
import { StorageService } from '../../services/storageService';

interface FavoritesState {
  items: BusStop[];
  loading: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  items: [],
  loading: false,
  error: null,
};

// Async thunks
export const loadFavorites = createAsyncThunk('favorites/load', async () => {
  return await StorageService.getFavorites();
});

export const addFavorite = createAsyncThunk(
  'favorites/add',
  async (busStop: BusStop, { rejectWithValue }) => {
    try {
      await StorageService.addFavorite(busStop);
      return busStop;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeFavorite = createAsyncThunk(
  'favorites/remove',
  async (busStopCode: string) => {
    await StorageService.removeFavorite(busStopCode);
    return busStopCode;
  }
);

// Slice
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Load favorites
      .addCase(loadFavorites.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadFavorites.fulfilled, (state, action: PayloadAction<BusStop[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load favorites';
      })
      // Add favorite
      .addCase(addFavorite.fulfilled, (state, action: PayloadAction<BusStop>) => {
        state.items.push(action.payload);
        state.error = null;
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      // Remove favorite
      .addCase(removeFavorite.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter((item) => item.code !== action.payload);
      });
  },
});

export const { clearError } = favoritesSlice.actions;
export default favoritesSlice.reducer;
