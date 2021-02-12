import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Search from '../Search';
import './index.css';

const TopNav = () => {
  const user = useSelector(state => state.session.user);

  return (
    <div className='topnav'>
      <div className='topnav--left'>
        <Search />
      </div>
      <div className='topnav--right'>
        <NavLink to='/notifications'>
          <i className='topnav__notification far fa-bell' />
        </NavLink>
        {user &&
          <NavLink
            to='/settings'
            className='topnav__username'
          >
            {user.displayName}
            <img
              className='topnav__user-avatar'
              src={user.avatar}
              alt='user avatar'
            />
          </NavLink>}
      </div>
    </div>
  );
};

export default TopNav;
