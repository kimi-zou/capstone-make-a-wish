import { csrfFetch } from './csrf.js';
import Cookies from 'js-cookie';

// -------------------- Action Types --------------------
const SET_PUBLIC_WISHES = 'wish/setPublicWishes';
const SET_PRIVATE_WISHES = 'wish/setPrivateWishes';
const SET_VIEW_WISH = 'wish/setViewWish';

// -------------------- POJO Actions ---------------------
const setPublicWishes = (wishes) => ({
  type: SET_PUBLIC_WISHES,
  payload: wishes
});

const setPrivateWishes = (wishes) => ({
  type: SET_PRIVATE_WISHES,
  payload: wishes
});

const setViewWish = (wish) => ({
  type: SET_VIEW_WISH,
  payload: wish
});

// -------------------- Thunk Actions --------------------
// 1. Get all public wishes of a user
export const getPublicWishes = (id) => async dispatch => {
  const res = await csrfFetch(`/api/users/${id}/wishes/public`);
  await dispatch(setPublicWishes(res.data.wishes));
  return res;
};

export const getFriendPublicWishes = (id) => async dispatch => {
  const res = await csrfFetch(`/api/users/${id}/wishes/public`);
  return res;
};

// 2. Get all private wishes of a user
export const getPrivateWishes = (id) => async dispatch => {
  const res = await csrfFetch(`/api/users/${id}/wishes/private`);
  await dispatch(setPrivateWishes(res.data.wishes));
  return res;
};

// 3. Create a wish
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

// 4. Get a wish
export const getWish = (id) => async dispatch => {
  const res = await csrfFetch(`/api/wishes/${id}`);
  await dispatch(setViewWish(res.data.wish));
  return res;
};

// 5. Delete a wish
export const deleteWish = (id) => async dispatch => {
  const res = await csrfFetch(`/api/wishes/${id}`, {
    method: 'DELETE'
  });
  return res;
};

// 6. Public a wish
export const publicWish = (id) => async dispatch => {
  const res = await csrfFetch(`/api/wishes/${id}/update/public`, {
    method: 'PATCH'
  });
  return res;
};

// 7. Private a wish
export const privateWish = (id) => async dispatch => {
  const res = await csrfFetch(`/api/wishes/${id}/update/private`, {
    method: 'PATCH'
  });
  return res;
};

// 8. Lock a wish
export const lockWish = (id) => async dispatch => {
  const res = await csrfFetch(`/api/wishes/${id}/update/lock`, {
    method: 'PATCH'
  });
  return res;
};

// -------------------- States ----------------------
const initialState = {
  publicWishes: null,
  privateWishes: null,
  wish: null
};

// -------------------- Reducer ----------------------
const wishReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PUBLIC_WISHES:
      return {
        ...state,
        publicWishes: action.payload
      };
    case SET_PRIVATE_WISHES:
      return {
        ...state,
        privateWishes: action.payload
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
