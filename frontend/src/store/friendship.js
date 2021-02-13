import { csrfFetch } from './csrf.js';

// -------------------- Action Types --------------------
const SET_SENT_PENDING_FRIENDS = 'friendship/setSentPendingFriends';
const SET_RECEIVED_PENDING_FRIENDS = 'friendship/setReceivedPendingFriends';
const SET_FRIENDS = 'friendship/setFriends';

// -------------------- POJO Actions ---------------------
const setSentPendingFriends = (friends) => ({
  type: SET_SENT_PENDING_FRIENDS,
  payload: friends
});

const setReceivedPendingFriends = (friends) => ({
  type: SET_RECEIVED_PENDING_FRIENDS,
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
//    Remove null
const removeNull = (users) => {
  return users.filter(user => user);
};

//    Session user as actor
export const getSentPendingFriends = (id) => async dispatch => {
  const res = await csrfFetch(`/api/users/${id}/pending-friends`);
  const users = res.data.users;
  const sessionUserAsActor = await Promise.all(users.map(async user => {
    const res = await dispatch(getSingleFriendship(id, user.id));
    const filtered = (res.data.relationship.actionUserId !== id)
      ? null
      : user;
    return filtered;
  }));
  await dispatch(setSentPendingFriends(removeNull(sessionUserAsActor)));
  return res;
};

//    Session user as receiver
export const getReceivedPendingFriends = (id) => async dispatch => {
  const res = await csrfFetch(`/api/users/${id}/pending-friends`);
  const users = res.data.users;
  const sessionUserAsReceiver = await Promise.all(users.map(async user => {
    const res = await dispatch(getSingleFriendship(id, user.id));
    const filtered = (res.data.relationship.actionUserId === id)
      ? null
      : user;
    return filtered;
  }));
  await dispatch(setReceivedPendingFriends(removeNull(sessionUserAsReceiver)));
  return res;
};

// 3. Send friend request
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

// 4. Get one friendship
export const getSingleFriendship = (userOneId, userTwoId) => async dispatch => {
  const res = await csrfFetch(`/api/friendships/lookup/${userOneId}/${userTwoId}`);
  return res;
};

// 5. Update one friendship
export const acceptFriendship = (relationshipId, actionUserId, status) => async dispatch => {
  const res = await csrfFetch(`/api/friendships/${relationshipId}/update`, {
    method: 'PATCH',
    body: JSON.stringify({
      actionUserId,
      status
    })
  });
  return res;
};

// -------------------- States ----------------------
const initialState = {
  friends: [],
  sentPendingFriends: [],
  receivedPendingFriends: []
};

// -------------------- Reducer ----------------------
function friendshipReducer (state = initialState, action) {
  switch (action.type) {
    case SET_FRIENDS:
      return {
        ...state,
        friends: action.payload
      };
    case SET_SENT_PENDING_FRIENDS:
      return {
        ...state,
        sentPendingFriends: action.payload
      };
    case SET_RECEIVED_PENDING_FRIENDS:
      return {
        ...state,
        receivedPendingFriends: action.payload
      };
    default:
      return state;
  }
}

export default friendshipReducer;
