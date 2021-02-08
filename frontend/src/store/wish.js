import { csrfFetch } from './csrf.js';
import Cookies from 'js-cookie';

// -------------------- Action Types --------------------
const SET_WISHES = 'wish/setWishes';
const SET_VIEW_WISH = 'wish/setViewWish';

// -------------------- POJO Actions ---------------------
const setWishes = (wishes) => ({
  type: SET_WISHES,
  payload: wishes
});

const setViewWish = (wish) => ({
  type: SET_VIEW_WISH,
  payload: wish
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

// 3. Get a wish
export const getWish = (id) => async dispatch => {
  const res = await csrfFetch(`/api/wishes/${id}`);
  await dispatch(setViewWish(res.data.wish));
  return res;
};

// 4. Delete a wish
export const deleteWish = (id) => async dispatch => {
  const res = await csrfFetch(`/api/wishes/${id}`, {
    method: 'DELETE'
  });
  return res;
};

// -------------------- States ----------------------
const initialState = {
  wishes: null,
  wish: null
};

// -------------------- Reducer ----------------------
const wishReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WISHES:
      return {
        ...state,
        wishes: action.payload
      };
    case SET_VIEW_WISH:
      return {
        ...state,
        wish: action.payload
      };
    default:
      return state;
  }
};

export default wishReducer;
