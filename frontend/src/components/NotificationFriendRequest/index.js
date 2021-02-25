import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { getFriendshipById, updateFriendship } from '../../store/friendship';
import { getAllNotifications, updateNotification } from '../../store/notification';
import './index.css';

const NotificationFriendRequest = ({ notification, diffDay, diffYear }) => {
  const dispatch = useDispatch();
  const { avatar, displayName, username } = notification.User;
  const { entityId } = notification.NotificationObject;
  const sessionUser = useSelector(state => state.session.user);
  const notifications = useSelector(state => state.notification.notifications);
  const [friendship, setFriendship] = useState();

  // Get friendship
  useEffect(() => {
    dispatch(getFriendshipById(entityId))
      .then(res => setFriendship(res.data.relationship));
  }, [dispatch, entityId, notifications]);

  // Accept friend
  const acceptFriend = async () => {
    await dispatch(updateFriendship(friendship.id, sessionUser.id, 1));
    await dispatch(updateNotification(notification.id));
    await dispatch(getAllNotifications(sessionUser.id));
  };

  // Ignore friend
  const ignoreFriend = async () => {
    await dispatch(updateFriendship(friendship.id, sessionUser.id, 2));
    await dispatch(updateNotification(notification.id));
    await dispatch(getAllNotifications(sessionUser.id));
  };

  return (
    <div className='notification-friend__wrapper'>
      <div className='notification-friend__indicator'>
        {notification.status === 0
          ? <div className='notification__unread' />
          : <div className='notification__read' />}
      </div>
      <div className='notification-friend__avatar-wrapper'>
        <img
          className='notification-friend__avatar'
          src={avatar}
          alt='user avatar'
        />
      </div>
      <div className='notification-friend__user-info'>
        <div className='notification-friend__date'>
          {diffDay(notification)
            ? moment(notification.createdAt).format('hh:mm A')
            : (diffYear(notification)
                ? moment(notification.createdAt).format('MMM Do')
                : moment(notification.createdAt).format('MMM Do, YYYY'))}
        </div>
        <div className='notification-friend__message'>
          <span className='notification-friend__display-name'>
            {displayName}
          </span> has sent you a friend request.
        </div>
        <div className='notification-friend__username'>@{username}</div>
      </div>
      {
        friendship &&
        friendship.status === 0 &&
          <div className='notification-friend__button-wrapper'>
            <button
              className='notification-friends__buttons notification-friends__accept'
              onClick={acceptFriend}
            >
              Accept
            </button>
            <button
              className='notification-friends__buttons notification-friends__ignore'
              onClick={ignoreFriend}
            >
              Ignore
            </button>
          </div>
      }
      {
        friendship &&
        friendship.status === 1 &&
          <div className='notification-friend__button-wrapper'>
            <div className='notification-friend__accepted'>Accepted</div>
          </div>
      }
      {
        friendship &&
        friendship.status === 2 &&
          <div className='notification-friend__button-wrapper'>
            <div className='notification-friend__ignored'>Ignored</div>
          </div>
      }
    </div>
  );
};

export default NotificationFriendRequest;
