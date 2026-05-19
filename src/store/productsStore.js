import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://35.209.43.87:3001/api/products');
      if (!response.ok) {
        throw new Error('Не удалось загрузить продукты');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProductAsync = createAsyncThunk(
  'products/deleteProductAsync',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://35.209.43.87:3001/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Не удалось удалить продукт на сервере');
      }

      return productId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    list: [],
    status: 'idle', 
    error: null,
  },
  reducers: {
    deleteProduct: (state, action) => {
      state.list = state.list.filter(product => product.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload; 
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.list = state.list.filter(product => product.id !== action.payload);
      })
      .addCase(deleteProductAsync.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});


export default productsSlice.reducer;