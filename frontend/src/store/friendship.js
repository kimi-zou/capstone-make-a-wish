import { csrfFetch } from './csrf.js';

// -------------------- Action Types --------------------
const SET_PENDING_FRIENDS = 'friendship/setPendingFriends';
const SET_FRIENDS = 'friendship/setFriends';

// -------------------- POJO Actions ---------------------
const setPendingFriends = (friends) => ({
  type: SET_PENDING_FRIENDS,
  payload: friends
});

const setFriends = (friends) => ({
  type: SET_FRIENDS,
  payload: friends
});

// -------------------- Thunk Actions --------------------
// 1. Get friends
export const getFriends = () => async dispatch => {

};

// 2. Get pending friends
export const getPendingFriends = () => async dispatch => {

};

export const sendFriendRequest = (actionUserId, receiverId) => async dispatch => {
  const res = await csrfFetch('/api/friendships/create', {
    method: 'POST',
    body: JSON.stringify({
      actionUserId,
      receiverId
    })
  });
  return res;
};
