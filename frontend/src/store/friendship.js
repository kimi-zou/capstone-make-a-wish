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
export const getFriends = (id) => async dispatch => {
  const res = await csrfFetch(`/api/users/${id}/friends`);
  await dispatch(setFriends(res.data.users));
  return res;
};

// 2. Get pending friends
export const getPendingFriends = (id) => async dispatch => {
  const res = await csrfFetch(`/api/users/${id}/pending-friends`);
  await dispatch(setPendingFriends(res.data.users));
  return res;
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

// 3. Get single friendship
export const getSingleFriendship = (userOneId, userTwoId) => async dispatch => {
  const res = await csrfFetch(`/api/friendships/lookup/${userOneId}/${userTwoId}`);
  return res;
};

// -------------------- States ----------------------
const initialState = {
  friends: [],
  pendingFriends: []
};

// -------------------- Reducer ----------------------
function friendshipReducer (state = initialState, action) {
  switch (action.type) {
    case SET_FRIENDS:
      return {
        ...state,
        friends: action.payload
      };
    case SET_PENDING_FRIENDS:
      return {
        ...state,
        pendingFriends: action.payload
      };
    default:
      return state;
  }
}

export default friendshipReducer;
