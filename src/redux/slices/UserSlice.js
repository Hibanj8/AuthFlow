import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    username: "",
    email: "",
    role: "",

    isAuthenticated: false, 
  },
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.username = action.payload.email;
      state.username = action.payload.role;

      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.id = null;
      state.username = "";
      state.email= "",
      state.role = "";
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;