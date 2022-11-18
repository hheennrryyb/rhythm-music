import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import userReducer from './features/userSlice'

import { rhythmCoreApi } from './services/shazamCore';
import { rhythmUserApi } from './services/rhythmUser';


export const store = configureStore({
  reducer: {
    [rhythmCoreApi.reducerPath]: rhythmCoreApi.reducer,
    [rhythmUserApi.reducerPath]: rhythmUserApi.reducer,
    player: playerReducer,
    user:userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rhythmCoreApi.middleware),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rhythmUserApi.middleware),
});

