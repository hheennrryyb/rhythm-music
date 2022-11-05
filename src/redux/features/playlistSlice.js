import { createSlice } from '@reduxjs/toolkit';

const initialState = {
};
// An object of "case reducers". Key names will be used to generate actions.

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    // setPlaylistsData: (state, action) => {
    //   state.playlistsData = action.payload;
    // },
  },
});

export const { setPlaylistsData } = playlistSlice.actions;

export default playlistSlice.reducer;
