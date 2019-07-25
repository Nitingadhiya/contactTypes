import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  Linking,
  Platform
} from "react-native";
import I18n, { getLanguages } from "react-native-i18n";
import _ from "lodash";
import { StackActions, NavigationActions } from "react-navigation";
import AsyncStorage from "@react-native-community/async-storage";
import SplashScreen from "react-native-splash-screen";
import firebase from "react-native-firebase";
//import type { Notification, NotificationOpen } from "react-native-firebase";
import { Images, Matrics } from "../common/styles";
import { en, pl, de } from "../common/translations";
import { Events, Helper, Uxcam } from "../util";
import GlobalVar from "../global";
import RegisterObj from "../api/register-data";
import dataOption from "../data";

I18n.fallbacks = true;

I18n.translations = {
  en: en,
  de: de,
  pl: pl
};

export default class Splash extends Component {
  navigateToScreen(route) {
    const navigateAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: route })]
    });
    this.props.navigation.dispatch(navigateAction);
  }

  async componentDidMount() {
    firebase.analytics().setAnalyticsCollectionEnabled(true);
    Helper.trackScreenView("SplashScreen");
    this.requestPushNotification();
    this.languageSupport(); // Fetch local Language
    this.fetchRegisterMeta();
    const apiToken = await AsyncStorage.getItem("apiToken");
    if (apiToken) {
      global.apiToken = apiToken;
      this.navigateToScreen("TabHome");
    } else {
      this.navigateToScreen("Welcome");
    }
    setTimeout(() => {
      SplashScreen.hide();
      Uxcam.startRecording(); // Start screen recording
    }, 100);

    Events.on("languageSetup", "splash", data => {
      I18n.locale = data;
      global.currentAppLanguage = data;
      AsyncStorage.setItem("languageStorage", data);
    });
    if (Platform.OS === "android") {
      Linking.getInitialURL().then(url => {
        //console.log("Get info", url);
      });
      //Linking.addEventListener("url", this.handleOpenURL);
    } else {
      Linking.addEventListener("url", this.handleOpenURL);
    }

    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification()
      .catch(err => {
        console.warn("error", err);
      });
    if (notificationOpen) {
      global.notificationData = notificationOpen.notification.data;
      console.log(
        "Notification Log L. 140 killed state",
        global.notificationData
      );
      this.navigationJobDetails();
    }
    const channel = new firebase.notifications.Android.Channel(
      "test-channel",
      "Test Channel",
      firebase.notifications.Android.Importance.Max
    ).setDescription("My apps test channel");
    // Create the channel
    firebase.notifications().android.createChannel(channel);
    this.notificationDisplayedListener = firebase
      .notifications()
      .onNotificationDisplayed((notification: Notification) => {
        // Process your notification as required
        // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
      });
    this.notificationListener = firebase
      .notifications()
      .onNotification((notification: Notification) => {
        // Process your notification as required
        notification.android
          .setChannelId("test-channel")
          .android.setSmallIcon("ic_stat_onesignal_default");
        firebase.notifications().displayNotification(notification);
      });

    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened((notificationOpen: NotificationOpen) => {
        // Get the action triggered by the notification being opened
        const action = notificationOpen.action;
        // Get information about the notification that was opened
        const notification: Notification = notificationOpen.notification;
        var seen = [];
        console.log(notification, "notification");
        global.notificationData = notification.data;
        this.navigationJobDetails();
        firebase
          .notifications()
          .removeDeliveredNotification(notification.notificationId);
      });
  }

  componentWillUnmount() {
    this.notificationDisplayedListener();
    this.notificationListener();
    this.notificationOpenedListener();
  }

  componentWillUnmount() {
    Linking.removeEventListener("url", this.handleOpenURL);
  }
  handleOpenURL(event) {
    console.log(event.url);
    //const route = e.url.replace(/.*?:\/\//g, "");
    // do something with the url, in our case navigate(route)
  }
  requestPushNotification() {
    firebase
      .messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) {
          console.log("Enabled");
          firebase
            .messaging()
            .getToken()
            .then(async fcmToken => {
              console.log(fcmToken);
              if (fcmToken) {
                global.fcmToken = fcmToken;
                await AsyncStorage.setItem("fcmToken", fcmToken);
                //Helper.registerDeviceToken(fcmToken);
                //AppEventsLogger.setPushNotificationsDeviceToken(fcmToken);
              }
            });
        } else {
          firebase
            .messaging()
            .requestPermission()
            .then(async fcmToken => {
              firebase
                .messaging()
                .getToken()
                .then(async fcmToken => {
                  if (fcmToken) {
                    global.fcmToken = fcmToken;
                    //AppEventsLogger.setPushNotificationsDeviceToken(fcmToken);
                    await AsyncStorage.setItem("fcmToken", fcmToken);
                    //Helper.registerDeviceToken(fcmToken);
                  } else {
                    this.requestPushNotification();
                    // user doesn't have a device token yet
                  }
                });
            })
            .catch(error => {
              // user doesn't have permission
            });
          // user doesn't have permission
        }
      });
  }

  navigationJobDetails() {
    if (global.notificationData && global.notificationData.type) {
      if (global.notificationData.type === "offer_detail") {
        this.props.navigation.navigate("JobDetail", {
          id: global.notificationData.campaign_id
        });
      }
    }
  }

  async languageSupport() {
    const getLanguage = await AsyncStorage.getItem("languageStorage");
    if (!getLanguage) {
      const currentLanguage = I18n.currentLocale();
      let lang = "";
      if (currentLanguage) {
        const spl_Lan = currentLanguage.split("-");
        const shortLang = spl_Lan[0];
        if (shortLang === "en" || shortLang === "de" || shortLang === "pl") {
          lang = shortLang;
        } else {
          lang = "en";
        }
      }
      global.currentAppLanguage = lang; //For application language
      GlobalVar.language = lang;
      I18n.locale = lang;
    } else {
      I18n.locale = getLanguage;
      GlobalVar.language = getLanguage;
      global.currentAppLanguage = getLanguage;
    }
  }

  fetchRegisterMeta() {
    //AsyncStorage.clear();
    AsyncStorage.multiGet(
      ["register_data", "global_data", "data_option"],
      (err, stores) => {
        stores.map((result, i, store) => {
          let key = store[i][0];
          if (store[i][1]) {
            let value = JSON.parse(store[i][1]);
            if (key === "register_data") {
              _.merge(RegisterObj, value); // local storage data merge with local object
            }
            if (key === "global_data") {
              _.merge(GlobalVar, value); // local storage data merge with local object
            }
            if (key === "data_option") {
              if (value.languages) {
                Helper.multiLanguage(value.languages);
              }
              _.merge(dataOption, value); // local storage data merge with local object
              Helper.qualificationWanted();
            }
          }
        });
      }
    );
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image
          source={Images.welcomeLogo}
          style={{
            width: Matrics.ScaleValue(300),
            height: Matrics.ScaleValue(30)
          }}
        />
      </View>
    );
  }
}
