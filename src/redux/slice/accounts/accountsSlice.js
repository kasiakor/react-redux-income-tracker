import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";

// initial state
const initialState = {
  account: null,
  accounts: [],
  error: null,
  loading: false,
  success: false,
  isUpdated: false,
};

// action creator
export const createAccountAction = createAsyncThunk(
  "accounts/createAccount",
  async (
    { name, accountType, initialBalance, notes },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `${baseUrl}/accounts`,
        { name, accountType, initialBalance, notes },
        config
      );
      return response.data;
    } catch (error) {
      rejectWithValue(error?.response?.data);
    }
  }
);

// create slice
const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createAccountAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createAccountAction.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.account = action.payload;
    });
    builder.addCase(createAccountAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.account = null;
      state.error = action.payload;
    });
  },
});

// generate reducer
const accountsReducer = accountsSlice.reducer;

export default accountsReducer;
