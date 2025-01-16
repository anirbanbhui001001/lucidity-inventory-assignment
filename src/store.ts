import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productReducer"; // Import your product reducer

// Create the Redux store
const store = configureStore({
  reducer: {
    product: productReducer, // Add more reducers here if needed
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
