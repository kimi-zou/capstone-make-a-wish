import React, { useState } from 'react';
import moment from 'moment';

export const DashboardContext = React.createContext();

const DashboardContextProvider = ({ children }) => {
  const [show, setShow] = useState('month');
  const [showFriend, setShowFriend] = useState(false);
  const [showMonths, setShowMonths] = useState(true);
  const [month, setMonth] = useState(-1);
  const [friend, setFriend] = useState();
  const [friends, setFriends] = useState([]);
  const [friendsByMonth, setFriendsByMonth] = useState([]);

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

  // Link to dashboard friend page
  const linkToFriend = (friend, id) => {
    setShowFriend(true);
    setFriend(friend);
  };

  // Link back to dashboard main page
  const backToDashboard = () => {
    setShowFriend(false);
    setFriend();
  };

  return (
    <DashboardContext.Provider value={{
      getFriendsByMonth,
      linkToFriend,
      backToDashboard,
      show,
      showFriend,
      showMonths,
      friend,
      friends,
      friendsByMonth,
      month,
      setShow,
      setShowMonths,
      setShowFriend,
      setFriends,
      setFriendsByMonth,
      setMonth
    }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContextProvider;
