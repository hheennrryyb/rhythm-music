import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import playlistReducer from './features/playlistSlice'
// import {setPlaylistsData} from '../redux/features/playlistSlice'
// import { useDispatch, useSelector } from 'react-redux'
// import axios from 'axios';

import { shazamCoreApi , testShazamCoreApi} from './services/shazamCore';
import { rhythmUserApi } from './services/rhythmUser';

import { userId } from '../assets/constants';

export const store = configureStore({
  reducer: {
    [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
    [testShazamCoreApi.reducerPath]: testShazamCoreApi.reducer,
    [rhythmUserApi.reducerPath]: rhythmUserApi.reducer,
    player: playerReducer,
    playlist: playlistReducer,

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shazamCoreApi.middleware),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(testShazamCoreApi.middleware),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rhythmUserApi.middleware),
});

// store.subscribe(()=> 
// axios.get(`http://localhost:8080/users/${testUser}`)
// .then((response)=>{
//   const dispatch = useDispatch()
//   dispatch(setPlaylistsData(response.data.savedPlaylists))
// })
// .catch((err) => console.log(err)))