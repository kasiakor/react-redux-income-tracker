import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";

// initial state
const initialState = {
  loading: false,
  error: null,
  transactions: [],
  transaction: {},
  // optional - we could get it from the api
  isAdded: false,
  isUpdated: false,
};

// create action - create new transaction
export const createTransactionsAction = createAsyncThunk(
  "transactions/create",
  async (payload, { rejectWithValue, dispatch, getState }) => {
    const { name, transactionType, amount, category, notes } = payload;
    try {
      // get token from store
      const token = getState()?.users?.userAuth?.userInfo?.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        `${baseUrl}/transactions`,
        {
          name,
          transactionType,
          amount,
          category,
          notes,
          account: payload.id,
        },
        config
      );
      return response.data;
    } catch (error) {
      rejectWithValue(error?.response?.data?.message);
    }
  }
);

// create transactions slice
const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createTransactionsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createTransactionsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isAdded = true;
      state.transaction = action.payload;
    });
    builder.addCase(createTransactionsAction.rejected, (state, action) => {
      state.loading = false;
      state.transaction = {};
      state.isAdded = false;
      state.error = action.payload;
    });
  },
});

// create transactions reducer

const transactionsReducer = transactionsSlice.reducer;

export default transactionsReducer;
