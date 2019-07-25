import AsyncStorage from "@react-native-community/async-storage";
import { Sentry, SentryLog } from "react-native-sentry";
import VersionNumber from "react-native-version-number";
import GlobalVar from "../global";

const SentryReport = {
  sentryInstall() {
    console.log(GlobalVar.sentryURL(), "ASGlo");
    Sentry.config(GlobalVar.sentryURL(), {
      logLevel: SentryLog.Debug,
      deactivateStacktraceMerging: true
    });
    if (!__DEV__) {
      //eslint-disable-line
      Sentry.install();
    }
  },

  sentryTagInfo() {
    Sentry.setTagsContext({
      environment: GlobalVar.server === "live" ? "Production" : "Staging",
      react: true
    });
    Sentry.setVersion(
      `${VersionNumber.appVersion}(${VersionNumber.buildVersion})`
    );
  },
  report() {
    AsyncStorage.getItem("userInfo").then(userInfo => {
      if (userInfo) {
        const user = JSON.parse(userInfo);
        // set the user context
        Sentry.setUserContext({
          username: `${user.full_name}`,
          email: `${user.email}` // `${user.firstName}${user.lastName}${user.id}@gmail.com`,
          // extra: {
          //   is_admin: false,    // If we need extra data sent on sentry
          // },
        });
        // SentryReport.apiErrorReport("Test For session logs2 iOS", "Test");
        // setTimeout(() => {]
        //   Sentry.nativeCrash(); //For testing purpose only
        // }, 7000);
      }
    });
  },
  apiErrorReport(err) {
    Sentry.captureException(err);
  }
};
export default SentryReport;
