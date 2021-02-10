import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const SearchResultUser = ({ user }) => {
  return (
    <Link
      to={`/${user.username}`}
    >
      <li key={user.id} className='user-search-result'>

        <img
          className='user-search-result__avatar'
          src={user.avatar}
          alt='search-pic'
        />

        <div className='user-search-result__text'>

          <div className='user-search-result__display-name'>
            {user.displayName}
          </div>

          <div className='user-search-result__username'>
            @{user.username}
          </div>

        </div>
      </li>
    </Link>
  );
};

export default SearchResultUser;
