import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const token = cookies.get("TOKEN");

  return token ? <Element {...rest} /> : <Navigate to="/" />;
};

export default ProtectedRoute;
