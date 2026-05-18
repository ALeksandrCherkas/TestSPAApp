import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const deleteOrderAsync = createAsyncThunk(
  'orders/deleteOrder', 
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://35.209.214.95:3001/api/orders/${orderId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete order');
      }
      return orderId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
    const response = await fetch('http://35.209.214.95:3001/api/orders');
    if (!response.ok) throw new Error('Failed to fetch orders');
    return await response.json();
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState: { items: [], status: 'idle' },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.items = action.payload; 
        state.status = 'succeeded';
      })
      .addCase(deleteOrderAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(order => order.id !== action.payload);
      });
  },
});


export default ordersSlice.reducer;