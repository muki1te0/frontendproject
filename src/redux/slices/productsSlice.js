import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch products from the API
export const getProducts = createAsyncThunk("products/getProducts", async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  return data;
});

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [], // Product list
    status: "idle", // Loading status: idle, loading, succeeded, failed
    error: null, // Error message
  },
  reducers: {
    addProduct: (state, action) => {
      const newProduct = { id: Date.now(), ...action.payload }; // Assign a unique ID
      state.products.push(newProduct); // Add product to the list
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter((product) => product.id !== action.payload); // Remove product
    },
    updateProduct: (state, action) => {
      const { id, ...updatedProduct } = action.payload;
      const index = state.products.findIndex((product) => product.id === id);
      if (index !== -1) {
        state.products[index] = { ...state.products[index], ...updatedProduct }; // Update product
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = "loading"; // Set status to loading
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = "succeeded"; // Set status to succeeded
        state.products = action.payload; // Store fetched products
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = "failed"; // Set status to failed
        state.error = action.error.message; // Capture error message
      });
  },
});

// Export the reducers and the async thunk
export const { addProduct, deleteProduct, updateProduct } = productsSlice.actions;
export default productsSlice.reducer;
