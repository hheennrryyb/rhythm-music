import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import userReducer from './features/userSlice'
// import {setPlaylistsData} from '../redux/features/playlistSlice'
// import { useDispatch, useSelector } from 'react-redux'
// import axios from 'axios';

import { shazamCoreApi , testShazamCoreApi} from './services/shazamCore';
import { rhythmUserApi } from './services/rhythmUser';


export const store = configureStore({
  reducer: {
    [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
    [testShazamCoreApi.reducerPath]: testShazamCoreApi.reducer,
    [rhythmUserApi.reducerPath]: rhythmUserApi.reducer,
    player: playerReducer,
    user:userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shazamCoreApi.middleware),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(testShazamCoreApi.middleware),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rhythmUserApi.middleware),
});

