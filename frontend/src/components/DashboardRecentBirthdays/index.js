import { useContext, useEffect, useState } from 'react';
import { DashboardContext } from '../../context/dashboard';
import moment from 'moment';
import DashboardRecentBirthdaysList from '../DashboardRecentBirthdaysList';
import './index.css';

const DashboardRecentBirthdays = () => {
  const { friends } = useContext(DashboardContext);
  const [thisWeek, setThisWeek] = useState([]);
  const [nextWeek, setNextWeek] = useState([]);

  // Calculate days from birthday
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
      <div className='dashboard-recent-birthdays__title'>Upcoming Birthdays</div>
      <div className='dashboard-recent-birthdays__main'>
        <DashboardRecentBirthdaysList week={thisWeek} heading='This Week' />
        <DashboardRecentBirthdaysList week={nextWeek} heading='Next Week' />
      </div>
    </div>
  );
};

export default DashboardRecentBirthdays;
