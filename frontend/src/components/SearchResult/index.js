import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import SearchResultUser from '../SearchResultUser';
import './index.css';

const SearchResult = () => {
  const sessionUser = useSelector(state => state.session.user);
  const users = useSelector(state => state.search.users);
  const friends = useSelector(state => state.friendship.friends);
  const pendingFriends = useSelector(state => state.friendship.pendingFriends);
  const [loaded, setLoaded] = useState(false);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [regularUsers, setRegularUsers] = useState([]);
  const [friendUsers, setFriendUsers] = useState([]);

  // Filter search results
  useEffect(() => {
    if (!users) return;
    setLoaded(true);
    setPendingUsers(pendingFriends.filter((user) => {
      return users.some(friend => friend.id === user.id);
    }));
    setFriendUsers(friends.filter((user) => {
      return users.some(friend => friend.id === user.id);
    }));
    setRegularUsers(users.filter((user) => {
      return (!friends.some(friend => friend.id === user.id) &&
    !pendingFriends.some(friend => friend.id === user.id) &&
    user.id !== sessionUser.id);
    }));
    return () => {
      setPendingUsers([]);
      setRegularUsers([]);
      setFriendUsers([]);
    };
  }, [users, friends, pendingFriends, sessionUser]);

  if (!loaded) return null;

  return (
    <div className='search-result'>
      {
        users.length === 0
          ? <div>No users found.</div>
          : (
            <div className='search-result__group-wrapper'>
              {pendingUsers.length > 0 &&
                <div className='search-result__pending-group'>
                  <div className='search-result__pending-group-heading'>Friend requests</div>
                  {pendingUsers.map((user) => {
                    return <SearchResultUser user={user} key={user.id} group='pending' />;
                  })}
                </div>}
              {regularUsers.length > 0 &&
                <div className='search-result__regular-group'>
                  {regularUsers.map((user) => {
                    return <SearchResultUser user={user} key={user.id} group='regular' />;
                  })}
                </div>}
              {friendUsers.length > 0 &&
                <div className='search-result__friend-group'>
                  {friendUsers.map((user) => {
                    return <SearchResultUser user={user} key={user.id} group='friend' />;
                  })}
                </div>}
            </div>
            )
        }
    </div>
  );
};

export default SearchResult;
