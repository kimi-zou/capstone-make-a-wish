import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Search from '../Search';
import './index.css';

const TopNav = () => {
  const user = useSelector(state => state.session.user);
  const notifications = useSelector(state => state.notification.notifications);

  return (
    <div className='topnav'>
      <div className='topnav--left'>
        <Search />
      </div>
      <div className='topnav--right'>
        <NavLink className='topnav__notification-wrapper' to='/notifications'>
          <i className='topnav__notification-icon fa-lg far fa-bell' />
          {
            notifications.length > 0 &&
            notifications.some(notification => notification.status === 0) &&
              <div className='topnav__notification-indicator-wrapper'>
                <div className='topnav__notification-indicator' />
              </div>
          }
        </NavLink>
        {user &&
          <NavLink
            className='topnav__username'
            to='/settings'
          >
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
