import React from 'react';
import { NavLink } from 'react-router-dom';

import './index.css';

const HomeNav = () => {
  return (
    <div className='homenav'>
      <div className='homenav--left'>
        <NavLink className='homenav__links' exact to='/'>Logo</NavLink>
      </div>
      <div className='homenav--right'>
        <NavLink className='homenav__links' exact to='/about'>About</NavLink>
        <NavLink className='homenav__links' exact to='/'>Join</NavLink>
      </div>
    </div>
  );
};

export default HomeNav;
