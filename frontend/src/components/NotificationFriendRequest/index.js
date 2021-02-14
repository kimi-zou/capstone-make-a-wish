import './index.css';

const NotificationFriendRequest = ({ notification }) => {
  const { avatar, displayName, username } = notification.User;

  // Accept friend
  const acceptFriend = () => {};

  // Ignore friend
  const ignoreFriend = () => {};

  return (
    <div className='notification-friend__wrapper'>
      <div className='notification-friend__avatar-wrapper'>
        <img
          className='notification-friend__avatar'
          src={avatar}
          alt='user avatar'
        />
      </div>
      <div className='notification-friend__user-info'>
        <div className='notification-friend__message'>
          <span className='notification-friend__display-name'>{displayName}</span> has sent you a friend request.
        </div>
        <div className='notification-friend__username'>@{username}</div>
      </div>
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
    </div>
  );
};

export default NotificationFriendRequest;
