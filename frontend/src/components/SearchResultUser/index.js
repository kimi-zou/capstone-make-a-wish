import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  sendFriendRequest,
  getFriends,
  getSentPendingFriends,
  getReceivedPendingFriends,
  // getPendingFriends,
  getSingleFriendship,
  acceptFriendship
} from '../../store/friendship';
import './index.css';

const SearchResultUser = ({ user, group }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [friendship, setFriendship] = useState('');

  // Lookup friendship
  useEffect(() => {
    const userOneId = (sessionUser.id < user.id) ? sessionUser.id : user.id;
    const userTwoId = (sessionUser.id > user.id) ? sessionUser.id : user.id;
    dispatch(getSingleFriendship(userOneId, userTwoId))
      .then(res => setFriendship(res.data.relationship));
    return () => setFriendship('');
  }, [dispatch, sessionUser, user]);

  // Send friend request
  const createFriendRequest = async () => {
    await dispatch(sendFriendRequest(sessionUser.id, user.id));
    await dispatch(getSentPendingFriends(sessionUser.id));
    await dispatch(getReceivedPendingFriends(sessionUser.id));
  };

  // Accept friend request
  const acceptFriendRequest = async () => {
    await dispatch(acceptFriendship(friendship.id, sessionUser.id, 1));
    await dispatch(getSentPendingFriends(sessionUser.id));
    await dispatch(getFriends(sessionUser.id));
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
      <div className='user-search-result__button-wrapper'>
        {group === 'pending' &&
          <div className='user-search-result__pending'>
            {(friendship && friendship.actionUserId === sessionUser.id)
              ? <button className='user-search-result__pending-buttons'>Cancel</button>
              : (
                <>
                  <button
                    className='user-search-result__pending-buttons'
                    onClick={acceptFriendRequest}
                  >Accept
                  </button>
                  <button
                    className='user-search-result__pending-buttons'
                  >Ignore
                  </button>
                </>)}
          </div>}
        {group === 'regular' &&
          <i
            className='user-search-result__add-icon fas fa-user-plus'
            onClick={createFriendRequest}
          />}
        {group === 'friend' && <i className='fas fa-user-friends' />}
      </div>
    </div>
  );
};

export default SearchResultUser;
