import { Platform } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import { Matrics } from "../common/styles";

const GlobalVar = {
  apiKey: "AIzaSyAk8_09_s4YD5AjGobzjNJKu81GPu--Wig", //"AIzaSyCeGzkqAkLd9Pt9OsYYxUJ2GUaHtKUuuAU",
  toastTimeout: 2000,
  requestTimeout: 15000,
  responseInvalidCode: 422,
  responseUnauthorizedCode: 401,
  responseNotFound: 404,
  responseToManyRequest: 429,
  responseSuccess: 200,
  responseInternalServerCode: 500,
  failedMsg: "Poor network connection or server not responding!",
  requestFailedMsg: "Request Failed. Please try again.",
  imageCompressionRatio: 0.7,
  contactType: "driver",
  country: "DE",
  language: "de",
  totalStep: 9,
  activeStep: 1,
  stepComplete: "0%",
  server: "staging", //live //staging
  appURL:
    "https://play.google.com/store/apps/details?id=com.roadheroes&rdid=com.roadheroes",
  validateEmail(email) {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}$/i.test(email);
  },
  keyboardBehavior() {
    return Platform.OS === "ios" ? "padding" : null;
  },
  verticalOffset() {
    if (isIphoneX()) {
      return Matrics.ScaleValue(55) + 30;
    } else {
      return Matrics.ScaleValue(55) + 10;
    }
  },
  sentryURL() {
    if (GlobalVar.server === "live") {
      return "https://61f0358008d04af1b48cea77b0f74fa9@sentry.io/1498437";
    }
    return "https://b119a26024ea49a4a7a9265e1945cf8e@sentry.io/1505665";
  },
  privacyPolicyURL() {
    if (GlobalVar.server === "live") {
      return "https://roadheroes.com/de/datenschutzerklaerung";
    }
    return "https://staging.roadheroes.com/de/datenschutzerklaerung";
  }
};

export default GlobalVar;
