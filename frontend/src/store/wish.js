import { csrfFetch } from './csrf.js';
import Cookies from 'js-cookie';

// -------------------- Action Types --------------------
const SET_WISHES = 'wish/setWishes';

// -------------------- POJO Actions ---------------------
const setWishes = (wishes) => ({
  type: SET_WISHES,
  payload: wishes
});

// -------------------- Thunk Actions --------------------
// 1. Get all wishes of a user
export const getWishes = (id) => async dispatch => {
  const res = await csrfFetch(`/api/users/${id}/wishes`);
  await dispatch(setWishes(res.data.wishes));
  return res;
};

// 2. Create a wish
export const createWish = (data) => async dispatch => {
  const res = await fetch('/api/wishes/create', {
    method: 'POST',
    headers: {
      'XSRF-Token': Cookies.get('XSRF-TOKEN')
    },
    body: data
  });
  return res;
};

// -------------------- States ----------------------
const initialState = { wishes: null };

// -------------------- Reducer ----------------------
const wishReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WISHES:
      return {
        ...state,
        wishes: action.payload
      };
    default:
      return state;
  }
};

export default wishReducer;
