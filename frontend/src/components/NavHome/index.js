import React from 'react';
import { NavLink } from 'react-router-dom';

import './index.css';

const HomeNav = () => {
  return (
    <div className='homenav'>
      <div className='homenav--left'>
        <NavLink
          className='homenav__links homenav__logo'
          exact to='/'
        >MakeAwish
        </NavLink>
      </div>
      <div className='homenav--right'>
        <NavLink
          className='homenav__links'
          activeClassName='homenav__links--active'
          exact to='/about'
        >About
        </NavLink>
        <NavLink
          className='homenav__links'
          activeClassName='homenav__links--active'
          exact to='/'
        >Join
        </NavLink>
      </div>
    </div>
  );
};

export default HomeNav;
