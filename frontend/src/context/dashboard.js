import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

export const DashboardContext = React.createContext();

const DashboardContextProvider = ({ children }) => {
  const allFriends = useSelector(state => state.friendship.friends);
  const [show, setShow] = useState('month');
  const [month, setMonth] = useState(-1);
  const [friends, setFriends] = useState([]);
  const [friendsByMonth, setFriendsByMonth] = useState([]);
  const [showMonths, setShowMonths] = useState(true);

  // Get friends by month
  const getFriendsByMonth = (month, allFriends) => {
    setMonth(month);
    const f = allFriends || friends;
    const monthFriends = f.filter(friend => {
      return moment(friend.birthday).month() === month;
    });
    const getDate = (date) => moment(date).get('date');
    monthFriends.sort((a, b) => getDate(a.birthday) - getDate(b.birthday) > 0 ? 1 : -1);
    setFriendsByMonth(monthFriends);
    setShow('month');
  };

  return (
    <DashboardContext.Provider value={{
      show,
      setShow,
      showMonths,
      setShowMonths,
      friends,
      setFriends,
      friendsByMonth,
      setFriendsByMonth,
      getFriendsByMonth,
      month,
      setMonth
    }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContextProvider;
