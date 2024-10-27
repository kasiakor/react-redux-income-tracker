import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileAction } from "../../redux/slice/users/usersSlice";
import AccountList from "./AccountList";
import AccountSummary from "./AccountSummary";

const MainDashBoard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileAction());
  }, [dispatch]);

  const { loading, error, profile } = useSelector((state) => {
    return state?.users;
  });

  // loading and error

  return (
    <>
      {loading ? (
        <h2 className="text-center text-lg text-green-600 mt-5">Loading...</h2>
      ) : error ? (
        <h2 className="text-center text-lg text-red-600 mt-5">{error}</h2>
      ) : (
        <>
          <AccountSummary profile={profile} />
          <AccountList profile={profile} />
        </>
      )}
    </>
  );
};

export default MainDashBoard;
