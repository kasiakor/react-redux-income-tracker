import React from "react";
import { useSelector } from "react-redux";

const AuthRoute = ({ children }) => {
  // get token from store
  const { userInfo } = useSelector((store) => store?.users?.userAuth);
  if (!userInfo?.token) {
    window.location.href = "/login";
    return null;
  }
  return <>{children}</>;
};

export default AuthRoute;
