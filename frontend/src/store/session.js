import { fetch } from './csrf.js';


// -------------------- Action Types --------------------
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';


// -------------------- POJO Actions ---------------------
const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER
});


// -------------------- Thunk Actions --------------------
export const login = ({ credential, password }) => async (dispatch) => {
  const res = await fetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({ credential, password })
  });
  dispatch(setUser(res.data.user));
  return res;
};


export const restoreUser = () => async (dispatch) => {
  const res = await fetch('/api/session');
  dispatch(setUser(res.data.user));
  return res;
};


export const signup = (user) => async (dispatch) => {
  const { username, email, password, birthday } = user;
  console.log(birthday)
  const res = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({
      username,
      email,
      password,
      birthday
    })
  });

  dispatch(setUser(res.data.user));
  return res;
};


export const logout = () => async (dispatch) => {
  const res = await fetch('/api/session', {
    method: 'DELETE'
  });
  dispatch(removeUser());
  return res;
};


// -------------------- States ----------------------
const initialState = { user: null };


// -------------------- Reducer ----------------------
function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state, { user: action.payload });
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state, { user: null });
      return newState;
    default:
      return state;
  }
}

export default reducer;
