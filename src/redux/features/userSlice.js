import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userData:{
        "email": undefined,
        "username": undefined,
        "_id": undefined,
        "iat": undefined
    },
    isUserLogin: false,
};
// An object of "case reducers". Key names will be used to generate actions.

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setIsUserLogin: (state, action) => {
      state.isUserLogin = action.payload;
      if (action.payload === false){
        state.userData = initialState.userData
      }
    },
  },
});


export const { setUserData, setIsUserLogin } = userSlice.actions;

export default userSlice.reducer;
