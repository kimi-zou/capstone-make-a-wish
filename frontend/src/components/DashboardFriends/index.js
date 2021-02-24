import React, { useContext } from 'react';

import { DashboardContext } from '../../context/dashboard';
import DashboardFriendsViewMonths from '../DashboardFriendsViewMonths';
import DashboardFriendsViewList from '../DashboardFriendsViewList';
import './index.css';

const DashboardFriends = () => {
  const { showMonths, setShowMonths } = useContext(DashboardContext);

  return (
    <div className='dashboard__friends-wrapper'>
      <div className='dashboard__friends-heading'>
        <div className='dashboard__friends-heading-text'>Friends</div>
        <div className='dashboard__friends-view-switch'>
          <button
            className={
              showMonths
                ? 'dashboard__view-buttons dashboard__view-butons--active'
                : 'dashboard__view-buttons'
            }
            onClick={() => setShowMonths(true)}
          >View by Months
          </button>
          <button
            className={
              showMonths
                ? 'dashboard__view-buttons'
                : 'dashboard__view-buttons dashboard__view-butons--active'
            }
            onClick={() => setShowMonths(false)}
          >View All
          </button>
        </div>
      </div>
      {
        showMonths
          ? <DashboardFriendsViewMonths />
          : <DashboardFriendsViewList />
      }
    </div>
  );
};

export default DashboardFriends;
