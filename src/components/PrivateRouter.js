import React from "react";
import { Route, Redirect } from "react-router-dom";
import Login from "../pages/login/Login";
export default function PrivateRouter(props) {
  return localStorage.getItem("M3akAdminToken") ? (
    <Route {...props} />
  ) : (
    <Redirect to="/" />
  );
}
