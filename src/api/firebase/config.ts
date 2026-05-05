import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

// TODO: Replace with your Firebase config
const firebaseConfig = {
  apiKey: 'AIzaSyBJIcQ4WWjmQb-I_mBvwgStWRviXpy8qN8',
  authDomain: 'YOUR_AUTH_DOMAIN',
  databaseURL: 'https://bus-captain-19bc1-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'bus-captain-19bc1',
  storageBucket: 'bus-captain-19bc1.firebasestorage.app',
  messagingSenderId: '343688949162',
  appId: '1:343688949162:ios:8698a7609ac1b899e10fd3',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
