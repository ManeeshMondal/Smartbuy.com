import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAIL,
  CLEAR_ERROR,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
} from "../Constants/UserConstant";

// login user 
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };

    const {data} = await axios.post(
      "http://localhost:4000/api/v1/login",
      { email, password },
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

// register user 
export const register= (userData) => async(dispatch) =>{
    try {
      dispatch({type:REGISTER_USER_REQUEST});

      const config={headers: {"content-type":"multipart/form-data"} , withCredentials: true}

      const {data} = await axios.post(
        "http://localhost:4000/api/v1/register",
        userData,
        config
      );

      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
      
    } catch (error) {
      dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.message });
    }
} 

// get user details (load user)
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const {data} = await axios.get("http://localhost:4000/api/v1/me", { withCredentials: true });

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};

//   crearing the error
export const clearingError = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  });
};
