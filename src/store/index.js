import {configureStore} from '@reduxjs/toolkit';
import productsReducer from './productsStore.js';
import ordersReducer from './orderStore.js';

const store = configureStore({
  reducer: {
    products: productsReducer,
    orders: ordersReducer,
  },
});

export default store;