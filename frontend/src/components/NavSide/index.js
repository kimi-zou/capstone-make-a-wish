import React from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logout } from '../../store/session';
import './index.css';

const SideNav = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(logout());
    history.push('/');
  };

  return (
    <div className='sidenav'>
      <NavLink
        className='sidenav__logo'
        exact to='/'
      >MakeAwish
      </NavLink>

      <NavLink
        activeClassName='sidenav__links--active'
        className='sidenav__links'
        exact to='/dashboard'
      >
        <i className='sidenav__icons fas fa-home' />
        Dashboard
      </NavLink>

      <NavLink
        activeClassName='sidenav__links--active'
        className='sidenav__links'
        exact to='/my-wishes'
      >
        <i className='sidenav__icons fas fa-gift' />
        My Wishes
      </NavLink>

      <NavLink
        activeClassName='sidenav__links--active'
        className='sidenav__links'
        exact to='/notifications'
      >
        <i className='sidenav__icons fas fa-bell' />
        Notifications
      </NavLink>

      <NavLink
        activeClassName='sidenav__links--active'
        className='sidenav__links'
        exact to='/settings'
      >
        <i className='sidenav__icons fas fa-cog' />
        Settings
      </NavLink>

      <button
        className='sidenav__logout'
        onClick={handleLogout}
      >
        <i className='sidenav__logout-icon fas fa-sign-out-alt fa-lg' />
        Log Out
      </button>
    </div>
  );
};

export default SideNav;
