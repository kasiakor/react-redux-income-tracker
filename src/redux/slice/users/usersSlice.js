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
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

// action creator - register
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

export const loginUserAction = createAsyncThunk(
  "user/login",
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
        `${baseUrl}/users/login`,
        {
          email: payload.email,
          password: payload.password,
        },
        config
      );
      // save user info in local storage
      localStorage.setItem("userInfo", JSON.stringify(response.data));

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// logout action creator

export const logoutUserAction = createAsyncThunk("user/logout", () => {
  localStorage.removeItem("userInfo");
  return null;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    // register
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
    // login
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userAuth.userInfo = action.payload;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.loading = false;
      state.userAuth.error = action.payload;
    });
    // remove token from local storage
    builder.addCase(logoutUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userAuth.userInfo = null;
    });
  },
});

const usersReducer = usersSlice.reducer;

export default usersReducer;
