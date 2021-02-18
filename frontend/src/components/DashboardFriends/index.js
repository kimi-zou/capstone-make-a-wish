import React, { useContext, useEffect, useState } from 'react';

import { DashboardContext } from '../../context/dashboard';
import DashboardViewMonths from '../DashboardViewMonths';
import DashboardViewList from '../DashboardViewList';
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
          ? <DashboardViewMonths />
          : <DashboardViewList />
      }
    </div>
  );
};

export default DashboardFriends;
