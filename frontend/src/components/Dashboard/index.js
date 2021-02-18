import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { getAllNotifications } from '../../store/notification';
import { getFriends } from '../../store/friendship';
import { DashboardContext } from '../../context/dashboard';
import DashboardRecentBirthdays from '../DashboardRecentBirthdays';
import DashboardPendingNotifications from '../DashboardPendingNotifications';
import DashboardSessionUser from '../DashboardSessionUser';
import DashboardFriends from '../DashboardFriends';
import DashboardInfoBox from '../DashboardInfoBox';
import './index.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const { setFriends, getFriendsByMonth } = useContext(DashboardContext);

  useEffect(() => {
    dispatch(getFriends(sessionUser.id))
      .then(res => {
        setFriends(res.data.users);
        getFriendsByMonth(moment(new Date()).get('month'), res.data.users);
      });
    dispatch(getAllNotifications(sessionUser.id));
  }, [dispatch]);

  return (
    <div className='dashboard__wrapper'>
      <div className='dashboard__left-wrapper'>
        <DashboardSessionUser />
        <DashboardRecentBirthdays />
        <DashboardFriends />
      </div>
      <div className='dashboard__right-wrapper'>
        <img
          className='dashboard-into-box__background'
          src='https://makeawish.s3.amazonaws.com/seed-data/dashboard-info-box-cut-out.png'
          alt='info background'
        />
        <div className='dashboard__pending-notifications'>
          <DashboardPendingNotifications type='outgoing' />
          <DashboardPendingNotifications type='pending' />
        </div>
        <DashboardInfoBox />
      </div>
    </div>
  );
};

export default Dashboard;
