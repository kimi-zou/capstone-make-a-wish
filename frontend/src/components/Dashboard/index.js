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
import DashboardFriend from '../DashboardFriend';
import DashboardInfoBoxGift from '../DashboardInfoBoxGift';
import DashboardInfoBoxMonth from '../DashboardInfoBoxMonth';
import DashboardTodo from '../DashboardTodo';
import './index.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const {
    setFriends,
    getFriendsByMonth,
    showFriend,
    show,
    getAllTodos
  } = useContext(DashboardContext);

  // Get friends, notifications, todos
  useEffect(() => {
    dispatch(getFriends(sessionUser.id))
      .then(res => {
        setFriends(res.data.users);
        getFriendsByMonth(moment(new Date()).get('month'), res.data.users);
      });
    dispatch(getAllNotifications(sessionUser.id));
    getAllTodos(sessionUser.id);
  }, [dispatch]);

  return (
    <div className='dashboard__wrapper'>
      <div className='dashboard__left-wrapper'>
        {
          showFriend
            ? <DashboardFriend />
            : <>
              <DashboardSessionUser />
              <DashboardRecentBirthdays />
              <DashboardFriends />
              <DashboardTodo />
            </>
        }
      </div>
      <div className='dashboard__right-wrapper'>
        <img
          className='dashboard-into-box__background'
          src='https://makeawish.s3.amazonaws.com/seed-data/dashboard-info-box-cut-out.png'
          alt='info background'
        />
        {
          show === 'month'
            ? (<>
              <div className='dashboard__pending-notifications'>
                <DashboardPendingNotifications type='outgoing' />
                <DashboardPendingNotifications type='pending' />
              </div>
              <DashboardInfoBoxMonth />
               </>)
            : <DashboardInfoBoxGift />
        }

      </div>
    </div>
  );
};

export default Dashboard;
