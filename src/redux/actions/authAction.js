import { SIGNUP, LOGIN, FORGET_PASSWORD, CHANGE_PASSWORD } from "./types";
//import Api from '../../api';

export const signupRequest = params => {
  return {
    type: SIGNUP.REQ,
    params,
    constant: SIGNUP,
    api: Api.signup
  };
};

export const loginRequest = params => {
  return {
    type: LOGIN.REQ,
    params,
    constant: LOGIN,
    api: Api.login
  };
};

export const forgotPasswordRequest = params => {
  return {
    type: FORGET_PASSWORD.REQ,
    params,
    constant: FORGET_PASSWORD,
    api: Api.forgetPassword
  };
};

export const changePasswordRequest = params => {
  return {
    type: CHANGE_PASSWORD.REQ,
    params,
    constant: CHANGE_PASSWORD,
    api: Api.changePassword
  };
};
