import { useContext } from 'react';
import { DashboardContext } from '../../context/dashboard';
import './index.css';

const DashboardViewList = () => {
  const { friends } = useContext(DashboardContext);

  return (
    <div>
      {
        friends.length > 0 &&
        friends.map(friend => {
          return (
            <div className='view-list__user-wrapper' key={friend.id}>
              <img className='view-list__user-avatar' src={friend.avatar} alt='avatar' />
              <div className='view-list__user-name'>{friend.displayName}</div>
            </div>
          );
        })
      }
    </div>
  );
};

export default DashboardViewList;
