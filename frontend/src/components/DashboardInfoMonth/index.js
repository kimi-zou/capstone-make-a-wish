import { useContext } from 'react';
import moment from 'moment';
import { DashboardContext } from '../../context/dashboard';
import './index.css';

const DashboardInfoMonth = () => {
  const { friendsByMonth } = useContext(DashboardContext);

  return (
    <>
      {
        friendsByMonth.map(user => {
          return (
            <div className='view-month__user-wrapper' key={user.id}>
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

export default DashboardInfoMonth;
