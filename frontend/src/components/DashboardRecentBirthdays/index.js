import { useContext, useEffect, useState } from 'react';
import { DashboardContext } from '../../context/dashboard';
import moment from 'moment';
import './index.css';

const DashboardRecentBirthdays = () => {
  const { friends } = useContext(DashboardContext);
  const [thisWeek, setThisWeek] = useState([]);
  const [nextWeek, setNextWeek] = useState([]);

  useEffect(() => {
    if (friends.length === 0) return;
    function daysUntil (date) {
      const birthday = moment(date);
      const today = moment().format('YYYY-MM-DD');
      const age = moment(today).diff(birthday, 'years');
      const nextBirthday = moment(birthday).add(age + 1, 'years');
      const result = nextBirthday.diff(today, 'days');
      return result === 365 ? 0 : result;
    }
    setThisWeek(friends.filter(friend => {
      return daysUntil(friend.birthday) < 8;
    }));
    setNextWeek(friends.filter(friend => {
      return daysUntil(friend.birthday) > 8 && daysUntil(friend.birthday) < 15;
    }));
  }, [friends]);

  return (
    <div className='dashboard-recent-birthdays__wrapper'>
      <div className='dashboard-recent-birthdays__title'>Uncoming Birthdays</div>
      <div className='dashboard-recent-birthdays__main'>
        <div className='dashboard-recent-birthdays__this-week'>
          <div className='this-week__heading'>This week</div>
          {thisWeek.length > 0 &&
            <div className='this-week__list'>
              {thisWeek.map(friend => {
                return (
                  <div className='this-week__friend-wrapper' key={friend.id}>
                    <img className='this-week__friend-avatar' src={friend.avatar} alt='user avatar' key={friend.id} />
                    <div className='this-week__friend-name'>{friend.displayName}</div>
                  </div>
                );
              })}
            </div>}
        </div>
        <div className='dashboard-recent-birthdays__next-week'>
          <div className='this-week__heading'>Next week</div>
          {nextWeek.length > 0 &&
            <div className='this-week__list'>
              {nextWeek.map(friend => {
                return (
                  <div className='this-week__friend-wrapper' key={friend.id}>
                    <img className='this-week__friend-avatar' src={friend.avatar} alt='user avatar' key={friend.id} />
                    <div className='this-week__friend-name'>{friend.displayName}</div>
                  </div>
                );
              })}
            </div>}
        </div>
      </div>
    </div>
  );
};

export default DashboardRecentBirthdays;
