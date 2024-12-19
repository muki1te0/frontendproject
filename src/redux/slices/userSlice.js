import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { user: null, isAuthenticated: false },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
    },
    loadUserFromStorage: (state) => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        state.user = storedUser;
        state.isAuthenticated = true;
      }
    },
  },
});

export const { login, logout, loadUserFromStorage } = userSlice.actions;
export default userSlice.reducer;
