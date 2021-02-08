import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { logout } from '../../store/session';
import './index.css';

import Search from './Search';

const TopNav = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user);

  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(logout());
    history.push('/');
  };

  return (
    <div className='topnav'>
      <div className='topnav--left'>
        <Search />
      </div>
      <div className='topnav--right'>
        <i className='far fa-bell' />
        {user && <div>{user.displayName}</div>}
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
};

export default TopNav;
