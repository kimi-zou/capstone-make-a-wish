import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { getGroupedFriends } from '../../store/friendship';
import './index.css';

const DashboardViewList = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const groupedFriends = useSelector(state => state.friendship.groupedFriends);

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
              Object.values(group)[0].map(user => {
                return (
                  <div className='view-list__user-wrapper' key={user.id}>
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

export default DashboardViewList;
