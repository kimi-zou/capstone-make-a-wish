import { csrfFetch } from './csrf.js';

// -------------------- Action Types --------------------
const SEARCH_USERS = 'search/searchUsers';

// -------------------- POJO Actions ---------------------
const loadUserResults = (users) => ({
  type: SEARCH_USERS,
  payload: users
});

// -------------------- Thunk Actions --------------------
export const searchUsers = (query) => async (dispatch) => {
  const res = await csrfFetch(`/api/search?user=${query}`);
  const users = res.data.users;
  dispatch(loadUserResults(users));
};

// -------------------- States ----------------------
const initialState = { users: null };

// -------------------- Reducer ----------------------
const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload
      };
    default:
      return state;
  }
};

export default searchReducer;
