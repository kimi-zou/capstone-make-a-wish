import { fetch } from './csrf.js';

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
  const res = await fetch(`/api/users/${id}/wishes`);
  dispatch(setWishes(res.data.wishes));
  return res;
};

// 2. Create a wish
export const createWish = (wish) => async dispatch => {
  const { title, description, link, quantity } = wish;
  const res = await fetch('/api/wishes/create', {
    method: 'POST',
    body: JSON.stringify({
      title,
      description,
      link,
      quantity
    })
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
