// import * as actionType from '../constants/actionTypes';

// const authReducer = (state = { authData: null }, action) => {
//     switch (action.type) {
//         case actionType.AUTH:
//             localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

//             return { ...state, authData: action.data, loading: false, errors: null };
//         case actionType.LOGOUT:
//             localStorage.clear();

//             return { ...state, authData: null, loading: false, errors: null };
//         default:
//             return state;
//     }
// };

// export default authReducer;

import { AUTH, LOGOUT } from "../constants/actionTypes";
const authReducer = (state = { authData: null, error: null }, action) => {
  switch (action.type) {
    case AUTH:
      if (action.data) {
        localStorage.setItem("profile", JSON.stringify(action.data));
      }
      return { ...state, authData: action.data };

    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    default:
      return state;
  }
};
export default authReducer;
