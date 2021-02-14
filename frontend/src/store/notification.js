import { csrfFetch } from './csrf.js';

// Action Types
const SET_ALL_NOTIFICATIONS = 'notification/setAllNotifications';

// POJO Actions
const setAllNotifications = (notifications) => ({
  type: SET_ALL_NOTIFICATIONS,
  payload: notifications
});

// -------------------- Thunk Actions --------------------
// 1. Get all notifications
export const getAllNotifications = (id) => async dispatch => {
  const res = await csrfFetch(`/api/users/${id}/notifications`);
  await dispatch(setAllNotifications(res.data.notifications));
  console.log(res.data.notifications);
  return res;
};

// -------------------- States ----------------------
const initialState = {
  notifications: []
};

// -------------------- Reducer ----------------------
function notificationReducer (state = initialState, action) {
  switch (action.type) {
    case SET_ALL_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload
      };
    default:
      return state;
  }
}

export default notificationReducer;
