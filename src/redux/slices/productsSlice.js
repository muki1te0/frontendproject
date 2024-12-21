import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk("products/getProducts", async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  return data;
});

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addProduct: (state, action) => {
      const newProduct = { id: Date.now(), ...action.payload };
      state.products.push(newProduct);
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter((product) => product.id !== action.payload);
    },
    updateProduct: (state, action) => {
      const { id, ...updatedProduct } = action.payload;
      const index = state.products.findIndex((product) => product.id === id);
      if (index !== -1) {
        state.products[index] = { ...state.products[index], ...updatedProduct };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});


export const { addProduct, deleteProduct, updateProduct } = productsSlice.actions;
export default productsSlice.reducer;
