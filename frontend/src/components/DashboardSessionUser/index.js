import { useSelector } from 'react-redux';
import './index.css';

const DashboardSessionUser = () => {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='dashboard-session-user__wrapper'>
      <div className='dashboard-session-user__welcome'>
        <div className='dsu__welcome-heading'>Hello {sessionUser.displayName}!</div>
        <div className='dsu__welcome-sub-heading'>Welcome back to Make a Wish.</div>
      </div>
      <div className='dashboard-session-user__avatar'>
        <img className='dsu__avatar' src={sessionUser.avatar} alt='avatar' />
      </div>
    </div>
  );
};

export default DashboardSessionUser;
