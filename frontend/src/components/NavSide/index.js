import React from 'react';
import { NavLink } from 'react-router-dom';

import './index.css';

const SideNav = () => {
  return (
    <div className='sidenav'>
      <NavLink exact to='/'>Logo</NavLink>
      <NavLink exact to='/dashboard'>Dashboard</NavLink>
      <NavLink exact to='/my-wishes'>My Wishes</NavLink>
      <NavLink exact to='/notifications'>Notifications</NavLink>
      <NavLink exact to='/settings'>Settings</NavLink>
    </div>
  );
};

export default SideNav;
