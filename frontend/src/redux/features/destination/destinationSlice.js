import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import destinationService from "./destinationService";
import { toast } from "react-toastify";

const initialState = {
  destination: null,
  destinations: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create New Product
export const createDestination = createAsyncThunk(
  "destinations/create",
  async (formData, thunkAPI) => {
    try {
      return await destinationService.createDestination(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all products
export const getDestinations = createAsyncThunk(
  "destination/getAll",
  async (_, thunkAPI) => {
    try {
      return await destinationService.getDestinations();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const destinationSlice = createSlice({
  name: "destination",
  initialState,
  reducers: {
    CALC_STORE_VALUE(state, action) {
      console.log("store value");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDestination.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDestination.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.destinations.push(action.payload);
        toast.success("Destination added successfully");
      })
      .addCase(createDestination.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getDestinations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDestinations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.destinations = action.payload;
      })
      .addCase(getDestinations.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { CALC_STORE_VALUE } = destinationSlice.actions;

export const selectIsLoading = (state) => state.destination.isLoading;

export default destinationSlice.reducer;