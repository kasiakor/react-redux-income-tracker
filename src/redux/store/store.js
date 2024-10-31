import { configureStore } from "@reduxjs/toolkit";
import accountsReducer from "../slice/accounts/accountsSlice";
import transactionsReducer from "../slice/transactions/transactionsSlice";
import usersReducer from "../slice/users/usersSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    accounts: accountsReducer,
    transactions: transactionsReducer,
  },
});

export default store;
