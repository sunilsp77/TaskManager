import Axios from "axios";
import * as actionTypes from "./actionTypes";

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

const checkAuthTimout = (expirationTime, dispatch) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
  // setTimeout(logout, expirationTime * 1000);
};

export const auth = (email, password, isSignUp, dispatch) => {
  dispatch({
    type: actionTypes.AUTH_START,
  });
  if (password) {
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBe0xFmJaDolMCvCYCZbTzSO61V9asQBOg";
    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBe0xFmJaDolMCvCYCZbTzSO61V9asQBOg";
    }
    Axios.post(url, authData)
      .then((response) => {
        const { idToken, localId, expiresIn } = response.data;
        const expirationDate = new Date(
          new Date().getTime() + expiresIn * 1000
        );
        localStorage.setItem("token", idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", localId);
        dispatch({
          type: actionTypes.AUTH_SUCCESS,
          idToken,
          userId: localId,
        });
        checkAuthTimout(expiresIn, dispatch);
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: actionTypes.AUTH_FAIL,
          error: err.response.data.error,
        });
      });
  } else {
    console.log("Passwords do not match");
  }
};

export const authCheckState = (dispatch) => {
  const token = localStorage.getItem("token");
  if (!token) {
    dispatch(logout());
  } else {
    const expirationDate = new Date(localStorage.getItem("expirationDate"));
    if (expirationDate <= new Date()) {
      dispatch(logout());
    } else {
      const userId = localStorage.getItem("userId");
      dispatch({
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId,
      });

      checkAuthTimout(
        (expirationDate.getTime() - new Date().getTime()) / 1000,
        dispatch
      );
    }
  }
};
