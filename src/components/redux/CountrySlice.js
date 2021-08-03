import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  countryInfo: {},
  allCountries: [],
  loading: false,
  caseType: "cases",
  mapCenter: [34.80746, -40.4796],
  mapZoom: 3,
  mapCountries: [],
};

export const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    setcountryInfo: (state, action) => {
      state.countryInfo = action.payload;
    },
    setallCountries: (state, action) => {
      state.allCountries = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setcaseType: (state, action) => {
      state.caseType = action.payload;
    },
    setMapCenter: (state, action) => {
      state.mapCenter = action.payload;
    },
    setMapZoom: (state, action) => {
      state.mapZoom = action.payload;
    },
    setMapCountries: (state, action) => {
      state.mapCountries = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setcountryInfo,
  setallCountries,
  setLoading,
  setcaseType,
  setMapCenter,
  setMapZoom,
  setMapCountries,
} = countrySlice.actions;

export default countrySlice.reducer;
