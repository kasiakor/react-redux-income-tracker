import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";

// initial state
const initialState = {
  loading: false,
  error: null,
  users: [],
  user: {},
  profile: {},
  userAuth: {
    loading: false,
    error: null,
    userInfo: {},
  },
};

// action creator
export const registerUserAction = createAsyncThunk(
  "user/register",
  async (payload, { dispatch, getState, rejectWithValue }) => {
    try {
      // config
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      // post request
      const response = await axios.post(
        `${baseUrl}/users/register`,
        {
          fullname: payload.fullname,
          email: payload.email,
          password: payload.password,
        },
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userAuth.userInfo = action.payload;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.loading = false;
      state.userAuth.error = action.payload;
    });
  },
});

const usersReducer = usersSlice.reducer;

export default usersReducer;
