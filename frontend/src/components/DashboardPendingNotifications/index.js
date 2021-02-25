import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useOutsideClick from '../../services/useOutsideClick';
import SearchResultUser from '../SearchResultUser';
import './index.css';

const DashboardPendingNotifications = ({ type }) => {
  const ref = useRef();
  const history = useHistory();
  const sentPendingFriends = useSelector(state => state.friendship.sentPendingFriends);
  const notifications = useSelector(state => state.notification.notifications);
  const [showMenu, setShowMenu] = useState(false);
  const [number, setNumber] = useState(0);

  // Open menu
  const handleClick = () => {
    if (type === 'outgoing' && number > 0) {
      setShowMenu(true);
    } else if (type === 'pending') {
      history.push('/notifications');
    }
  };

  // Close menu
  useOutsideClick(ref, () => {
    setShowMenu(false);
  });

  // Get message count
  useEffect(() => {
    if (type === 'outgoing') {
      setNumber(sentPendingFriends.length);
    } else if (type === 'pending') {
      const unread = notifications.filter(notification => {
        return notification.status === 0;
      });
      setNumber(unread.length);
    }
  }, [type, sentPendingFriends, notifications]);

  // Render outgoing message
  const OutgoingMessage = (number) => {
    if (number === 1) {
      return (
        <div className='dashboard-pending-notifications__text'>
          sent friend request
        </div>
      );
    } else {
      return (
        <div className='dashboard-pending-notifications__text'>
          sent friend requests
        </div>
      );
    }
  };

  // Render pending notification message
  const NotificationMessage = (number) => {
    if (number === 1) {
      return (
        <div className='dashboard-pending-notifications__text'>
          unread notification
        </div>
      );
    } else {
      return (
        <div className='dashboard-pending-notifications__text'>
          unread notifications
        </div>
      );
    }
  };

  return (
    <div className='dashboard-pending-notifications__wrapper' ref={ref}>
      <div
        className='dashboard-pending-notifications__number'
        onClick={handleClick}
      >{number}
      </div>
      {
        type === 'outgoing' &&
        OutgoingMessage(number)
      }
      {
        type === 'pending' &&
        NotificationMessage(number)
      }
      {
      showMenu &&
        (
          <div className='dashboard-pending-notifications__sent-result'>
            {sentPendingFriends.map(user =>
              <SearchResultUser key={user.id} user={user} group='pending-sent' />)}
          </div>
        )
      }
    </div>
  );
};

export default DashboardPendingNotifications;
