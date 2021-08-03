import { configureStore } from "@reduxjs/toolkit";
import countrySlice from "./CountrySlice";

export const store = configureStore({
  reducer: {
    country: countrySlice,
  },
});
