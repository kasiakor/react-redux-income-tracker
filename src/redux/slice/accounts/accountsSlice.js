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

// action creator - create account
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

// action creator - update account
export const updateAccountAction = createAsyncThunk(
  "accounts/updateAccount",
  async (
    { name, accountType, initialBalance, notes, id },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(
        `${baseUrl}/accounts/${id}`,
        { name, accountType, initialBalance, notes },
        config
      );
      return response.data;
    } catch (error) {
      rejectWithValue(error?.response?.data);
    }
  }
);

// action creator - get single account
export const getSingleAccountAction = createAsyncThunk(
  "accounts/getAccount",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${baseUrl}/accounts/${id}`, config);
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
    // create account
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
    // update account
    builder.addCase(updateAccountAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateAccountAction.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.isUpdated = true;
      state.account = action.payload;
    });
    builder.addCase(updateAccountAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.account = null;
      state.isUpdated = false;
      state.error = action.payload;
    });

    // get single account
    builder.addCase(getSingleAccountAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSingleAccountAction.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.account = action.payload;
    });
    builder.addCase(getSingleAccountAction.rejected, (state, action) => {
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
