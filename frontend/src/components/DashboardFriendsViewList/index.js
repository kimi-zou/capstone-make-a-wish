import { useEffect, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { getGroupedFriends } from '../../store/friendship';
import { DashboardContext } from '../../context/dashboard';
import './index.css';

const DashboardFriendsViewList = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const groupedFriends = useSelector(state => state.friendship.groupedFriends);
  const { setShowFriend } = useContext(DashboardContext);
  const [hover, setHover] = useState('');

  // Get grouped friends
  useEffect(() => {
    dispatch(getGroupedFriends(sessionUser.id));
  }, [dispatch, sessionUser]);

  // Render grouped friends
  const displayFriends = () => {
    const friends = [];
    for (const [key, value] of Object.entries(groupedFriends)) {
      friends.push({ [key]: value });
    }
    if (friends.length > 0) {
      const result = friends.map((group, index) => {
        return (
          <div className='view-list__group-wrapper' key={index}>
            <div className='view-list__group-title'>
              {Object.keys(group)[0]}
            </div>
            {
              Object.values(group)[0].map((user, idx) => {
                return (
                  <div
                    key={user.id}
                    className={
                      hover === `${index}:${idx}`
                        ? 'view-list__user-wrapper view-list__user-wrapper--hover'
                        : 'view-list__user-wrapper'
                    }
                    onMouseEnter={() => setHover(`${index}:${idx}`)}
                    onMouseLeave={() => setHover('')}
                    onClick={() => setShowFriend(true)}
                  >
                    <div className='view-list__user-left'>
                      <img className='view-list__user-avatar' src={user.avatar} alt='user avatar' />
                      <div key={user.id}>{user.displayName}</div>
                    </div>
                    <div className='view-list__user-birthday'>{user.birthday && moment(user.birthday).format('MM-DD')}</div>
                  </div>
                );
              })
            }
          </div>
        );
      });
      return result;
    }
  };

  return (
    <div className='view-list__wrapper'>
      {
        groupedFriends &&
        displayFriends()
      }
    </div>
  );
};

export default DashboardFriendsViewList;
