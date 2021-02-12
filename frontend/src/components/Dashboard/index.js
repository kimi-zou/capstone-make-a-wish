import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getFriends, getPendingFriends } from '../../store/friendship';
import './index.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [friends, setFriends] = useState([]);
  const [pendingFriends, setPendingFriends] = useState([]);

  useEffect(() => {
    dispatch(getFriends(sessionUser.id))
      .then(res => setFriends(res.data.users));
    dispatch(getPendingFriends(sessionUser.id))
      .then(res => setPendingFriends(res.data.users));
  }, [dispatch, sessionUser]);

  return (
    <div className='dashboard'>
      <div>This is dashboard.</div>
      {friends.length > 0 && friends.map(friend => {
        return (<div key={friend.id}>{friend.displayName}</div>);
      })}
    </div>
  );
};

export default Dashboard;
