import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredDestinations: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_DESTINATIONS(state, action) {
      const { destinations, search } = action.payload;
      const tempDestinations = destinations.filter(
        (destination) =>
          destination.name.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredDestinations = tempDestinations;
    },
  },
});

export const { FILTER_DESTINATIONS } = filterSlice.actions;

export const selectFilteredDestinations = (state) => state.filter.filteredDestinations;

export default filterSlice.reducer;