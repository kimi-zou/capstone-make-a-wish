import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { sendFriendRequest } from '../../store/friendship';
import './index.css';

const SearchResultUser = ({ user }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const friends = useSelector(state => state.friendship.friends);
  const pendingFriends = useSelector(state => state.friendship.pendingFriends);

  const createFriendRequest = () => {
    dispatch(sendFriendRequest(sessionUser.id, user.id))
      .then(res => console.log(res));
  };

  if (sessionUser.id === user.id) return null;

  return (
    <div key={user.id} className='user-search-result'>
      <Link
        className='user-search-result__user-link'
        to={`/${user.username}`}
      >
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
      </Link>
      <div
        className='user-search-result__add-button'
        onClick={createFriendRequest}
      >
        {friends.some(friend => friend.id === user.id)
          ? <i className='fas fa-user-friends' />
          : (pendingFriends.some(friend => friend.id === user.id)
              ? <div>Pending</div>
              : <i className='user-search-result__add-icon fas fa-plus-circle' />
            )}
      </div>

    </div>

  );
};

export default SearchResultUser;
