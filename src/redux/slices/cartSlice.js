import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Array of cart items
  },
  reducers: {
    addToCart(state, action) {
      // Check if the item already exists in the cart
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (!existingItem) {
        state.items.push({ ...action.payload, quantity: 1 });
      } else {
        existingItem.quantity++;
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload; // Destructure id and new quantity
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
