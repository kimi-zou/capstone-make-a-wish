import { useContext } from 'react';
import moment from 'moment';
import { DashboardContext } from '../../context/dashboard';
import DashboardFriendWishes from '../DashboardFriendWishes';
import './index.css';

const DashboardFriend = () => {
  const { backToDashboard, friend } = useContext(DashboardContext);

  return (
    <div>

      <div
        className='dashboard-friend__back-button-wrapper'
        onClick={() => backToDashboard()}
      >
        <i className='dashboard-friend__back-button-icon fas fa-angle-left fa-lg' />
        <span className='dashboard-friend__back-button-text'>back</span>
      </div>

      <div className='dashboard-friend__user-wrapper'>
        <img
          className='dashboard-friend__user-avatar'
          src={friend.avatar}
          alt='user avatar'
        />
        <div className='dashboard-friend__user-info'>
          <div className='dashboard-friend__user-name'>{friend.displayName}</div>
          <div className='dashboard-friend__user-username'>@{friend.username}</div>
        </div>
        <div className='dashboard-friend__user-birthday'>
          {moment(friend.birthday).format('MM-DD')}
        </div>
      </div>

      <DashboardFriendWishes friend={friend} />
    </div>
  );
};

export default DashboardFriend;
