import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllNotifications } from '../../store/notification';
import NotificationFriendRequest from '../NotificationFriendRequest';
import './index.css';

const Notification = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const notifications = useSelector(state => state.notification.notifications);

  useEffect(() => {
    if (!sessionUser) return;
    dispatch(getAllNotifications(sessionUser.id));
  }, [dispatch, sessionUser]);

  return (
    <div className='notification__wrapper'>
      {notifications.length > 0 && notifications.map((notification) => {
        if (notification.NotificationObject.entityTypeId === 1) {
          return (
            <NotificationFriendRequest
              key={notification.id}
              notification={notification}
            />
          );
        }
      })}
    </div>
  );
};

export default Notification;
