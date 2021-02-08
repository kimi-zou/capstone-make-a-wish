import React, { useEffect, useState } from 'react';

const SearchResultUser = ({ user }) => {
  return (
    <Link
      to={`/${user.username}`}
    >
      <li key={user.id} className='user-search-result'>
        {user.UserPreference && (
          <img
            className='user-search-result-img'
            src={user.UserPreference.profilePicUrl}
            alt='search-pic'
          />
        )}
        <div className='user-search-result-text'>
          <div className='user-search-result-text-name'>
            {user.displayName}
          </div>
          <div className='user-search-result-text-username'>
            @{user.username}
          </div>
        </div>
      </li>
    </Link>
  );
};

export default SearchResultUser;
