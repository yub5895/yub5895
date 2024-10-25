import { configureStore } from "@reduxjs/toolkit";
import hotSlice from "./hotSlice";

const store = configureStore({
  reducer: {
    hotPost: hotSlice.reducer,
  },
});

export default store;
