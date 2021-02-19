import { useContext } from 'react';
import { DashboardContext } from '../../context/dashboard';
import './index.css';

const DashboardFriend = () => {
  const { setShowFriend } = useContext(DashboardContext);

  return (
    <div>
      <button onClick={() => setShowFriend(false)}>back</button>
      friend
    </div>
  );
};

export default DashboardFriend;
