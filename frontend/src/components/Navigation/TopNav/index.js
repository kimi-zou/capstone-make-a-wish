import React from 'react';
import { NavLink } from 'react-router-dom';

import './index.css';


const TopNav = () => {
  return (
    <div className="topnav">
      <div className="topnav--left">
        <NavLink className="topnav__links" exact to="/">Logo</NavLink>
      </div>
      <div className="topnav--right">
        <NavLink className="topnav__links" exact to="/about">About</NavLink>
        <NavLink className="topnav__links" exact to="/">Join</NavLink>
      </div>
    </div>
  );
}

export default TopNav;