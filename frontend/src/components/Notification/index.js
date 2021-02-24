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
      <div className='notification__inner-wrapper'>
        <div className='notification__heading'>Notifications</div>
        {
          notifications.length > 0
            ? notifications.map((notification) => {
                if (notification.NotificationObject.entityTypeId === 1) {
                  return (
                    <NotificationFriendRequest
                      key={notification.id}
                      notification={notification}
                    />
                  );
                }
              })
            : (
              <div className='notification__no-notification-message'>
                You don't have any notifications.
              </div>
              )
        }
      </div>
    </div>
  );
};

export default Notification;
