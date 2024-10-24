import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProfileAction } from "../../redux/slice/users/usersSlice";
import AccountList from "./AccountList";
import AccountSummary from "./AccountSummary";

const MainDashBoard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileAction());
  }, [dispatch]);

  return (
    <>
      <AccountSummary />
      <AccountList />
    </>
  );
};

export default MainDashBoard;
