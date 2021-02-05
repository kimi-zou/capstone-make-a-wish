import React from "react";
import { useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";

import { logout } from "../../store/session";

const Dashboard = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/");
  };

  return (
    <button onClick={handleLogout}>Log Out</button>
  )
}

export default Dashboard;