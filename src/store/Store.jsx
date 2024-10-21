// import { configureStore } from "@reduxjs/toolkit";
// import productReducer from "./Product/Product";
// import categoryReducer from './Category/Category'


// const store = configureStore({
//   reducer: {
//     product: productReducer,
//     category: categoryReducer
//   }
// })

// export default store
// store.js
import { configureStore } from '@reduxjs/toolkit';
import { productApiSlice } from './Product/Product';
import { categoryApiSlice } from './Category/Category';
import SelectedItemsReducer from './SelectedItem/SelectedItem'

export const store = configureStore({
  reducer: {
    [productApiSlice.reducerPath]: productApiSlice.reducer,
    [categoryApiSlice.reducerPath]: categoryApiSlice.reducer,
    items: SelectedItemsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApiSlice.middleware, categoryApiSlice.middleware), 
});
