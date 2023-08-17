import { combineReducers } from 'redux';

const initialState = {
  userTokens: [],
  adminTokens: [],
};
const CLEAR_USER_TOKENS = 'CLEAR_USER_TOKENS';
const ADD_USER_TOKEN = 'ADD_USER_TOKEN';
const ADD_ADMIN_TOKEN = 'ADD_ADMIN_TOKEN';

export const addUserToken = (token) => ({
  type: ADD_USER_TOKEN,
  payload: token,
});
export const clearUserTokens = () => ({
  type: CLEAR_USER_TOKENS,
});

export const addAdminToken = (token) => ({
  type: ADD_ADMIN_TOKEN,
  payload: token,
});

const userTokensReducer = (state = initialState.userTokens, action) => {
  switch (action.type) {
    case ADD_USER_TOKEN:
      return [...state, action.payload];
    case CLEAR_USER_TOKENS:
        return [];
    default:
      return state;
  }
};

const adminTokensReducer = (state = initialState.adminTokens, action) => {
  switch (action.type) {
    case ADD_ADMIN_TOKEN:
      return [...state, action.payload];
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  userTokens: userTokensReducer,
  adminTokens: adminTokensReducer,
});

export default rootReducer;