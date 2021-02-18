import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllNotifications } from '../../store/notification';
import { getFriends } from '../../store/friendship';
import { DashboardContext } from '../../context/dashboard';
import DashboardRecentBirthdays from '../DashboardRecentBirthdays';
import DashboardPendingNotifications from '../DashboardPendingNotifications';
import DashboardSessionUser from '../DashboardSessionUser';
import DashboardFriends from '../DashboardFriends';
import './index.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const { setFriends } = useContext(DashboardContext);

  useEffect(() => {
    dispatch(getFriends(sessionUser.id))
      .then(res => setFriends(res.data.users));
    dispatch(getAllNotifications(sessionUser.id));
  }, [dispatch, sessionUser, setFriends]);

  return (
    <div className='dashboard__wrapper'>
      <div className='dashboard__left-wrapper'>
        <DashboardSessionUser />
        <DashboardRecentBirthdays />
        <DashboardFriends />
      </div>
      <div className='dashboard__right-wrapper'>
        <div className='dashboard__pending-notifications'>
          <DashboardPendingNotifications type='outgoing' />
          <DashboardPendingNotifications type='pending' />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
