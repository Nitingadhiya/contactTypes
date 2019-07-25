import { Platform, AsyncStorage } from "react-native";
// import { put, call } from 'redux-saga/effects'

export function asyncAction(action) {
  return {
    REQ: `${action}_request`,
    SUCCESS: `${action}_success`,
    ERROR: `${action}_error`
  };
}

export function* asyncSaga({ params, api, constant }) {
  try {
    const response = yield call(api, params);
    yield put({
      type: constant.SUCCESS,
      payload: response
    });
  } catch (error) {
    yield put({
      type: constant.ERROR,
      payload: error
    });
  }
}

const user_agent = Platform.OS == "ios" ? "iOS" : "Android";
const device_type = Platform.OS == "ios" ? 1 : 2;

const device_token = global.device_token;
const is_testdata = "1";
const fcmToken = "123456";

export async function apiRequest(params, apiUrl) {
  const other_params = {
    device_type,
    device_token: fcmToken
  };
  const allparams = Object.assign(params, other_params);
  return fetch(`${apiUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": user_agent
    },
    body: JSON.stringify(allparams)
  }).then(response => response.json());
}

export async function apiGetRequest(apiUrl) {
  return fetch(`${apiUrl}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": user_agent
    }
  }).then(response => response.json());
}
