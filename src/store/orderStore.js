import { createSlice } from '@reduxjs/toolkit';

const initialOrders = [
    {
    id: 1,
    title: 'Длинное название прихода 1',
    date: '2017-06-29 12:09:33',
    description: 'desc',
    products: [1, 2]
  },
  {
    id: 2,
    title: 'Длинное название прихода 2',
    date: '2017-06-29 12:09:33',
    description: 'desc',
    products: [2]
  },
  {
    id: 3,
    title: 'Длинное название прихода 3',
    date: '2017-06-29 12:09:33',
    description: 'desc',
    products: [1]
  }
];

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    list: initialOrders,
  },
  reducers: {
    deleteOrder: (state, action) => {
      state.list = state.list.filter(order => order.id !== action.payload);
    },
  },
});

export const { deleteOrder } = ordersSlice.actions;

export default ordersSlice.reducer;