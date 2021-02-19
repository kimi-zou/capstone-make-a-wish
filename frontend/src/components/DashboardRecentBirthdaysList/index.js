import { useState, useContext } from 'react';
import moment from 'moment';
import { DashboardContext } from '../../context/dashboard';

const DashboardRecentBirthdaysList = ({ week, heading }) => {
  const { setShowFriend } = useContext(DashboardContext);
  const [showDetails, setShowDetails] = useState();

  return (
    <div className='dashboard-recent-birthdays__week-wrapper'>
      <div className='week__heading'>{heading}</div>
      {week.length > 0 &&
        <div className='week__list-wrapper'>
          {week.map((friend, index) => {
            return (
              <div
                className={
                  showDetails === index + 1
                    ? 'week__friend-onhover week__friend'
                    : 'week__friend'
                }
                key={friend.id}
              >
                <img
                  className='week__friend-avatar'
                  src={friend.avatar}
                  alt='user avatar'
                  onMouseEnter={() => setShowDetails(index + 1)}
                  onMouseLeave={() => setShowDetails(false)}
                  onClick={() => setShowFriend(true)}
                />
                {
                  showDetails &&
                  showDetails === index + 1 &&
                    <div className='week__friend-details--overflow'>
                      <div className='week__friend-details'>
                        <div className='week__friend-name'>{friend.displayName}</div>
                        <div className='week__friend-birthday'>{moment(friend.birthday).format('MM-DD')}</div>
                      </div>
                    </div>
                }
              </div>
            );
          })}
        </div>}
    </div>
  );
};

export default DashboardRecentBirthdaysList;
