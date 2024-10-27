import { configureStore } from "@reduxjs/toolkit";
import accountsReducer from "../slice/accounts/accountsSlice";
import usersReducer from "../slice/users/usersSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    accounts: accountsReducer,
  },
});

export default store;
