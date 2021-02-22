import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { csrfFetch } from '../store/csrf';
import { getFriendPublicWishes, lockWish } from '../store/wish';

export const DashboardContext = React.createContext();

const DashboardContextProvider = ({ children }) => {
  const dispatch = useDispatch();

  const [showConfirm, setShowConfirm] = useState(false);
  const [show, setShow] = useState('month');
  const [showFriend, setShowFriend] = useState(false);
  const [showMonths, setShowMonths] = useState(true);
  const [month, setMonth] = useState(-1);
  const [gift, setGift] = useState();
  const [imgIndex, setImgIndex] = useState(0);
  const [wishes, setWishes] = useState([]);
  const [friend, setFriend] = useState();
  const [friends, setFriends] = useState([]);
  const [friendsByMonth, setFriendsByMonth] = useState([]);
  const [todos, setTodos] = useState([]);

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
  const linkToFriend = (friend) => {
    setShowFriend(true);
    setFriend(friend);
  };

  // Link back to dashboard main page
  const backToDashboard = () => {
    setShowFriend(false);
    setFriend();
    setShow('month');
  };

  // Display gift info
  const displayGift = (gift) => {
    setShow('gift');
    setGift(gift);
    setImgIndex(0);
  };

  // Lock a gift and refresh page
  const lockGift = async (id, sessionUserId) => {
    await dispatch(lockWish(id, sessionUserId));
    const res = await dispatch(getFriendPublicWishes(friend.id));
    setWishes(res.data.wishes);
    setShowConfirm(false);
  };

  // Get todos
  const getAllTodos = async (id) => {
    const res = await csrfFetch(`/api/users/${id}/todos`);
    setTodos(res.data.todos);
  };

  return (
    <DashboardContext.Provider value={{
      getFriendsByMonth,
      linkToFriend,
      backToDashboard,
      displayGift,
      lockGift,
      getAllTodos,
      show,
      showFriend,
      showMonths,
      friend,
      friends,
      friendsByMonth,
      month,
      gift,
      imgIndex,
      wishes,
      showConfirm,
      todos,
      setShow,
      setShowMonths,
      setShowFriend,
      setFriends,
      setFriendsByMonth,
      setMonth,
      setImgIndex,
      setWishes,
      setShowConfirm
    }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContextProvider;
