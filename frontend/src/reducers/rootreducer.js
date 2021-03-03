import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const initState = {
  user: { username: "anonymous" },
  band: { username: "anonymous" },
  data: null,
  loginState: false,
  loginBandState:false,
  isBand:false
  //login State only trigger false when the user click sign out
  //loginState change to true only when the user sign in
};
//root reducer
const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_DATA":
      return {
        ...state,
        data: action.data,
      };
    case "INIT_USER":
      return {
        ...state,
        user: action.data,
      };
    case "INIT_BAND":
      return {
        ...state,
        band: action.data,
      };
    case "LOGOUT_USER":
      return {
        ...state,
        user: action.data.userDetail,
        loginState: action.data.loginState,
      };
      case "LOGOUT_BAND":
      return {
        ...state,
        user: action.data.bandDetail,
        loginBandState: action.data.loginBandState,
      };
    case "LOGIN_USER":
      return {
        ...state,
        loginState: action.data,
      };
      case "LOGIN_BAND":
      return {
        ...state,
        loginBandState: action.data,
      };
      case "IS_BAND":
      return {
        ...state,
        isBand: action.data,
      };
    default:
      return state;
  }
};
//List of actions

export const initUser = (user) => {
  return {
    type: "INIT_USER",
    data: user,
  };
};
export const initBand = (band) => {
    return {
      type: "INIT_BAND",
      data: band,
    };
  };
//setting user to username:anonymous when user click sign out
export const logoutUser = (data) => {
  storage.removeItem("persist:root");
  return {
    type: "LOGOUT_USER",
    data: data,
  };
};
export const logoutBand = (data) => {
  storage.removeItem("persist:root");
  return {
    type: "LOGOUT_BAND",
    data: data,
  };
};
//function to give the information of the user to the entire app
export const loginUser = (data) => {
  return {
    type: "LOGIN_USER",
    data: data,
  };
};
export const loginBand = (data) => {
  return {
    type: "LOGIN_BAND",
    data: data,
  };
};
export const isBand =(data)=>{
  return {
    type:"IS_BAND",
    data:data
  }
}
export default rootReducer;
