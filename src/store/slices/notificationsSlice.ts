import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ScheduledNotification } from '../../types/Notification';

interface NotificationsState {
  scheduled: ScheduledNotification[];
  enabled: boolean;
}

const initialState: NotificationsState = {
  scheduled: [],
  enabled: true,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<ScheduledNotification>) => {
      state.scheduled.push(action.payload);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.scheduled = state.scheduled.filter((n) => n.id !== action.payload);
    },
    toggleNotification: (state, action: PayloadAction<string>) => {
      const notification = state.scheduled.find((n) => n.id === action.payload);
      if (notification) {
        notification.enabled = !notification.enabled;
      }
    },
    setNotificationsEnabled: (state, action: PayloadAction<boolean>) => {
      state.enabled = action.payload;
    },
  },
});

export const {
  addNotification,
  removeNotification,
  toggleNotification,
  setNotificationsEnabled,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
