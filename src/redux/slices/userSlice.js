import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {
    username: "",
    profilePicture: "/default-profile.png",
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    mobileNumber: "",
    birthdate: "",
    wishlist: [],
    cart: [],
  },
  isAuthenticated: false,
};


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserInfo(state, action) {
      state.userInfo = { ...state.userInfo, ...action.payload };
      localStorage.setItem("user", JSON.stringify(state.userInfo));
    },
    updateProfilePicture(state, action) {
      state.userInfo.profilePicture = action.payload;
      localStorage.setItem("user", JSON.stringify(state.userInfo));
    },
    login(state, action) {
      state.userInfo = {
        ...action.payload,
        cart: action.payload.cart || [],
        wishlist: action.payload.wishlist || [],
      };
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(state.userInfo));
    },
    logout(state) {
      state.userInfo = initialState.userInfo;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
    },
    loadUserFromStorage(state) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        state.userInfo = {
          ...storedUser,
          cart: storedUser.cart || [],
          wishlist: storedUser.wishlist || [],
        };
        state.isAuthenticated = true;
      }
    },
    addToCart(state, action) {
      if (!state.userInfo.cart.some((item) => item.id === action.payload.id)) {
        state.userInfo.cart.push(action.payload);
      }
    },
    removeFromCart(state, action) {
      state.userInfo.cart = state.userInfo.cart.filter(
        (item) => item.id !== action.payload
      );
    },
    addToWishlist(state, action) {
      const newItem = action.payload;
      if (!state.userInfo.wishlist.some((item) => item.id === newItem.id)) {
        state.userInfo.wishlist.push(newItem);
        localStorage.setItem("user", JSON.stringify(state.userInfo));
      }
    },
    removeFromWishlist(state, action) {
      state.userInfo.wishlist = state.userInfo.wishlist.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("user", JSON.stringify(state.userInfo));
    },
  },
});

export const {
  updateUserInfo,
  updateProfilePicture,
  login,
  logout,
  loadUserFromStorage,
  addToCart,
  removeFromCart,
  addToWishlist,
  removeFromWishlist,
} = userSlice.actions;

export default userSlice.reducer;
