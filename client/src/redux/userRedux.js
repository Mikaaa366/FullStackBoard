import axios from "axios";
import { API_AUTH_URL } from "../config";

//selectors
export const isLogged = ({ user }) => user ? user.login : null;
export const selectUserData = (state) => state.user;

//actions
const createActionName = (actionName) => `app/users/${actionName}`;
const LOG_IN = createActionName('LOG_IN');
const LOG_OUT = createActionName('LOG_OUT');
const ADD_USER = createActionName('ADD_USER');
const SAVE_USER_TO_LOCAL_STORAGE = createActionName('SAVE_USER_TO_LOCAL_STORAGE');

export const saveUserToLocalStorage = () => ({
  type: SAVE_USER_TO_LOCAL_STORAGE,
});

export const loadUserFromLocalStorage = () => (dispatch) => {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (loggedInUser) {
    dispatch(logIn(JSON.parse(loggedInUser)));
  }
};

//action creators
export const logIn = (payload) => {
  localStorage.setItem('loggedInUser', JSON.stringify(payload));
  return {
    type: LOG_IN,
    payload,
  };
};

export const logOut = () => {
  localStorage.removeItem('loggedInUser');
  return {
    type: LOG_OUT,
  };
};

export const addUser = (user) => ({
  type: ADD_USER,
  user,
});

export const getUser = () => async (dispatch) => {
    try {
      const response = await axios.get(`${API_AUTH_URL}/auth/user`); 
      const userData = response.data; 
  
      dispatch(addUser(userData));
    } catch (error) {
      dispatch(error(error.message));
    }
  };

  const initialState = {
    login: null,
    request: { pending: false, error: null, success: false },
  };

const userReducer = (statePart = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return { ...statePart, login: action.payload.login };
    case LOG_OUT:
      return { ...statePart, login: null };
    case ADD_USER:
      return { ...statePart, user: action.user };
    case SAVE_USER_TO_LOCAL_STORAGE:
      localStorage.setItem('loggedInUser', JSON.stringify(statePart.login));
      return statePart;
    default:
      return statePart;
  }
};

export default userReducer;