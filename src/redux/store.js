import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import cartReducer from './slices/cartSlice'; // Import cart slice
import wishlistReducer from './slices/wishlistSlice'; // Import wishlist slice

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer, // Add cart reducer
    wishlist: wishlistReducer, // Add wishlist reducer
  },
});
