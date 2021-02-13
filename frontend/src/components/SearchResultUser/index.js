import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  sendFriendRequest, getPendingFriends, getFriendship
} from '../../store/friendship';
import FriendshipAcceptButton from '../FriendshipAcceptButton';
import FriendshipIgnoreButton from '../FriendshipIgnoreButton';
import FriendshipCancelButton from '../FriendshipCancelButton';
import './index.css';

const SearchResultUser = ({ user, group }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  // Lookup friendship
  const friendshipLookup = async () => {
    const res = await dispatch(getFriendship(sessionUser.id, user.id));
    return res.data.relationship;
  };

  // Send friend request
  const createFriendRequest = async () => {
    await dispatch(sendFriendRequest(sessionUser.id, user.id));
    await dispatch(getPendingFriends(sessionUser.id));
  };

  if (sessionUser.id === user.id) return null;

  return (
    <div className='user-search-result'>
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
          <div className='user-search-result__display-name'>{user.displayName}</div>
          <div className='user-search-result__username'>@{user.username}</div>
        </div>
      </Link>
      <div className='user-search-result__button-wrapper'>
        {
          group === 'pending-received' &&
            <div className='user-search-result__pending-received'>
              <FriendshipAcceptButton friendshipLookup={friendshipLookup} />
              <FriendshipIgnoreButton friendshipLookup={friendshipLookup} />
            </div>
        }
        {
          group === 'pending-sent' &&
            <div className='user-search-result__pending-sent'>
              <FriendshipCancelButton friendshipLookup={friendshipLookup} />
            </div>
        }
        {
          group === 'regular' &&
            <i
              className='user-search-result__add-icon fas fa-user-plus'
              onClick={createFriendRequest}
            />
        }
        {
          group === 'friend' &&
            <i className='fas fa-user-friends' />
        }
      </div>
    </div>
  );
};

export default SearchResultUser;
