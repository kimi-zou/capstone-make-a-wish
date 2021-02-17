import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import SearchResultUser from '../SearchResultUser';
import './index.css';

const SearchResult = () => {
  const sessionUser = useSelector(state => state.session.user);
  const users = useSelector(state => state.search.users);
  const friends = useSelector(state => state.friendship.friends);
  const sentPendingFriends = useSelector(state => state.friendship.sentPendingFriends);
  const receivedPendingFriends = useSelector(state => state.friendship.receivedPendingFriends);
  const [loaded, setLoaded] = useState(false);
  const [sentPendingUsers, setSentPendingUsers] = useState([]);
  const [receivedPendingUsers, setReceivedPendingUsers] = useState([]);
  const [regularUsers, setRegularUsers] = useState([]);
  const [friendUsers, setFriendUsers] = useState([]);

  // Group search results; Set loaded
  useEffect(() => {
    if (!users) return;
    setLoaded(true);

    const matchGroup = (group, user) => {
      return group.some(searchUser => searchUser.id === user.id);
    };

    setSentPendingUsers(sentPendingFriends.filter((user) => {
      return matchGroup(users, user);
    }));
    setReceivedPendingUsers(receivedPendingFriends.filter((user) => {
      return matchGroup(users, user);
    }));
    setFriendUsers(friends.filter((user) => {
      return matchGroup(users, user);
    }));
    setRegularUsers(users.filter((user) => {
      return (
        !matchGroup(friends, user) &&
        !matchGroup(sentPendingFriends, user) &&
        !matchGroup(receivedPendingFriends, user) &&
        user.id !== sessionUser.id
      );
    }));
    return () => {
      setSentPendingUsers([]);
      setReceivedPendingUsers([]);
      setRegularUsers([]);
      setFriendUsers([]);
    };
  }, [users, friends, sessionUser, sentPendingFriends, receivedPendingFriends]);

  if (!loaded) return null;

  return (
    <div className='search-result'>
      {
        users.length === 0
          ? <div className='search-result__not-found'>No users found.</div>
          : (
            <div className='search-result__group-wrapper'>
              <div className='search-result__pending-group'>
                <div className='search-result__pending-group-heading'>Friend requests</div>
                {receivedPendingUsers.map((user) => {
                  return <SearchResultUser key={user.id} user={user} group='pending-received' />;
                })}
                {sentPendingUsers.map((user) => {
                  return <SearchResultUser key={user.id} user={user} group='pending-sent' />;
                })}
              </div>
              {regularUsers.length > 0 &&
                <div className='search-result__regular-group'>
                  {regularUsers.map((user) => {
                    return <SearchResultUser key={user.id} user={user} group='regular' />;
                  })}
                </div>}
              {friendUsers.length > 0 &&
                <div className='search-result__friend-group'>
                  {friendUsers.map((user) => {
                    return <SearchResultUser key={user.id} user={user} group='friend' />;
                  })}
                </div>}
            </div>
            )
        }
    </div>
  );
};

export default SearchResult;
