import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getFriends } from '../../store/friendship';
import { DashboardContext } from '../../context/dashboard';
import DashboardRecentBirthdays from '../DashboardRecentBirthdays';
import DashboardViewMonths from '../DashboardViewMonths';
import DashboardViewList from '../DashboardViewList';
import DashboardPendingFriends from '../DashboardPendingFriends';
import DashboardSessionUser from '../DashboardSessionUser';
import './index.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const { showMonths, setShowMonths, setFriends } = useContext(DashboardContext);

  useEffect(() => {
    dispatch(getFriends(sessionUser.id))
      .then(res => setFriends(res.data.users));
  }, [dispatch, sessionUser, setFriends]);

  return (
    <div className='dashboard__wrapper'>
      <div className='dashboard__left-wrapper'>
        <DashboardSessionUser />
        <DashboardRecentBirthdays />
        <div className='dashboard__friends-wrapper'>
          <div className='dashboard__friends-view-switch'>
            <button onClick={() => setShowMonths(true)}>View by Months</button>
            <button onClick={() => setShowMonths(false)}>View All</button>
          </div>
          {
            showMonths
              ? <DashboardViewMonths />
              : <DashboardViewList />
          }
        </div>
      </div>
      <div className='dashboard__right-wrapper'>
        <DashboardPendingFriends />
      </div>
    </div>
  );
};

export default Dashboard;
