import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { getAllNotifications, updateNotification } from '../../store/notification';
import './index.css';

const NotificationAcceptFriend = ({ notification, diffDay, diffYear }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const { avatar, displayName, username } = notification.User;

  // Mark read
  const markRead = async () => {
    await dispatch(updateNotification(notification.id));
    await dispatch(getAllNotifications(sessionUser.id));
  };

  return (
    <div
      className='notification-friend__wrapper'
      onClick={markRead}
    >
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
      <div className='notification-friend-accept__user-info'>
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
          </span> has accepted you a friend request.
        </div>
        <div className='notification-friend__username'>@{username}</div>
      </div>
    </div>
  );
};

export default NotificationAcceptFriend;
