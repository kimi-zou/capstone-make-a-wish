import { useContext, useState } from 'react';
import moment from 'moment';
import { DashboardContext } from '../../context/dashboard';
import './index.css';

const DashboardInfoBoxMonth = () => {
  const { friendsByMonth, setShowFriend } = useContext(DashboardContext);
  const [hover, setHover] = useState(-1);

  return (
    <>
      {
        friendsByMonth.map((user, index) => {
          return (
            <div
              key={user.id}
              className={
                hover === index
                  ? 'view-month__user-wrapper view-month__user-wrapper--hover'
                  : 'view-month__user-wrapper'
              }
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(-1)}
              onClick={() => setShowFriend(true)}
            >
              <div className='view-month__user-left'>
                <img className='view-month__user-avatar' src={user.avatar} alt='user avatar' />
                <div key={user.id}>{user.displayName}</div>
              </div>
              <div className='view-month__user-birthday'>
                {moment(user.birthday).format('MM-DD')}
              </div>
            </div>
          );
        })
}
    </>
  );
};

export default DashboardInfoBoxMonth;
