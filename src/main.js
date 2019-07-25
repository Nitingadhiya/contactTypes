import React, { Component } from "react";
import { Text, View, SafeAreaView, Linking } from "react-native";

import { createStore } from "redux";

import { Provider } from "react-redux";
import VersionNumber from "react-native-version-number";
import compareVersions from "compare-versions";

import ReduxState from "./redux";
import firebase, { Notification, RemoteMessage } from "react-native-firebase";
import AppNavigation from "./navigator";
import InternetConnection from "./common/components/internet-connection";
import ToastComponent from "./common/components/toast";
//import Events from "./util/events";
import { applicationInfo } from "./api/http";
// import { Events, Helper, APICaller } from "./util";
import { SpinnerView, ConfirmModal } from "./common/components";
import GlobalVar from "./global";

export default class App extends Component {
  state = {
    loading: false,
    langauge: null,
    appUpdate: false,
    forceUpdate: false
  };
  componentDidMount() {
    console.disableYellowBox = true;
    // SentryReport.sentryInstall();
    // Events.on("loading", "Login", isVisible => {
    //   this.setState({
    //     loading: isVisible
    //   });
    // });
    // Events.on("languageSetup", "Main", res => {
    //   this.setState({
    //     langauge: res
    //   });
    // });

    this.checkApplicationStatus(); //App status
    //SentryReport.sentryTagInfo();
    //SentryReport.report();
  }

  checkApplicationStatus() {
    Events.trigger("loading", true);
    APICaller(`${applicationInfo}`, "GET").then(json => {
      if (json) {
        if (json.status && json.status === GlobalVar.responseInvalidCode) {
          const errors = json.data.errors;
          Events.trigger("toast", `${errors}`);
          return;
        }
        if (json.status && json.status !== GlobalVar.responseSuccess) {
          Events.trigger(
            "toast",
            Helper.translation(
              `Words.${GlobalVar.requestFailedMsg}`,
              GlobalVar.requestFailedMsg
            )
          );
          return;
        }
        const data = json.data;
        if (
          compareVersions(
            data.application_version_code,
            VersionNumber.appVersion
          ) > 0
        ) {
          this.setState({
            appUpdate: true,
            forceUpdate: data.force_update
          });
        }
        Events.trigger("loading", false);
      }
    });
  }

  appUpdateAvailable = (appUpdate, forceUpdate) => {
    if (appUpdate) {
      return (
        <ConfirmModal
          title={"App Update"}
          message={`New version available.`}
          leftButton={
            forceUpdate ? null : Helper.translation("Words.Cancel", "Cancel")
          }
          rightButton={Helper.translation("Words.Update", "Update")}
          leaveModalReq={() => this.cancelModal(true)}
          cancelModalReq={() => this.cancelModal(false)}
          backDisabled={true}
        />
      );
    }
  };

  cancelModal(appUpdate) {
    if (appUpdate) {
      Linking.openURL(GlobalVar.appURL).catch(err =>
        console.log("An error occurred", err)
      );
    }
    this.setState({
      appUpdate
    });
  }

  render() {
    const { loading, langauge, appUpdate, forceUpdate } = this.state;
    return (
      <Provider store={ReduxState}>
        <View style={{ flex: 1 }}>
          <AppNavigation screenProps={{ langauge }} />
          <InternetConnection />
          <ToastComponent />
          {loading ? <SpinnerView /> : null}
          {this.appUpdateAvailable(appUpdate, forceUpdate)}
        </View>
      </Provider>
    );
  }
}
