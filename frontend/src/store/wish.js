import { fetch } from './csrf.js';

// -------------------- Action Types --------------------
const SET_WISHES = 'wish/setWishes';

// -------------------- POJO Actions ---------------------
const setWishes = (wishes) => ({
  type: SET_WISHES,
  payload: wishes
});

// -------------------- Thunk Actions --------------------
export const getWishes = (id) => async dispatch => {
  const res = await fetch(`/api/users/${id}/wishes`);
  dispatch(setWishes(res.data.wishes));
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
