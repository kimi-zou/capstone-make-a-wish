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
export const getPendingFriends = (id) => async dispatch => {
  const res = await csrfFetch(`/api/users/${id}/pending-friends`);
  const users = res.data.users;
  console.log(users);

  // ---Remove null
  const removeNull = (users) => {
    return users.filter(user => user);
  };

  // ---Session user as actor
  const sessionUserAsActor = await Promise.all(users.map(async user => {
    const res = await dispatch(getFriendship(id, user.id));
    const { actionUserId, status } = res.data.relationship;
    const filtered = (
      (actionUserId === id && status !== 2) ||
      (actionUserId !== id && status === 2)
    )
      ? user
      : null;
    return filtered;
  }));
  await dispatch(setSentPendingFriends(removeNull(sessionUserAsActor)));

  // ---Session user as receiver
  const sessionUserAsReceiver = await Promise.all(users.map(async user => {
    const res = await dispatch(getFriendship(id, user.id));
    if (res.data.relationship) {
      const { actionUserId, status } = res.data.relationship;
      const filtered = (actionUserId !== id && status !== 2)
        ? user
        : null;
      return filtered;
    }
  }));
  await dispatch(setReceivedPendingFriends(removeNull(sessionUserAsReceiver)));
};

// 3. Create friendship
export const sendFriendRequest = (actionUserId, receiverId) => async dispatch => {
  const res = await dispatch(getFriendship(actionUserId, receiverId));
  const friendship = res.data.relationship;
  if (!friendship) {
    const res = await csrfFetch('/api/friendships/create', {
      method: 'POST',
      body: JSON.stringify({
        actionUserId,
        receiverId
      })
    });
    return res;
  } else {
    await dispatch(updateFriendship(friendship.id, actionUserId, 0));
  }
};

// 4. Update friendship
export const updateFriendship = (relationshipId, actionUserId, status) => async dispatch => {
  const res = await csrfFetch(`/api/friendships/${relationshipId}/update`, {
    method: 'PATCH',
    body: JSON.stringify({
      actionUserId,
      status
    })
  });
  return res;
};

// 5. Delete friendship
export const deleteFriendship = (relationshipId) => async dispatch => {
  const res = await csrfFetch(`/api/friendships/${relationshipId}/delete`, {
    method: 'DELETE'
  });
  console.log(res.data);
  return res;
};

// 6. Get one friendship
export const getFriendship = (oneId, twoId) => async dispatch => {
  const userOneId = (oneId < twoId) ? oneId : twoId;
  const userTwoId = (oneId > twoId) ? oneId : twoId;
  const res = await csrfFetch(`/api/friendships/lookup/${userOneId}/${userTwoId}`);
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
